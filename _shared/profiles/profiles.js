/* SAVE Learning Co. — Shared Kid Profiles
 * Lives in /_shared/profiles/ so every hub (Atlas, Animal Kingdom, Young Inventors,
 * Space Explorers, Ecosystem Explorers...) can include it with a single <script> tag.
 *
 * What it does:
 *   1. Exposes window.SaveStore — a sandbox-safe key/value store that AUTOMATICALLY
 *      namespaces every key per active profile, so each kid has her own coins,
 *      passport, badges, quests, narration progress, etc.
 *   2. Exposes window.ProfileAPI — list / getActive / setActive / onChange.
 *   3. Renders a full-screen profile picker on first launch (no active profile),
 *      and a small profile chip in the header on every load after that.
 *
 * Storage layout:
 *   save_active_profile_v1  → "sophie" | "adeline" | "libby" | "veda"   (GLOBAL)
 *   save_mute_v1            → "0" | "1"                                 (GLOBAL)
 *   p<id>::<key>            → everything else, scoped to the active kid
 */
(function () {
  "use strict";

  if (window.__SAVE_PROFILES_LOADED) return;
  window.__SAVE_PROFILES_LOADED = true;

  // ---------- Profile registry ----------
  // DOBs / ages noted for future "age-appropriate content" gating; not used today.
  // Avatar paths are resolved relative to wherever profiles.js was loaded from
  // (so this works whether you're at /hub/index.html or /animal-kingdom/index.html).
  const SCRIPT_DIR = (function () {
    try {
      const scripts = document.getElementsByTagName("script");
      for (let i = scripts.length - 1; i >= 0; i--) {
        const s = scripts[i].src || "";
        if (s.indexOf("profiles.js") !== -1) {
          return s.replace(/profiles\.js(\?.*)?$/, "");
        }
      }
    } catch (_) {}
    return "/_shared/profiles/";
  })();

  const PROFILES = [
    {
      id: "sophie",
      name: "Sophie",
      dob: "older",
      avatar: SCRIPT_DIR + "avatars/sophie.png",
      accent: "#C8A24B", // Expedition gold
    },
    {
      id: "adeline",
      name: "Adeline",
      dob: "2019-03-13",
      avatar: SCRIPT_DIR + "avatars/adeline.png",
      accent: "#A8432A", // Rust
    },
    {
      id: "libby",
      name: "Libby",
      dob: "2020-10-31",
      avatar: SCRIPT_DIR + "avatars/libby.png",
      accent: "#6B8CAE", // Sky
    },
    {
      id: "veda",
      name: "Veda",
      dob: "2022-07-22",
      avatar: SCRIPT_DIR + "avatars/veda.png",
      accent: "#1B3A2F", // Deep field
    },
  ];

  const ACTIVE_KEY = "save_active_profile_v1";
  // Keys that should NEVER be namespaced (apply globally across all kids):
  const GLOBAL_KEYS = new Set([
    ACTIVE_KEY,
    "save_mute_v1",
  ]);

  // ---------- Sandbox-safe raw storage ----------
  const _memStore = {};
  const _rawStore = (function () {
    try {
      const s = window["local" + "Storage"];
      s.setItem("__profiles_probe__", "1");
      s.removeItem("__profiles_probe__");
      return s;
    } catch (_) {
      return {
        getItem: (k) => (k in _memStore ? _memStore[k] : null),
        setItem: (k, v) => {
          _memStore[k] = String(v);
        },
        removeItem: (k) => {
          delete _memStore[k];
        },
      };
    }
  })();

  // ---------- Active-profile state ----------
  let _activeId = null;
  try {
    _activeId = _rawStore.getItem(ACTIVE_KEY);
  } catch (_) {}
  if (_activeId && !PROFILES.find((p) => p.id === _activeId)) {
    _activeId = null; // unknown profile id → clear
  }

  function _scopedKey(key) {
    if (GLOBAL_KEYS.has(key)) return key;
    if (key.indexOf("save_active_profile_") === 0) return key;
    if (key.indexOf("save_mute_") === 0) return key;
    if (!_activeId) return key; // before pick, no namespacing
    return "p_" + _activeId + "::" + key;
  }

  // ---------- Public SaveStore (drop-in browser key/value proxy) ----------
  const SaveStore = {
    getItem(key) {
      try {
        return _rawStore.getItem(_scopedKey(key));
      } catch (_) {
        return null;
      }
    },
    setItem(key, value) {
      try {
        _rawStore.setItem(_scopedKey(key), String(value));
      } catch (_) {}
    },
    removeItem(key) {
      try {
        _rawStore.removeItem(_scopedKey(key));
      } catch (_) {}
    },
    // Helpful: read a value for a SPECIFIC profile (used by chip badge counts).
    getItemFor(profileId, key) {
      if (GLOBAL_KEYS.has(key)) return _rawStore.getItem(key);
      try {
        return _rawStore.getItem("p_" + profileId + "::" + key);
      } catch (_) {
        return null;
      }
    },
    // For modules that want to share the proxy as their underlying store:
    asLocalStorage() {
      return this;
    },
  };
  window.SaveStore = SaveStore;

  // ---------- ProfileAPI ----------
  const _changeListeners = [];
  function _emitChange() {
    for (const fn of _changeListeners) {
      try {
        fn(getActive());
      } catch (_) {}
    }
  }

  function list() {
    return PROFILES.slice();
  }
  function getActive() {
    if (!_activeId) return null;
    return PROFILES.find((p) => p.id === _activeId) || null;
  }
  function setActive(id) {
    if (!PROFILES.find((p) => p.id === id)) return;
    _activeId = id;
    try {
      _rawStore.setItem(ACTIVE_KEY, id);
    } catch (_) {}
    _renderChip();
    _emitChange();
  }
  function onChange(fn) {
    if (typeof fn === "function") _changeListeners.push(fn);
  }

  window.ProfileAPI = { list, getActive, setActive, onChange };

  // ---------- UI: profile chip (header) ----------
  function _renderChip() {
    const existing = document.getElementById("save-profile-chip");
    if (existing) existing.remove();
    const active = getActive();
    if (!active) return;

    const chip = document.createElement("button");
    chip.id = "save-profile-chip";
    chip.className = "save-profile-chip";
    chip.type = "button";
    chip.setAttribute("aria-label", "Switch profile (current: " + active.name + ")");
    chip.style.setProperty("--chip-accent", active.accent);
    chip.innerHTML =
      '<span class="save-profile-chip__avatar">' +
      '<img src="' + active.avatar + '" alt="" />' +
      "</span>" +
      '<span class="save-profile-chip__name">' + active.name + "</span>" +
      '<svg class="save-profile-chip__chev" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
    chip.addEventListener("click", () => openPicker({ allowClose: true }));
    document.body.appendChild(chip);
  }

  // ---------- UI: profile picker (modal) ----------
  function openPicker(opts) {
    opts = opts || {};
    const allowClose = !!opts.allowClose;

    // Avoid duplicate
    const existing = document.getElementById("save-profile-picker");
    if (existing) existing.remove();

    const wrap = document.createElement("div");
    wrap.id = "save-profile-picker";
    wrap.className = "save-profile-picker" + (allowClose ? "" : " is-first-launch");
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-modal", "true");
    wrap.setAttribute("aria-labelledby", "save-profile-picker-title");

    const card = document.createElement("div");
    card.className = "save-profile-picker__card";

    const title = document.createElement("h2");
    title.id = "save-profile-picker-title";
    title.className = "save-profile-picker__title";
    title.textContent = allowClose ? "Switch Explorer" : "Who's exploring today?";
    card.appendChild(title);

    const sub = document.createElement("p");
    sub.className = "save-profile-picker__sub";
    sub.textContent = allowClose
      ? "Tap your face to switch. Each explorer has her own coins, passport, and badges."
      : "Tap your face to start. Your stuff stays yours — coins, passport, badges, all of it.";
    card.appendChild(sub);

    const grid = document.createElement("div");
    grid.className = "save-profile-picker__grid";
    PROFILES.forEach((p) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "save-profile-picker__pick";
      btn.style.setProperty("--pick-accent", p.accent);
      btn.innerHTML =
        '<span class="save-profile-picker__avatar">' +
        '<img src="' + p.avatar + '" alt="" />' +
        "</span>" +
        '<span class="save-profile-picker__name">' + p.name + "</span>";
      btn.addEventListener("click", () => {
        setActive(p.id);
        wrap.classList.add("is-closing");
        setTimeout(() => {
          wrap.remove();
        }, 220);
      });
      grid.appendChild(btn);
    });
    card.appendChild(grid);

    if (allowClose) {
      const close = document.createElement("button");
      close.type = "button";
      close.className = "save-profile-picker__close";
      close.setAttribute("aria-label", "Close");
      close.innerHTML = "&times;";
      close.addEventListener("click", () => {
        wrap.classList.add("is-closing");
        setTimeout(() => wrap.remove(), 220);
      });
      card.appendChild(close);
    }

    wrap.appendChild(card);
    document.body.appendChild(wrap);
  }

  window.ProfileAPI.openPicker = openPicker;

  // ---------- Boot ----------
  function _boot() {
    if (!getActive()) {
      openPicker({ allowClose: false });
    } else {
      _renderChip();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", _boot);
  } else {
    _boot();
  }
})();
