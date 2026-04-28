const STORAGE_KEY = "msm_progress_v1";
const LEGACY_STORAGE_KEY = "save.mainStreetMakers.v1";
const SAFE_ICONS = ["🍋", "🐾", "🎨", "🍪", "🧵", "🌱", "📚", "💌", "🧺", "🪴"];
const DEFAULT_PROFILE_NAME = "Founder";

const PRESET_BUSINESSES = [
  {
    id: "lemonade",
    title: "Lemonade Stand",
    type: "Drink stand",
    product: "Cold lemonade",
    icon: "🍋",
    price: 2,
    supplies: ["lemons", "cups", "ice"],
    blurb: "A sunny stand with cups, coins, and a cheerful sign.",
  },
  {
    id: "pet-treat",
    title: "Pet Treat Cart",
    type: "Treat cart",
    product: "Pet treats",
    icon: "🐾",
    price: 3,
    supplies: ["oats", "bags", "labels"],
    blurb: "A small cart that serves neighbors with pets.",
  },
  {
    id: "art-sticker",
    title: "Art & Sticker Booth",
    type: "Art booth",
    product: "Handmade stickers",
    icon: "🎨",
    price: 1,
    supplies: ["paper", "markers", "sticker sheets"],
    blurb: "A market booth full of color and careful designs.",
  },
];

const BUILDINGS = [
  {
    id: "idea",
    name: "Idea Bench",
    topic: "What is a business?",
    badge: "Idea Finder",
    icon: "💡",
    lesson: "A business helps people by offering a product or service.",
    notebookPrompt: "What need will your business help with?",
    reward: 2,
  },
  {
    id: "workshop",
    name: "Garage Workshop",
    topic: "Products and services",
    badge: "Offer Builder",
    icon: "🛠️",
    lesson: "A product is a thing people buy. A service is a helpful job.",
    notebookPrompt: "Is your offer a product, a service, or both?",
    reward: 2,
  },
  {
    id: "supply",
    name: "Supply Store",
    topic: "Costs and supplies",
    badge: "Supply Scout",
    icon: "📦",
    lesson: "Supplies cost money before you sell.",
    notebookPrompt: "Which supplies matter most for your first day?",
    reward: 0,
  },
  {
    id: "sign",
    name: "Sign Shop",
    topic: "Business name and branding",
    badge: "Sign Maker",
    icon: "🪧",
    lesson: "A clear name and sign help customers remember you.",
    notebookPrompt: "What slogan will help people remember your shop?",
    reward: 2,
  },
  {
    id: "market",
    name: "Market Booth",
    topic: "Customers and selling",
    badge: "First Sale",
    icon: "🧺",
    lesson: "Good sellers listen to customers.",
    notebookPrompt: "Who is one customer your business can serve?",
    reward: 5,
  },
  {
    id: "price",
    name: "Price Post",
    topic: "Pricing",
    badge: "Price Picker",
    icon: "🏷️",
    lesson: "A smart price helps customers and helps the business.",
    notebookPrompt: "What price feels fair for your first offer?",
    reward: 3,
  },
  {
    id: "money",
    name: "Money Notebook",
    topic: "Revenue, expenses, profit",
    badge: "Profit Counter",
    icon: "🧮",
    lesson: "Money in minus money out equals profit.",
    notebookPrompt: "Write one money-in and one money-out example.",
    reward: 4,
  },
  {
    id: "town",
    name: "Town Hall",
    topic: "Town Share",
    badge: "Town Helper",
    icon: "🏛️",
    lesson: "A small part of profit can help the town.",
    notebookPrompt: "What town upgrade did you choose, and why?",
    reward: -2,
  },
  {
    id: "bank",
    name: "Bank Barn",
    topic: "Saving and reinvesting",
    badge: "Smart Saver",
    icon: "🏦",
    lesson: "Saving gives your business choices.",
    notebookPrompt: "Would you save coins or buy an upgrade next?",
    reward: 1,
  },
  {
    id: "grand",
    name: "Grand Opening Street",
    topic: "Growth",
    badge: "Main Street Maker",
    icon: "🎉",
    lesson: "A business grows step by step.",
    notebookPrompt: "What did you learn as a Main Street Maker?",
    reward: 5,
  },
];

const GROWTH_PATH = [
  ["Main Street", "First stand or booth"],
  ["Whole Town", "A small shop with more helpers"],
  ["County Route", "Nearby delivery and a second spot"],
  ["State Map", "A regional business"],
  ["U.S. Map", "A national business"],
  ["World Shipping", "A future global stage"],
];

const DEFAULT_STATE = {
  profiles: {},
  activeProfileId: "",
};

let memoryStore = null;
let appState = loadRootState();
let view = "welcome";
let activeMissionId = null;
let selectedChoice = "";
let tempIcon = SAFE_ICONS[0];

const app = document.getElementById("app");
const toast = document.getElementById("toast");

function safeLocalStorage() {
  try {
    const key = "local" + "Storage";
    const test = "__save_test__";
    const store = window[key];
    store.setItem(test, "1");
    store.removeItem(test);
    return store;
  } catch {
    return null;
  }
}

function loadRootState() {
  if (hasSharedProfiles()) return normalizeRoot(DEFAULT_STATE);
  const storage = safeLocalStorage();
  if (storage) {
    const raw = storage.getItem(LEGACY_STORAGE_KEY);
    if (raw) {
      try {
        return normalizeRoot(JSON.parse(raw));
      } catch {}
    }
  }
  if (memoryStore) return normalizeRoot(memoryStore);
  return normalizeRoot(DEFAULT_STATE);
}

function saveRootState() {
  const clean = normalizeRoot(appState);
  appState = clean;
  if (hasSharedProfiles()) return;
  const storage = safeLocalStorage();
  if (storage) {
    storage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(clean));
    return;
  }
  memoryStore = clean;
}

function normalizeRoot(root) {
  const next = structuredCloneSafe(root || DEFAULT_STATE);
  next.profiles = next.profiles || {};
  next.activeProfileId = next.activeProfileId || "";
  Object.keys(next.profiles).forEach((id) => {
    next.profiles[id] = normalizeProfile(next.profiles[id], id);
  });
  if (next.activeProfileId && !next.profiles[next.activeProfileId]) {
    next.activeProfileId = "";
  }
  return next;
}

function hasSharedProfiles() {
  return !!(window.ProfileAPI && window.SaveStore && window.SaveStore.getItem && window.SaveStore.setItem);
}

function sharedProfileBase() {
  if (!hasSharedProfiles()) return null;
  const profile = window.ProfileAPI.getActive?.();
  if (!profile) return null;
  return {
    id: profile.id || "guest",
    name: profile.displayName || profile.name || DEFAULT_PROFILE_NAME,
    displayName: profile.displayName || profile.name || DEFAULT_PROFILE_NAME,
    avatar: profile.avatar || "",
    accent: profile.accent || "#2F5D46",
  };
}

function loadSharedProgress(base) {
  if (!base) return null;
  let progress = {};
  try {
    const raw = window.SaveStore.getItem(STORAGE_KEY);
    if (raw) progress = JSON.parse(raw) || {};
  } catch {}
  if (!Object.keys(progress).length) {
    progress = migrateLegacyProgress(base) || {};
  }
  return normalizeProfile({ ...progress, id: base.id, name: base.name }, base.id);
}

function saveSharedProgress(profile) {
  if (!hasSharedProfiles() || !profile) return;
  const progress = {
    selectedBusiness: profile.selectedBusiness || "",
    customBusiness: profile.customBusiness || {},
    coins: Math.max(0, Number(profile.coins) || 0),
    unlockedBuildings: profile.unlockedBuildings || ["idea"],
    completedBuildings: profile.completedBuildings || [],
    badges: profile.badges || [],
    notebook: profile.notebook || {},
    townUpgrades: profile.townUpgrades || [],
    businessName: profile.businessName || "",
    slogan: profile.slogan || "",
    signColor: profile.signColor || "#B84A32",
  };
  try {
    window.SaveStore.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {}
}

function migrateLegacyProgress(base) {
  const storage = safeLocalStorage();
  if (!storage) return null;
  try {
    const raw = storage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return null;
    const legacy = JSON.parse(raw);
    const profiles = Object.values(legacy?.profiles || {});
    const byName = profiles.find((p) => cleanName(p.name).toLowerCase() === cleanName(base.name).toLowerCase());
    const byActive = legacy?.activeProfileId ? legacy.profiles?.[legacy.activeProfileId] : null;
    const picked = byName || byActive || null;
    if (!picked) return null;
    const migrated = normalizeProfile({ ...picked, id: base.id, name: base.name }, base.id);
    saveSharedProgress(migrated);
    return migrated;
  } catch {
    return null;
  }
}

function structuredCloneSafe(obj) {
  try {
    return structuredClone(obj);
  } catch {
    return JSON.parse(JSON.stringify(obj));
  }
}

function createProfile(name) {
  if (hasSharedProfiles()) {
    window.ProfileAPI.openPicker?.({ allowClose: true });
    return activeProfile();
  }
  const id = "profile-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7);
  appState.profiles[id] = normalizeProfile({ name: cleanName(name) }, id);
  appState.activeProfileId = id;
  saveRootState();
  return appState.profiles[id];
}

function normalizeProfile(profile, id) {
  const name = cleanName(profile?.name || DEFAULT_PROFILE_NAME);
  return {
    id,
    name,
    selectedBusiness: profile?.selectedBusiness || "",
    customBusiness: profile?.customBusiness || {},
    coins: Number.isFinite(profile?.coins) ? Math.max(0, profile.coins) : 10,
    unlockedBuildings: Array.isArray(profile?.unlockedBuildings) && profile.unlockedBuildings.length ? profile.unlockedBuildings : ["idea"],
    completedBuildings: Array.isArray(profile?.completedBuildings) ? profile.completedBuildings : [],
    badges: Array.isArray(profile?.badges) ? profile.badges : [],
    notebook: profile?.notebook || {},
    townUpgrades: Array.isArray(profile?.townUpgrades) ? profile.townUpgrades : [],
    businessName: profile?.businessName || "",
    slogan: profile?.slogan || "",
    signColor: profile?.signColor || "#B84A32",
  };
}

function cleanName(value) {
  const name = String(value || "").trim().replace(/[<>]/g, "");
  return name || DEFAULT_PROFILE_NAME;
}

function activeProfile() {
  const base = sharedProfileBase();
  if (base) return loadSharedProgress(base);
  if (!appState.activeProfileId || !appState.profiles[appState.activeProfileId]) return null;
  return appState.profiles[appState.activeProfileId];
}

function setProfile(profile) {
  if (hasSharedProfiles()) {
    saveSharedProgress(profile);
    return;
  }
  appState.profiles[profile.id] = normalizeProfile(profile, profile.id);
  saveRootState();
}

function currentBusiness(profile = activeProfile()) {
  if (!profile) return null;
  if (profile.selectedBusiness === "custom") {
    return {
      title: profile.businessName || profile.customBusiness.shopName || "My Shop",
      type: profile.customBusiness.shopType || "Small shop",
      product: profile.customBusiness.product || "Helpful offer",
      icon: profile.customBusiness.icon || "🧺",
      price: Number(profile.customBusiness.price) || 1,
      supplies: profile.customBusiness.supplies || ["supply one", "supply two", "supply three"],
      blurb: "A shop designed by the active learner.",
    };
  }
  return PRESET_BUSINESSES.find((b) => b.id === profile.selectedBusiness) || null;
}

function brandMark() {
  return `
    <svg class="brand-mark" viewBox="0 0 80 80" role="img" aria-label="SAVE Learning Co. Main Street mark">
      <path d="M12 54h56v14H12z" fill="currentColor" opacity=".18"/>
      <path d="M16 28h48v30H16z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/>
      <path d="M10 30 40 10l30 20" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M25 42h30M25 51h20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
      <circle cx="60" cy="58" r="7" fill="#D7A84A" stroke="currentColor" stroke-width="4"/>
    </svg>
  `;
}

function topbar() {
  const profile = activeProfile();
  return `
    <header class="topbar">
      <div class="brand-lockup">
        ${brandMark()}
        <div>
          <div class="brand-kicker">SAVE Learning Co.</div>
          <div class="brand-name">Main Street Makers</div>
        </div>
      </div>
      <button class="profile-pill" data-action="profiles" data-testid="button-profile">
        <span aria-hidden="true">👤</span>
        <span>${profile ? escapeHtml(profile.name) : "Choose learner"}</span>
      </button>
    </header>
  `;
}

function render() {
  const profile = activeProfile();
  if (!profile && view !== "welcome" && view !== "profiles") view = "profiles";
  let html = topbar();
  if (view === "welcome") html += renderWelcome();
  if (view === "profiles") html += renderProfiles();
  if (view === "business") html += renderBusinessPicker();
  if (view === "creator") html += renderCreator();
  if (view === "map") html += renderMap();
  if (view === "notebook") html += renderNotebook();
  if (view === "parent") html += renderParentGuide();
  if (view === "growth") html += renderGrowthPath();
  app.innerHTML = html + footer();
  wireEvents();
  if (activeMissionId) renderMissionModal(activeMissionId);
}

function footer() {
  return `
    <footer class="footer-note">
      <strong>SAVE Learning Co.</strong> · © 2026 SAVE Learning Co. All rights reserved.
      <br />Original CSS/SVG-style illustrations only. No stock photos are used in this v1 app.
    </footer>
  `;
}

function renderWelcome() {
  const profile = activeProfile();
  const learnerLine = profile ? `Welcome back, ${escapeHtml(profile.name)}.` : "Choose a learner to begin.";
  return `
    <main class="screen hero" data-testid="screen-welcome">
      <section class="hero-card">
        <span class="kicker">Small Town Business · Main Street Press</span>
        <h1>Build a tiny shop with big ideas.</h1>
        <p class="hero-copy">
          ${learnerLine} Pick a business, earn coins, stamp badges, and grow from a first booth to a future national business.
        </p>
        <div class="hero-actions">
          <button class="primary-button" data-action="${profile ? "start" : "profiles"}" data-testid="button-start">
            ${profile ? "Open Main Street" : "Choose learner"}
          </button>
          <button class="secondary-button" data-action="parent" data-testid="button-parent-welcome">Parent Guide</button>
        </div>
        <div class="pull-note">
          First workbook mission included: Idea Bench teaches what a business is with a short reading, activity, and Founder Notebook prompt.
        </div>
      </section>
      <section class="town-preview" aria-label="Illustrated small town preview">
        <div class="coin-stack" aria-hidden="true"><div class="coin">¢</div><div class="coin">¢</div><div class="coin">¢</div></div>
        <div class="preview-building b1"><span>Idea Bench</span></div>
        <div class="preview-building b2"><span>Market Booth</span></div>
        <div class="preview-building b3"><span>Town Hall</span></div>
      </section>
    </main>
  `;
}

function renderProfiles() {
  if (hasSharedProfiles()) return renderSharedProfiles();
  const profiles = Object.values(appState.profiles);
  return `
    <main class="screen">
      <div class="screen-header">
        <div>
          <span class="kicker">Learner Profiles</span>
          <h1>Who is building today?</h1>
          <p>Progress saves separately for each child on this device or through the shared SAVE profile tools when available.</p>
        </div>
        <button class="secondary-button" data-action="welcome" data-testid="button-back-welcome">Back</button>
      </div>
      <section class="panel">
        <div class="grid business-grid">
          ${profiles
            .map(
              (profile) => `
            <button class="business-card" data-profile-id="${profile.id}" data-testid="button-profile-${profile.id}">
              <div class="business-icon">👤</div>
              <h3>${escapeHtml(profile.name)}</h3>
              <p>${profile.badges.length} badge${profile.badges.length === 1 ? "" : "s"} · ${profile.coins} coins</p>
            </button>
          `,
            )
            .join("")}
          ${profiles.length === 0 ? `<div class="empty-note">No learners yet. Add the first learner below.</div>` : ""}
        </div>
        <form class="profile-actions" data-form="profile">
          <label>
            Learner name
            <input name="name" autocomplete="off" maxlength="24" placeholder="Enter learner name" data-testid="input-profile-name" />
          </label>
          <button class="primary-button" type="submit" data-testid="button-add-profile">Add or switch learner</button>
        </form>
      </section>
    </main>
  `;
}

function renderSharedProfiles() {
  const profiles = window.ProfileAPI.list?.() || [];
  const active = window.ProfileAPI.getActive?.();
  return `
    <main class="screen">
      <div class="screen-header">
        <div>
          <span class="kicker">Shared SAVE Profiles</span>
          <h1>Who is building today?</h1>
          <p>This uses the same learner database as Expedition Atlas and Animal Kingdom. The active learner is shared across hubs, while Main Street progress stays separate.</p>
        </div>
        <button class="secondary-button" data-action="welcome" data-testid="button-back-welcome">Back</button>
      </div>
      <section class="panel">
        <div class="grid business-grid">
          ${profiles
            .map(
              (profile) => {
                const progress = loadSharedProgress({
                  id: profile.id,
                  name: profile.displayName || profile.name || DEFAULT_PROFILE_NAME,
                  displayName: profile.displayName || profile.name || DEFAULT_PROFILE_NAME,
                  avatar: profile.avatar || "",
                  accent: profile.accent || "#2F5D46",
                });
                const selected = active?.id === profile.id;
                return `
                  <button class="business-card" data-shared-profile-id="${profile.id}" data-testid="button-shared-profile-${profile.id}">
                    <div class="business-icon">${selected ? "✓" : "👤"}</div>
                    <h3>${escapeHtml(profile.displayName || profile.name)}</h3>
                    <p>${selected ? "Active learner" : "Switch to this learner"}</p>
                    <div class="ledger-row"><span>Main Street badges</span><strong>${progress.badges.length}</strong></div>
                    <div class="ledger-row"><span>Main Street coins</span><strong>${progress.coins}</strong></div>
                  </button>
                `;
              },
            )
            .join("")}
        </div>
        <div class="button-row">
          <button class="primary-button" data-action="open-shared-picker" data-testid="button-open-shared-picker">Open Atlas-style picker</button>
          <button class="secondary-button" data-action="start" data-testid="button-profile-continue">Continue</button>
        </div>
      </section>
    </main>
  `;
}

function renderBusinessPicker() {
  const profile = activeProfile();
  return `
    <main class="screen">
      <div class="screen-header">
        <div>
          <span class="kicker">${escapeHtml(profile.name)}'s Founder Notebook</span>
          <h1>Pick your first business.</h1>
          <p>Start with 10 coins. Each mission helps your business grow one step.</p>
        </div>
        ${statusStrip(profile)}
      </div>
      <section class="grid business-grid">
        ${PRESET_BUSINESSES.map((b) => businessCard(b)).join("")}
        <button class="business-card" data-action="creator" data-testid="button-custom-shop">
          <div class="business-icon">✨</div>
          <h3>Create My Own Shop</h3>
          <p>Choose a name, offer, supplies, icon, and starting price.</p>
        </button>
      </section>
    </main>
  `;
}

function businessCard(business) {
  return `
    <button class="business-card" data-business="${business.id}" data-testid="button-business-${business.id}">
      <div class="business-icon">${business.icon}</div>
      <h3>${business.title}</h3>
      <p>${business.blurb}</p>
      <div class="ledger-row"><span>Starting price</span><strong>${business.price} coins</strong></div>
    </button>
  `;
}

function renderCreator() {
  return `
    <main class="screen">
      <div class="screen-header">
        <div>
          <span class="kicker">Create My Own Shop</span>
          <h1>Design a safe, simple business.</h1>
          <p>Examples: Cookie Cart, Bracelet Booth, Lawn Helper, Bookmark Shop, Garden Stand, Birthday Card Table.</p>
        </div>
        <button class="secondary-button" data-action="business" data-testid="button-back-business">Back</button>
      </div>
      <section class="creator-card">
        <form data-form="custom">
          <div class="form-grid two">
            <label>Shop name<input name="shopName" maxlength="32" required placeholder="Cookie Cart" data-testid="input-shop-name" /></label>
            <label>Shop type/category<input name="shopType" maxlength="32" required placeholder="Food stand" data-testid="input-shop-type" /></label>
            <label>Product or service<input name="product" maxlength="42" required placeholder="Homemade cookies" data-testid="input-product" /></label>
            <label>Starting price<input name="price" type="number" min="1" max="9" value="2" required data-testid="input-price" /></label>
          </div>
          <div class="form-grid">
            <label>Three supplies<input name="supplies" maxlength="80" required placeholder="flour, bags, labels" data-testid="input-supplies" /></label>
            <fieldset>
              <legend class="kicker">Choose a shop icon</legend>
              <div class="safe-icons">
                ${SAFE_ICONS.map(
                  (icon, idx) => `
                  <button type="button" class="icon-choice ${idx === 0 ? "selected" : ""}" data-icon="${icon}" data-testid="button-icon-${idx}" aria-label="Choose ${icon}">${icon}</button>
                `,
                ).join("")}
              </div>
            </fieldset>
          </div>
          <div class="button-row">
            <button class="primary-button" type="submit" data-testid="button-save-custom">Open my shop</button>
          </div>
        </form>
      </section>
    </main>
  `;
}

function renderMap() {
  const profile = activeProfile();
  const business = currentBusiness(profile);
  if (!business) {
    view = "business";
    return renderBusinessPicker();
  }
  return `
    <main class="screen">
      <div class="screen-header">
        <div>
          <span class="kicker">Main Street Hub</span>
          <h1>${escapeHtml(business.title)} Main Street</h1>
          <p>Tap an unlocked building. Finish its mission to stamp a badge and unlock the next stop.</p>
        </div>
        ${statusStrip(profile)}
      </div>
      <div class="map-layout">
        <section class="map-shell">
          <div class="map-illustration" aria-label="Cozy illustrated small town map">
            ${BUILDINGS.map((b, i) => buildingButton(profile, b, i)).join("")}
          </div>
        </section>
        <aside class="side-ledger">
          <section class="panel">
            <span class="kicker">Shop Ledger</span>
            <div class="ledger-list">
              <div class="ledger-row"><span>Learner</span><strong>${escapeHtml(profile.name)}</strong></div>
              <div class="ledger-row"><span>Business</span><strong>${escapeHtml(business.title)}</strong></div>
              <div class="ledger-row"><span>Offer</span><strong>${escapeHtml(business.product)}</strong></div>
              <div class="ledger-row"><span>Coins</span><strong>${profile.coins}</strong></div>
            </div>
            <div class="button-row">
              <button class="secondary-button" data-action="notebook" data-testid="button-notebook">Founder Notebook</button>
              <button class="secondary-button" data-action="growth" data-testid="button-growth">Big Map Path</button>
              <button class="secondary-button" data-action="parent" data-testid="button-parent-map">Parent Guide</button>
            </div>
          </section>
          <section class="panel">
            <span class="kicker">Badges</span>
            <div class="ledger-list">
              ${profile.badges.length ? profile.badges.map((b) => `<span class="badge-chip">✓ ${escapeHtml(b)}</span>`).join("") : `<p>No badges yet. The Idea Bench is ready.</p>`}
            </div>
          </section>
        </aside>
      </div>
    </main>
  `;
}

function buildingButton(profile, building, index) {
  const unlocked = profile.unlockedBuildings.includes(building.id);
  const done = profile.completedBuildings.includes(building.id);
  return `
    <button
      class="map-building position-${index} ${unlocked ? "" : "locked"} ${done ? "done" : ""}"
      ${unlocked ? `data-mission="${building.id}"` : ""}
      aria-label="${unlocked ? "Open" : "Locked"} ${building.name}"
      data-testid="button-building-${building.id}"
    >
      <i class="roof" aria-hidden="true"></i>
      <span class="emoji" aria-hidden="true">${building.icon}</span>
      <span>${building.name}</span>
      ${done ? `<b class="stamp">DONE</b>` : ""}
    </button>
  `;
}

function statusStrip(profile) {
  const completed = profile.completedBuildings.length;
  return `
    <div class="status-strip" data-testid="status-strip">
      <span class="status-chip" data-testid="text-coins">🪙 ${profile.coins} coins</span>
      <span class="status-chip" data-testid="text-progress">📍 ${completed}/${BUILDINGS.length} missions</span>
      <span class="status-chip" data-testid="text-badges">🏅 ${profile.badges.length} badges</span>
    </div>
  `;
}

function renderMissionModal(id) {
  const profile = activeProfile();
  const mission = BUILDINGS.find((b) => b.id === id);
  if (!profile || !mission) return;
  const business = currentBusiness(profile);
  const done = profile.completedBuildings.includes(id);
  const modal = document.createElement("div");
  modal.className = "modal-backdrop";
  modal.dataset.modal = "mission";
  modal.innerHTML = `
    <article class="modal-card" role="dialog" aria-modal="true" aria-labelledby="mission-title" data-testid="modal-mission">
      <header class="modal-header">
        <div>
          <span class="mission-tag">${mission.topic}</span>
          <h2 id="mission-title">${mission.icon} ${mission.name}</h2>
          <p><strong>Badge:</strong> ${mission.badge}</p>
        </div>
        <button class="icon-button" data-action="close-mission" aria-label="Close mission" data-testid="button-close-mission">✕</button>
      </header>
      ${mission.id === "idea" ? ideaWorkbook(profile, business, mission) : missionActivity(profile, business, mission)}
      <div class="mission-actions">
        <button class="primary-button" data-action="complete-mission" data-mission-complete="${mission.id}" ${done ? "disabled" : ""} data-testid="button-complete-mission">
          ${done ? "Badge stamped" : "Stamp badge"}
        </button>
        <button class="secondary-button" data-action="notebook" data-testid="button-open-notebook-mission">Open Notebook</button>
      </div>
    </article>
  `;
  document.body.appendChild(modal);
  wireEvents();
  const closeButton = modal.querySelector("[data-action='close-mission']");
  closeButton?.focus();
}

function ideaWorkbook(profile, business, mission) {
  const need = profile.notebook.ideaNeed || "";
  return `
    <div class="workbook-spread">
      <section class="feature-page">
        <span class="kicker">First Workbook Mission</span>
        <h3 class="feature-headline">A business begins with help.</h3>
        <p>A business is not just a table, a sign, or a jar of coins. A business helps someone.</p>
        <p>A lemonade stand helps a thirsty neighbor. A sticker booth helps a friend decorate a notebook. A lawn helper helps a family care for a yard.</p>
        <p>Your job today is to look for a need. Then your shop can offer a product or service that fits that need.</p>
        <div class="pull-note">Founder rule: Find the need before you count the coins.</div>
      </section>
      <section class="activity-zone">
        <div class="activity-card">
          <span class="kicker">Activity</span>
          <h3>Choose a customer need.</h3>
          <p>Your business is <strong>${escapeHtml(business.title)}</strong>. Which customer need fits best?</p>
          <div class="choice-list">
            ${[
              ["thirsty", "A neighbor is thirsty on a warm afternoon."],
              ["gift", "A child needs a small gift for a friend."],
              ["tidy", "A family needs help keeping something tidy."],
            ]
              .map(
                ([value, label]) => `
              <button class="choice-card ${selectedChoice === value || need === label ? "selected" : ""}" data-choice="${value}" data-choice-label="${label}" data-testid="button-need-${value}">
                ${label}
              </button>
            `,
              )
              .join("")}
          </div>
        </div>
        <label>
          Founder Notebook
          <textarea data-notebook-field="ideaNeed" data-testid="textarea-idea-need" placeholder="My business helps people who need...">${escapeHtml(need)}</textarea>
        </label>
      </section>
    </div>
  `;
}

function missionActivity(profile, business, mission) {
  const saved = profile.notebook[mission.id] || "";
  const body = {
    workshop: productServiceSort(business),
    supply: supplyActivity(profile, business),
    sign: signActivity(profile),
    market: customerActivity(business),
    price: priceActivity(business),
    money: moneyActivity(),
    town: townActivity(),
    bank: bankActivity(profile),
    grand: grandActivity(profile),
  }[mission.id];
  return `
    <div class="workbook-spread">
      <section class="feature-page">
        <span class="kicker">Lesson</span>
        <h3 class="feature-headline">${mission.lesson}</h3>
        <p>${lessonCopy(mission.id, business)}</p>
        <div class="pull-note">${mission.notebookPrompt}</div>
      </section>
      <section class="activity-zone">
        ${body}
        <label>
          Founder Notebook
          <textarea data-notebook-field="${mission.id}" data-testid="textarea-${mission.id}" placeholder="Write your founder answer here.">${escapeHtml(saved)}</textarea>
        </label>
      </section>
    </div>
  `;
}

function lessonCopy(id, business) {
  const copy = {
    workshop: `Your ${business.title} can sell a thing, do a helpful job, or sometimes do both. Good founders can explain the offer in one clear sentence.`,
    supply: `Before the first sale, a founder often buys supplies. Wise founders keep enough coins for the next step.`,
    sign: `A name, color, and slogan are like a friendly wave from your shop. They help customers know what you offer.`,
    market: `Customers are people with needs. A careful seller asks, listens, and serves kindly.`,
    price: `A price that is too low can empty your coin jar. A price that is too high can send customers away. A fair price can help both sides.`,
    money: `Revenue is money in. Expenses are money out. Profit is what remains after expenses.`,
    town: `The Town Share is a kid-sized model. It shows that businesses keep records and can help shared town needs.`,
    bank: `Saving coins can help you buy better supplies later. Reinvesting means using some coins to help the business grow.`,
    grand: `Growth is not magic. It is many faithful steps: idea, offer, supplies, sign, customers, price, records, sharing, saving, and trying again.`,
  };
  return copy[id] || "";
}

function productServiceSort(business) {
  return `
    <div class="activity-card">
      <h3>Sort the cards.</h3>
      <p>Tap the card that best describes your offer.</p>
      <div class="inline-grid">
        <button class="choice-card" data-choice-label="${business.product} is a product." data-testid="button-product-card"><strong>Product</strong><br />A thing people buy.</button>
        <button class="choice-card" data-choice-label="${business.product} is a service." data-testid="button-service-card"><strong>Service</strong><br />A helpful job.</button>
      </div>
    </div>
  `;
}

function supplyActivity(profile, business) {
  const supplies = business.supplies || [];
  return `
    <div class="activity-card">
      <h3>Buy supplies.</h3>
      <p>Choose a starter bundle. Coins never go below zero.</p>
      <div class="inline-grid">
        <button class="choice-card" data-supply-cost="3" data-choice-label="I bought a careful starter bundle: ${escapeHtml(supplies.join(", "))}." data-testid="button-supply-small">Starter Bundle<br /><strong>3 coins</strong></button>
        <button class="choice-card" data-supply-cost="6" data-choice-label="I bought a bigger supply bundle and kept some coins." data-testid="button-supply-medium">Market Bundle<br /><strong>6 coins</strong></button>
        <button class="choice-card" data-supply-cost="11" data-choice-label="That bundle costs too much right now." data-testid="button-supply-large">Too-Big Bundle<br /><strong>11 coins</strong></button>
      </div>
      <p class="status-chip">Current coins: ${profile.coins}</p>
    </div>
  `;
}

function signActivity(profile) {
  return `
    <div class="activity-card">
      <h3>Make a shop sign.</h3>
      <div class="form-grid">
        <label>Business name<input data-profile-field="businessName" value="${escapeHtml(profile.businessName)}" placeholder="Sunny Lemon Stand" data-testid="input-business-name" /></label>
        <label>Slogan<input data-profile-field="slogan" value="${escapeHtml(profile.slogan)}" placeholder="Fresh smiles by the cup!" data-testid="input-slogan" /></label>
        <label>Sign color<select data-profile-field="signColor" data-testid="select-sign-color">
          ${[
            ["#B84A32", "Shop Sign Red"],
            ["#2F5D46", "Ledger Green"],
            ["#5E7FA3", "Receipt Blue"],
            ["#6E557E", "Stamp Purple"],
          ]
            .map((c) => `<option value="${c[0]}" ${profile.signColor === c[0] ? "selected" : ""}>${c[1]}</option>`)
            .join("")}
        </select></label>
      </div>
    </div>
  `;
}

function customerActivity(business) {
  return `
    <div class="activity-card">
      <h3>Match the customer.</h3>
      <p>Who is most likely to need ${escapeHtml(business.product)}?</p>
      <div class="choice-list">
        <button class="choice-card" data-choice-label="A customer who needs ${escapeHtml(business.product)} is a good match." data-testid="button-customer-good">A neighbor who wants ${escapeHtml(business.product)}.</button>
        <button class="choice-card" data-choice-label="This customer may need a different business." data-testid="button-customer-other">A neighbor asking for something totally different.</button>
      </div>
    </div>
  `;
}

function priceActivity(business) {
  return `
    <div class="activity-card">
      <h3>Pick a fair price.</h3>
      <div class="inline-grid">
        <button class="choice-card" data-price-choice="low" data-choice-label="Low price: customers smile, but profit is tiny." data-testid="button-price-low">Low<br /><strong>${Math.max(1, business.price - 1)} coin</strong></button>
        <button class="choice-card" data-price-choice="fair" data-choice-label="Fair price: customers understand it, and the business can grow." data-testid="button-price-fair">Fair<br /><strong>${business.price} coins</strong></button>
        <button class="choice-card" data-price-choice="high" data-choice-label="High price: some customers walk away." data-testid="button-price-high">High<br /><strong>${business.price + 4} coins</strong></button>
      </div>
    </div>
  `;
}

function moneyActivity() {
  return `
    <div class="activity-card">
      <h3>Solve the coin math.</h3>
      <p>You sold 6 coins of goods. Supplies cost 3 coins.</p>
      <div class="choice-list">
        <button class="choice-card" data-choice-label="Profit = 6 - 3 = 3 coins." data-testid="button-profit-correct">Profit is 3 coins.</button>
        <button class="choice-card" data-choice-label="Try again: remember money in minus money out." data-testid="button-profit-wrong">Profit is 9 coins.</button>
      </div>
    </div>
  `;
}

function townActivity() {
  const upgrades = ["library shelf", "park bench", "streetlight", "sidewalk flowers", "market tent"];
  return `
    <div class="activity-card">
      <h3>Pay Town Share.</h3>
      <p>Choose one shared town need. This child-friendly model is not tax or legal advice.</p>
      <div class="choice-list">
        ${upgrades.map((u) => `<button class="choice-card" data-town-upgrade="${u}" data-choice-label="Town Share helped build a ${u}." data-testid="button-town-${slug(u)}">${titleCase(u)}</button>`).join("")}
      </div>
    </div>
  `;
}

function bankActivity(profile) {
  return `
    <div class="activity-card">
      <h3>Save or reinvest?</h3>
      <div class="inline-grid">
        <button class="choice-card" data-bank-choice="save" data-choice-label="I saved coins for a future choice." data-testid="button-bank-save">Save coins</button>
        <button class="choice-card" data-bank-choice="upgrade" data-choice-label="I bought one small upgrade for the business." data-testid="button-bank-upgrade">Buy an upgrade<br /><strong>2 coins</strong></button>
      </div>
      <p class="status-chip">Current coins: ${profile.coins}</p>
    </div>
  `;
}

function grandActivity(profile) {
  return `
    <div class="activity-card">
      <h3>Review your badges.</h3>
      <p>You have earned ${profile.badges.length} badge${profile.badges.length === 1 ? "" : "s"} so far.</p>
      <div class="ledger-list">
        ${profile.badges.map((b) => `<span class="badge-chip">✓ ${escapeHtml(b)}</span>`).join("")}
      </div>
    </div>
  `;
}

function renderNotebook() {
  const profile = activeProfile();
  const business = currentBusiness(profile) || { title: "Not chosen yet", type: "Not chosen", product: "Not chosen" };
  return `
    <main class="screen">
      <div class="screen-header">
        <div>
          <span class="kicker">Founder Notebook</span>
          <h1>${escapeHtml(profile.name)}'s Founder Notebook</h1>
          <p>A friendly record of business choices, coins, badges, and mission answers.</p>
        </div>
        <div class="button-row">
          <button class="secondary-button" data-action="map" data-testid="button-back-map-notebook">Map</button>
          <button class="secondary-button" data-action="growth" data-testid="button-growth-notebook">Big Map Path</button>
        </div>
      </div>
      <section class="notebook-page">
        <div class="notebook-grid">
          <div class="notebook-entry">
            <span class="kicker">Business Card</span>
            <div class="ledger-list">
              <div class="ledger-row"><span>Learner</span><strong>${escapeHtml(profile.name)}</strong></div>
              <div class="ledger-row"><span>Business</span><strong>${escapeHtml(business.title)}</strong></div>
              <div class="ledger-row"><span>Type</span><strong>${escapeHtml(business.type)}</strong></div>
              <div class="ledger-row"><span>Offer</span><strong>${escapeHtml(business.product)}</strong></div>
              <div class="ledger-row"><span>Coins</span><strong>${profile.coins}</strong></div>
            </div>
          </div>
          <div class="notebook-entry">
            <span class="kicker">Badges</span>
            <div class="ledger-list">
              ${profile.badges.length ? profile.badges.map((b) => `<span class="badge-chip">✓ ${escapeHtml(b)}</span>`).join("") : "<p>No badges yet.</p>"}
            </div>
          </div>
          <div class="notebook-entry">
            <span class="kicker">Completed Missions</span>
            <div class="ledger-list">
              ${profile.completedBuildings.map((id) => `<div class="ledger-row"><span>${escapeHtml(getBuilding(id).name)}</span><strong>Done</strong></div>`).join("") || "<p>Start at the Idea Bench.</p>"}
            </div>
          </div>
          <div class="notebook-entry">
            <span class="kicker">Town Upgrades</span>
            <div class="ledger-list">
              ${profile.townUpgrades.map((u) => `<span class="badge-chip">🏘️ ${escapeHtml(titleCase(u))}</span>`).join("") || "<p>No town upgrades yet.</p>"}
            </div>
          </div>
        </div>
        <h2 style="margin-top: var(--space-6)">Saved Mission Answers</h2>
        <div class="ledger-list">
          ${Object.keys(profile.notebook).length ? Object.entries(profile.notebook).map(([key, value]) => `<div class="notebook-entry"><strong>${escapeHtml(titleCase(key.replace(/Need$/, " Need")))}</strong><p>${escapeHtml(value)}</p></div>`).join("") : `<div class="empty-note">Mission answers will appear here as the learner writes.</div>`}
        </div>
        <h2 style="margin-top: var(--space-6)">Big Map Progress</h2>
        ${growthSteps(profile)}
      </section>
    </main>
  `;
}

function renderParentGuide() {
  return `
    <main class="screen">
      <div class="screen-header">
        <div>
          <span class="kicker">Parent Guide</span>
          <h1>Playful entrepreneurship for homeschool families.</h1>
        </div>
        <button class="secondary-button" data-action="${activeProfile() && currentBusiness() ? "map" : "welcome"}" data-testid="button-parent-back">Back</button>
      </div>
      <section class="parent-card">
        <p>
          SAVE Small Town Business teaches children the first ideas of entrepreneurship through play: finding a need, creating a product or service, buying supplies, setting prices, serving customers, tracking money in and money out, finding profit, saving, reinvesting, and understanding a simple civic version of taxes.
        </p>
        <div class="pull-note">
          The Town Share activity is not tax or legal advice. It is a child-friendly model showing that businesses keep records and contribute to shared community needs.
        </div>
        <h2>How to teach v1</h2>
        <div class="ledger-list">
          <div class="ledger-row"><span>Start</span><strong>Choose a learner and business.</strong></div>
          <div class="ledger-row"><span>Read</span><strong>Open each mission like a mini workbook.</strong></div>
          <div class="ledger-row"><span>Discuss</span><strong>Ask, “Who does this help?”</strong></div>
          <div class="ledger-row"><span>Record</span><strong>Use the Founder Notebook.</strong></div>
        </div>
        <h2>Licensing note</h2>
        <p>Version 1 uses original illustrated CSS/SVG-style visuals only. Future artifact cards should use verified commercial-safe sources only.</p>
      </section>
    </main>
  `;
}

function renderGrowthPath() {
  const profile = activeProfile();
  return `
    <main class="screen">
      <div class="screen-header">
        <div>
          <span class="kicker">Big Map Path</span>
          <h1>From one booth to a bigger map.</h1>
          <p>Version 1 focuses on Main Street. Each badge moves the learner toward a future national business path.</p>
        </div>
        <button class="secondary-button" data-action="${profile && currentBusiness() ? "map" : "welcome"}" data-testid="button-growth-back">Back</button>
      </div>
      <section class="panel">
        ${growthSteps(profile)}
      </section>
    </main>
  `;
}

function growthSteps(profile) {
  const completed = profile ? profile.completedBuildings.length : 0;
  return `
    <div class="path-list">
      ${GROWTH_PATH.map((step, i) => {
        const unlocked = i === 0 || completed >= BUILDINGS.length;
        return `
          <div class="path-step">
            <span class="path-number">${i + 1}</span>
            <span><strong>${step[0]}</strong><br />${step[1]}</span>
            <span class="locked-label">${unlocked ? "V1 Focus" : "Locked"}</span>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function wireEvents() {
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.onclick = handleAction;
  });
  document.querySelectorAll("[data-profile-id]").forEach((button) => {
    button.onclick = () => {
      appState.activeProfileId = button.dataset.profileId;
      saveRootState();
      view = appState.profiles[appState.activeProfileId].selectedBusiness ? "map" : "business";
      render();
    };
  });
  document.querySelectorAll("[data-shared-profile-id]").forEach((button) => {
    button.onclick = () => {
      window.ProfileAPI.setActive?.(button.dataset.sharedProfileId);
      view = activeProfile()?.selectedBusiness ? "map" : "business";
      render();
    };
  });
  document.querySelectorAll("[data-business]").forEach((button) => {
    button.onclick = () => {
      const profile = activeProfile();
      const business = PRESET_BUSINESSES.find((b) => b.id === button.dataset.business);
      profile.selectedBusiness = business.id;
      profile.businessName = business.title;
      profile.customBusiness = {};
      setProfile(profile);
      view = "map";
      toastMessage(`${business.title} is open for business.`);
      render();
    };
  });
  document.querySelectorAll("[data-mission]").forEach((button) => {
    button.onclick = () => {
      activeMissionId = button.dataset.mission;
      selectedChoice = "";
      renderMissionModal(activeMissionId);
    };
  });
  document.querySelectorAll("[data-form='profile']").forEach((form) => {
    form.onsubmit = (event) => {
      event.preventDefault();
      const name = cleanName(new FormData(form).get("name"));
      const existing = Object.values(appState.profiles).find((p) => p.name.toLowerCase() === name.toLowerCase());
      if (existing) {
        appState.activeProfileId = existing.id;
      } else {
        createProfile(name);
      }
      saveRootState();
      view = activeProfile().selectedBusiness ? "map" : "business";
      render();
    };
  });
  document.querySelectorAll("[data-form='custom']").forEach((form) => {
    form.onsubmit = (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const profile = activeProfile();
      const shopName = String(data.get("shopName") || "").trim();
      profile.selectedBusiness = "custom";
      profile.businessName = shopName;
      profile.customBusiness = {
        shopName,
        shopType: String(data.get("shopType") || "").trim(),
        product: String(data.get("product") || "").trim(),
        supplies: String(data.get("supplies") || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .slice(0, 3),
        icon: tempIcon,
        price: Math.max(1, Math.min(9, Number(data.get("price")) || 1)),
      };
      setProfile(profile);
      view = "map";
      toastMessage(`${shopName} is ready on Main Street.`);
      render();
    };
  });
  document.querySelectorAll("[data-icon]").forEach((button) => {
    button.onclick = () => {
      tempIcon = button.dataset.icon;
      document.querySelectorAll("[data-icon]").forEach((b) => b.classList.remove("selected"));
      button.classList.add("selected");
    };
  });
  document.querySelectorAll("[data-choice], [data-choice-label], [data-supply-cost], [data-town-upgrade], [data-bank-choice], [data-price-choice]").forEach((button) => {
    button.onclick = () => handleChoice(button);
  });
  document.querySelectorAll("[data-notebook-field]").forEach((field) => {
    field.oninput = () => {
      const profile = activeProfile();
      profile.notebook[field.dataset.notebookField] = field.value;
      setProfile(profile);
    };
  });
  document.querySelectorAll("[data-profile-field]").forEach((field) => {
    field.oninput = () => {
      const profile = activeProfile();
      profile[field.dataset.profileField] = field.value;
      setProfile(profile);
    };
  });
  document.onkeydown = (event) => {
    if (event.key === "Escape" && activeMissionId) closeMission();
  };
}

function handleAction(event) {
  const action = event.currentTarget.dataset.action;
  if (action === "profiles") view = "profiles";
  if (action === "open-shared-picker") {
    window.ProfileAPI?.openPicker?.({ allowClose: true });
    return;
  }
  if (action === "welcome") view = "welcome";
  if (action === "business") view = "business";
  if (action === "creator") view = "creator";
  if (action === "parent") view = "parent";
  if (action === "growth") {
    closeMission(false);
    view = "growth";
  }
  if (action === "notebook") {
    closeMission(false);
    view = "notebook";
  }
  if (action === "map") view = "map";
  if (action === "start") view = activeProfile()?.selectedBusiness ? "map" : "business";
  if (action === "close-mission") closeMission();
  if (action === "complete-mission") completeMission(event.currentTarget.dataset.missionComplete);
  render();
}

function closeMission(shouldRender = true) {
  activeMissionId = null;
  selectedChoice = "";
  document.querySelector("[data-modal='mission']")?.remove();
  if (shouldRender) render();
}

function handleChoice(button) {
  const profile = activeProfile();
  if (!profile) return;
  document.querySelectorAll(".choice-card").forEach((b) => b.classList.remove("selected"));
  button.classList.add("selected");
  selectedChoice = button.dataset.choice || button.textContent.trim();
  const label = button.dataset.choiceLabel || button.textContent.trim();

  if (button.dataset.supplyCost) {
    const cost = Number(button.dataset.supplyCost);
    if (profile.coins - cost < 0) {
      toastMessage("That costs too many coins right now.");
      button.classList.add("wrong");
      return;
    }
    profile.coins = Math.max(0, profile.coins - cost);
    coinBurst(-cost);
  }

  if (button.dataset.townUpgrade) {
    if (!profile.townUpgrades.includes(button.dataset.townUpgrade)) {
      profile.townUpgrades.push(button.dataset.townUpgrade);
    }
  }

  if (button.dataset.bankChoice === "upgrade") {
    if (profile.coins < 2) {
      toastMessage("Save a few more coins before buying an upgrade.");
      return;
    }
    profile.coins -= 2;
    coinBurst(-2);
  }

  const field = activeMissionId === "idea" ? "ideaNeed" : activeMissionId;
  profile.notebook[field] = label;
  setProfile(profile);
  const textarea = document.querySelector(`[data-notebook-field="${field}"]`);
  if (textarea) textarea.value = label;
  toastMessage("Notebook saved.");
}

function completeMission(id) {
  const profile = activeProfile();
  const mission = getBuilding(id);
  if (!profile || !mission) return;
  if (!profile.completedBuildings.includes(id)) {
    profile.completedBuildings.push(id);
  }
  if (!profile.badges.includes(mission.badge)) {
    profile.badges.push(mission.badge);
  }
  if (mission.reward !== 0) {
    profile.coins = Math.max(0, profile.coins + mission.reward);
    coinBurst(mission.reward);
  }
  const next = BUILDINGS[BUILDINGS.findIndex((b) => b.id === id) + 1];
  if (next && !profile.unlockedBuildings.includes(next.id)) {
    profile.unlockedBuildings.push(next.id);
    setTimeout(() => toastMessage(`${next.name} unlocked.`), 400);
  }
  setProfile(profile);
  confetti();
  toastMessage(`${mission.badge} stamped!`);
  closeMission(false);
  activeMissionId = null;
  view = "map";
}

function getBuilding(id) {
  return BUILDINGS.find((b) => b.id === id) || {};
}

function toastMessage(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2300);
}

function coinBurst(amount) {
  const burst = document.createElement("div");
  burst.className = "coin-burst";
  burst.textContent = `${amount >= 0 ? "+" : ""}${amount} coins`;
  document.body.appendChild(burst);
  setTimeout(() => burst.remove(), 900);
}

function confetti() {
  const wrap = document.createElement("div");
  wrap.className = "confetti";
  const colors = ["#D7A84A", "#B84A32", "#2F5D46", "#5E7FA3", "#6E557E"];
  for (let i = 0; i < 22; i++) {
    const bit = document.createElement("i");
    bit.style.left = Math.random() * 100 + "%";
    bit.style.background = colors[i % colors.length];
    bit.style.animationDelay = Math.random() * 220 + "ms";
    wrap.appendChild(bit);
  }
  document.body.appendChild(wrap);
  setTimeout(() => wrap.remove(), 1500);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function slug(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function titleCase(value) {
  return String(value)
    .split(/[\s-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

render();
