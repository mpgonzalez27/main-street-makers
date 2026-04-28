const STORAGE_KEY = "save_founder_town_v1";
const LEGACY_STORAGE_KEY = "msm_business_basics_atlas_v2";
const LOCAL_ROOT_KEY = "save.founderTown.localProfiles.v1";
const DEFAULT_PROFILE_NAME = "Founder";

const SOURCES = {
  "sba-plan": {
    label: "SBA Plan Your Business",
    url: "https://www.sba.gov/business-guide/plan-your-business",
    note: "Business planning, market research, startup costs, and growth guidance.",
  },
  "sba-business-plan": {
    label: "SBA Write Your Business Plan",
    url: "https://www.sba.gov/business-guide/plan-your-business/write-your-business-plan",
    note: "Business plans as roadmaps for structure, operations, and growth.",
  },
  "sba-market": {
    label: "SBA Market Research and Competitive Analysis",
    url: "https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis",
    note: "Demand, customers, market size, competition, and pricing.",
  },
  "sba-structure": {
    label: "SBA Choose a Business Structure",
    url: "https://www.sba.gov/business-guide/launch-your-business/choose-business-structure",
    note: "High-level business structure differences and why structure matters.",
  },
  "sba-register": {
    label: "SBA Register Your Business",
    url: "https://www.sba.gov/business-guide/launch-your-business/register-your-business",
    note: "Business registration concepts and state/local variation.",
  },
  "irs-ein": {
    label: "IRS Employer Identification Number",
    url: "https://www.irs.gov/businesses/employer-identification-number",
    note: "What an EIN is and why businesses may need one.",
  },
  "irs-records": {
    label: "IRS Business Recordkeeping",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep",
    note: "Records for income, expenses, supporting documents, and employment records.",
  },
  "irs-employees": {
    label: "IRS Businesses with Employees",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/businesses-with-employees",
    note: "Employment tax and payroll responsibilities at an awareness level.",
  },
};

const WORKBOOKS = [
  {
    id: "idea-bench",
    number: 1,
    place: "Idea Bench",
    workbookTitle: "What Is a Business?",
    subtitle: "A business begins with helping.",
    district: "Main Street Basics",
    status: "ready",
    icon: "💡",
    marker: { x: 20, y: 70 },
    color: "gold",
    sourceIds: ["sba-plan"],
    bigQuestion: "How does a business help people?",
    opening: "A business begins with help. A founder notices a need and offers a useful answer.",
    sections: [
      {
        label: "Read Together",
        title: "The first idea is service",
        body: [
          "A business is a way to serve people with a product or a service.",
          "A lemonade stand helps thirsty neighbors. A bookmark shop helps readers keep their place. A lawn helper helps a family care for a yard.",
          "Money matters, but it is not the first idea. The first idea is service. A good founder asks, “Who can I help?”",
        ],
      },
      {
        label: "Grown-up business word",
        title: "Business",
        body: ["A business is a way to help people with a product, a service, or both."],
      },
      {
        label: "Try It",
        title: "Find a need",
        body: ["Point to one person your business could help today. What do they need?"],
      },
    ],
    prompt: "My business could help people who need...",
    parentNote: "Start with service. This keeps business from feeling like only buying and selling.",
  },
  {
    id: "customer-corner",
    number: 2,
    place: "Customer Corner",
    workbookTitle: "Who Is the Customer?",
    subtitle: "Good founders notice who they can serve.",
    district: "Main Street Basics",
    status: "ready",
    icon: "👥",
    marker: { x: 39, y: 56 },
    color: "blue",
    sourceIds: ["sba-market"],
    bigQuestion: "Who might want or need this offer?",
    opening: "A customer is a person with a need your business can serve.",
    sections: [
      {
        label: "Read Together",
        title: "Customers are not just anybody",
        body: [
          "A customer is not just “anybody.” A customer is a person with a need your business can serve.",
          "A pet treat cart serves families with pets. A bookmark shop serves readers. A birthday card table serves people who want to cheer someone up.",
          "Good founders learn about customers before they make a big plan.",
        ],
      },
      {
        label: "Grown-up business word",
        title: "Market research",
        body: ["Market research means learning what customers need before you start."],
      },
      {
        label: "Try It",
        title: "Name three customers",
        body: ["Write or say three kinds of people who might want your offer."],
      },
    ],
    prompt: "Three customers who might like my business are...",
    parentNote: "Keep this concrete. Ask, “Who would actually use this?” instead of “Would people like this?”",
  },
  {
    id: "workshop",
    number: 3,
    place: "Workshop",
    workbookTitle: "Product or Service?",
    subtitle: "Some businesses sell things. Some do helpful jobs.",
    district: "Main Street Basics",
    status: "ready",
    icon: "🧰",
    marker: { x: 61, y: 64 },
    color: "green",
    sourceIds: ["sba-plan"],
    bigQuestion: "Is the business selling a thing, a helpful job, or both?",
    opening: "A product is a thing people buy. A service is a helpful job.",
    sections: [
      {
        label: "Read Together",
        title: "Things and helpful jobs",
        body: [
          "Some businesses sell products. A cookie cart sells cookies. A sticker booth sells stickers.",
          "Some businesses sell services. A lawn helper does a helpful job. A party helper sets up tables or carries supplies.",
          "Some businesses do both. A garden stand may sell flowers and also help plant them.",
        ],
      },
      {
        label: "Grown-up business word",
        title: "Offer",
        body: ["An offer is what the business gives a customer: a product, a service, or both."],
      },
      {
        label: "Try It",
        title: "Sort the offer",
        body: ["Choose product, service, or both for your business idea."],
      },
    ],
    prompt: "My offer is a product, service, or both because...",
    parentNote: "This chapter introduces the idea of a business model without using heavy vocabulary.",
  },
  {
    id: "supply-store",
    number: 4,
    place: "Supply Store",
    workbookTitle: "What Does It Cost to Start?",
    subtitle: "Supplies often come before sales.",
    district: "Planning Desk",
    status: "ready",
    icon: "📦",
    marker: { x: 75, y: 45 },
    color: "red",
    sourceIds: ["sba-business-plan"],
    bigQuestion: "What supplies or tools are needed first?",
    opening: "Many businesses need supplies before they can serve a customer.",
    sections: [
      {
        label: "Read Together",
        title: "Start small and count the cost",
        body: [
          "A lemonade stand may need lemons, cups, ice, and a sign. A sticker booth may need paper, markers, and sticker sheets.",
          "A careful founder starts small. The first plan does not need every fancy thing.",
          "Startup costs are the supplies or tools needed before a business can begin.",
        ],
      },
      {
        label: "Grown-up business word",
        title: "Startup cost",
        body: ["A startup cost is money spent before the business is ready to sell."],
      },
      {
        label: "Try It",
        title: "Pick three supplies",
        body: ["Choose the three most important supplies for a first test day."],
      },
    ],
    prompt: "My three starter supplies are...",
    parentNote: "Help the child separate needs from nice-to-haves. Keep the numbers simple.",
  },
  {
    id: "money-notebook",
    number: 5,
    place: "Money Notebook",
    workbookTitle: "Money In, Money Out, Profit",
    subtitle: "A founder keeps track of what changed.",
    district: "Money Office",
    status: "ready",
    icon: "🧮",
    marker: { x: 52, y: 31 },
    color: "purple",
    sourceIds: ["irs-records"],
    bigQuestion: "What is left after expenses?",
    opening: "Revenue is money that comes in. Expenses are money the business spends.",
    sections: [
      {
        label: "Read Together",
        title: "The simple profit sentence",
        body: [
          "Revenue is money that comes in. Expenses are money the business spends.",
          "Profit is what is left after expenses. If 6 coins come in and 3 coins go out, 3 coins are left.",
          "A founder needs to know all three words: revenue, expenses, and profit.",
        ],
      },
      {
        label: "Grown-up business word",
        title: "Profit",
        body: ["Profit is what is left after expenses are paid."],
      },
      {
        label: "Try It",
        title: "Coin math",
        body: ["Solve this: 8 coins in minus 5 coins out equals what?"],
      },
    ],
    prompt: "Revenue means... Expenses mean... Profit means...",
    parentNote: "This chapter builds vocabulary. It is not accounting advice.",
  },
  {
    id: "test-table",
    number: 6,
    place: "Test Table",
    workbookTitle: "How Do You Test an Idea?",
    subtitle: "Try a small version first.",
    district: "Planning Desk",
    status: "queue",
    icon: "🧪",
    marker: { x: 28, y: 38 },
    color: "blue",
    sourceIds: ["sba-market"],
  },
  {
    id: "price-post",
    number: 7,
    place: "Price Post",
    workbookTitle: "What Price Makes Sense?",
    subtitle: "A fair price helps the customer and the business.",
    district: "Planning Desk",
    status: "queue",
    icon: "🏷️",
    marker: { x: 67, y: 25 },
    color: "gold",
    sourceIds: ["sba-market"],
  },
  {
    id: "market-booth",
    number: 8,
    place: "Market Booth",
    workbookTitle: "Getting First Customers",
    subtitle: "Good sellers listen before they sell.",
    district: "Planning Desk",
    status: "queue",
    icon: "⛺",
    marker: { x: 84, y: 70 },
    color: "green",
    sourceIds: ["sba-market"],
  },
  {
    id: "ledger-office",
    number: 9,
    place: "Ledger Office",
    workbookTitle: "Records and Receipts",
    subtitle: "A record helps a founder remember what happened.",
    district: "Money Office",
    status: "queue",
    icon: "🧾",
    marker: { x: 34, y: 82 },
    color: "purple",
    sourceIds: ["irs-records"],
  },
  {
    id: "sign-shop",
    number: 10,
    place: "Sign Shop",
    workbookTitle: "Names, Signs, and Slogans",
    subtitle: "A clear name helps customers remember you.",
    district: "Main Street Basics",
    status: "queue",
    icon: "🪧",
    marker: { x: 48, y: 75 },
    color: "red",
    sourceIds: ["sba-plan"],
  },
  {
    id: "town-hall",
    number: 11,
    place: "Town Hall",
    workbookTitle: "Permits, Rules, and Town Share",
    subtitle: "Businesses learn the rules and help the community.",
    district: "Grown-Up Setup",
    status: "queue",
    icon: "🏛️",
    marker: { x: 16, y: 28 },
    color: "purple",
    sourceIds: ["sba-register"],
  },
  {
    id: "state-desk",
    number: 12,
    place: "State Filing Desk",
    workbookTitle: "LLC, Corporation, and State Filing",
    subtitle: "Some businesses use official state paperwork.",
    district: "Grown-Up Setup",
    status: "queue",
    icon: "📄",
    marker: { x: 52, y: 14 },
    color: "blue",
    sourceIds: ["sba-structure", "sba-register"],
  },
  {
    id: "federal-desk",
    number: 13,
    place: "Federal Desk",
    workbookTitle: "What Is an EIN?",
    subtitle: "A federal tax ID number for a business.",
    district: "Grown-Up Setup",
    status: "queue",
    icon: "🏤",
    marker: { x: 84, y: 18 },
    color: "green",
    sourceIds: ["irs-ein"],
  },
  {
    id: "payroll-counter",
    number: 14,
    place: "Payroll Counter",
    workbookTitle: "Employees and Payroll",
    subtitle: "Paying workers is a grown-up record system.",
    district: "Grown-Up Setup",
    status: "queue",
    icon: "🧑‍💼",
    marker: { x: 72, y: 85 },
    color: "red",
    sourceIds: ["irs-employees", "irs-records"],
  },
  {
    id: "delivery-road",
    number: 15,
    place: "Delivery Road",
    workbookTitle: "Growing Beyond Town",
    subtitle: "A business can grow step by step.",
    district: "Growth Map",
    status: "queue",
    icon: "🛻",
    marker: { x: 91, y: 54 },
    color: "gold",
    sourceIds: ["sba-business-plan"],
  },
];

const GROWTH_PATH = [
  ["First Stand", "Learn the first business words."],
  ["Small Shop", "Plan a simple shop with supplies and customers."],
  ["Whole Town", "Keep records and serve more people."],
  ["County Route", "Think about delivery and a second location."],
  ["State Map", "Learn grown-up setup words."],
  ["U.S. Business", "Study bigger business systems."],
  ["World Shipping", "Optional future stage."],
];

const DEFAULT_STATE = { profiles: {}, activeProfileId: "" };
let memoryStore = null;
let appState = loadRootState();
let view = "welcome";
let activePlaceId = "idea-bench";
let drawerOpen = false;

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

function hasSharedProfiles() {
  return !!(window.ProfileAPI && window.SaveStore && window.SaveStore.getItem && window.SaveStore.setItem);
}

function loadRootState() {
  if (hasSharedProfiles()) return normalizeRoot(DEFAULT_STATE);
  const storage = safeLocalStorage();
  if (storage) {
    const raw = storage.getItem(LOCAL_ROOT_KEY);
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
  appState = normalizeRoot(appState);
  if (hasSharedProfiles()) return;
  const storage = safeLocalStorage();
  if (storage) {
    storage.setItem(LOCAL_ROOT_KEY, JSON.stringify(appState));
    return;
  }
  memoryStore = appState;
}

function normalizeRoot(root) {
  const next = structuredCloneSafe(root || DEFAULT_STATE);
  next.profiles = next.profiles || {};
  next.activeProfileId = next.activeProfileId || "";
  Object.keys(next.profiles).forEach((id) => {
    next.profiles[id] = normalizeProfile(next.profiles[id], id);
  });
  if (next.activeProfileId && !next.profiles[next.activeProfileId]) next.activeProfileId = "";
  return next;
}

function normalizeProfile(profile, id) {
  const legacyCompleted = Array.isArray(profile?.completedBuildings) ? profile.completedBuildings : [];
  const legacyQueued = Array.isArray(profile?.queuedWorkbooks) ? profile.queuedWorkbooks : [];
  return {
    id,
    name: cleanName(profile?.name || DEFAULT_PROFILE_NAME),
    completedWorkbooks: Array.isArray(profile?.completedWorkbooks)
      ? profile.completedWorkbooks.filter(getWorkbook)
      : legacyCompleted.filter(getWorkbook),
    queuedWorkbooks: legacyQueued.filter(getWorkbook),
    notebook: profile?.notebook || {},
    founderBusiness: {
      name: profile?.founderBusiness?.name || profile?.businessName || "",
      offer: profile?.founderBusiness?.offer || profile?.customBusiness?.product || "",
      customer: profile?.founderBusiness?.customer || "",
      supplies: profile?.founderBusiness?.supplies || "",
    },
  };
}

function sharedProfileBase() {
  if (!hasSharedProfiles()) return null;
  const profile = window.ProfileAPI.getActive?.();
  if (!profile) return null;
  return {
    id: profile.id || "guest",
    name: profile.displayName || profile.name || DEFAULT_PROFILE_NAME,
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
  if (!Object.keys(progress).length) progress = migrateLegacyProgress(base) || {};
  return normalizeProfile({ ...progress, id: base.id, name: base.name }, base.id);
}

function saveSharedProgress(profile) {
  if (!hasSharedProfiles() || !profile) return;
  const progress = {
    completedWorkbooks: profile.completedWorkbooks || [],
    queuedWorkbooks: profile.queuedWorkbooks || [],
    notebook: profile.notebook || {},
    founderBusiness: profile.founderBusiness || {},
  };
  try {
    window.SaveStore.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {}
}

function migrateLegacyProgress(base) {
  const storage = safeLocalStorage();
  let picked = null;
  try {
    const raw = window.SaveStore?.getItem?.(LEGACY_STORAGE_KEY);
    if (raw) picked = JSON.parse(raw);
  } catch {}
  if (!picked && storage) {
    try {
      const raw = storage.getItem("save.mainStreetMakers.v1");
      const legacy = raw ? JSON.parse(raw) : null;
      const profiles = Object.values(legacy?.profiles || {});
      picked =
        profiles.find((p) => cleanName(p.name).toLowerCase() === cleanName(base.name).toLowerCase()) ||
        (legacy?.activeProfileId ? legacy.profiles?.[legacy.activeProfileId] : null);
    } catch {}
  }
  if (!picked) return null;
  const migrated = normalizeProfile({ ...picked, id: base.id, name: base.name }, base.id);
  saveSharedProgress(migrated);
  return migrated;
}

function structuredCloneSafe(obj) {
  try {
    return structuredClone(obj);
  } catch {
    return JSON.parse(JSON.stringify(obj));
  }
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

function brandMark() {
  return `
    <svg class="brand-mark founder-mark" viewBox="0 0 80 80" role="img" aria-label="SAVE Learning Co. Founder Town mark">
      <path d="M11 61h58" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
      <path d="M17 38h18v23H17zM45 26h18v35H45z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/>
      <path d="M14 38l12-11 12 11M42 26l12-12 12 12" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="39" cy="51" r="7" fill="#D7A84A" stroke="currentColor" stroke-width="4"/>
    </svg>
  `;
}

function topbar() {
  const profile = activeProfile();
  return `
    <header class="topbar founder-topbar">
      <button class="brand-lockup brand-button" data-action="town" data-testid="button-brand-town" aria-label="Back to Founder Town">
        ${brandMark()}
        <div>
          <div class="brand-kicker">SAVE Learning Co.</div>
          <div class="brand-name">Founder Town</div>
        </div>
      </button>
      <div class="top-actions">
        <button class="profile-pill" data-action="profiles" data-testid="button-profile">
          <span aria-hidden="true">👤</span>
          <span>${profile ? escapeHtml(profile.name) : "Choose learner"}</span>
        </button>
        <button class="icon-button" data-action="library" data-testid="button-library" aria-label="Open workbook library">☰</button>
      </div>
    </header>
  `;
}

function render() {
  const profile = activeProfile();
  if (!profile && !["welcome", "profiles"].includes(view)) view = hasSharedProfiles() ? "welcome" : "profiles";
  let html = topbar();
  if (view === "welcome") html += renderWelcome();
  if (view === "profiles") html += renderProfiles();
  if (view === "town") html += renderTown();
  if (view === "workbook") html += renderWorkbook(activePlaceId);
  if (view === "notebook") html += renderNotebook();
  if (view === "parent") html += renderParentGuide();
  if (view === "growth") html += renderGrowthPath();
  if (view === "sources") html += renderSources();
  app.innerHTML = html + footer() + renderLibraryDrawer();
  wireEvents();
}

function footer() {
  return `
    <footer class="footer-note">
      <strong>SAVE Learning Co.</strong> · © 2026 SAVE Learning Co. All rights reserved.
      <br />Founder Town uses original CSS/SVG-style visuals. No stock photos are used in this v1 app.
    </footer>
  `;
}

function renderWelcome() {
  const profile = activeProfile();
  const learnerLine = profile ? `Welcome back, ${escapeHtml(profile.name)}.` : "Choose a learner to begin.";
  return `
    <main class="founder-welcome">
      <section class="welcome-copy">
        <span class="kicker">SAVE Small Town Business</span>
        <h1>Founder Town</h1>
        <p>${learnerLine} Tap a place in town. Open a workbook. Build your Founder Notebook.</p>
        <div class="hero-actions">
          <button class="primary-button" data-action="start" data-testid="button-start">Enter Founder Town</button>
          <button class="secondary-button" data-action="parent" data-testid="button-parent-welcome">Parent Guide</button>
        </div>
        <div class="map-legend welcome-legend">
          <span><i class="dot ready"></i> Ready to read</span>
          <span><i class="dot queue"></i> Tap to queue</span>
        </div>
      </section>
      <section class="mini-town-preview" aria-label="Founder Town preview">
        ${townSvg(false)}
      </section>
    </main>
  `;
}

function renderProfiles() {
  if (hasSharedProfiles()) return renderWelcome();
  const profiles = Object.values(appState.profiles);
  return `
    <main class="screen">
      <section class="screen-header">
        <span class="kicker">Learner Profiles</span>
        <h1>Who is exploring today?</h1>
        <p>Each child gets a separate Founder Notebook and workbook queue.</p>
      </section>
      <section class="grid">
        ${profiles.map((profile) => `
          <button class="business-card" data-profile-id="${profile.id}" data-testid="button-profile-${profile.id}">
            <div class="business-icon">👤</div>
            <h3>${escapeHtml(profile.name)}</h3>
            <p>${completedCount(profile)} workbooks done · ${queuedCount(profile)} queued</p>
          </button>
        `).join("")}
        <form class="business-card profile-form" data-profile-form>
          <div class="business-icon">＋</div>
          <h3>Add a learner</h3>
          <label>Learner name <input name="profileName" required maxlength="24" placeholder="Founder name" data-testid="input-profile-name" /></label>
          <button class="primary-button" type="submit" data-testid="button-add-profile">Save Learner</button>
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
      <section class="screen-header">
        <span class="kicker">Shared SAVE Profiles</span>
        <h1>Who is exploring today?</h1>
        <p>Using the shared Atlas / Animal Kingdom learner profile system.</p>
      </section>
      <section class="grid">
        ${profiles.map((shared) => {
          const isActive = active?.id === shared.id;
          const base = { id: shared.id, name: shared.displayName || shared.name || DEFAULT_PROFILE_NAME };
          let progress = normalizeProfile({ name: base.name }, base.id);
          try {
            const raw = window.SaveStore.getItemFor?.(shared.id, STORAGE_KEY);
            if (raw) progress = normalizeProfile({ ...JSON.parse(raw), id: base.id, name: base.name }, base.id);
          } catch {}
          return `
            <button class="business-card ${isActive ? "selected" : ""}" data-shared-profile-id="${shared.id}" data-testid="button-shared-profile-${shared.id}">
              <div class="business-icon">${shared.avatar ? `<img src="${shared.avatar}" alt="" />` : "👤"}</div>
              <h3>${escapeHtml(base.name)}</h3>
              <p>${completedCount(progress)} done · ${queuedCount(progress)} queued</p>
            </button>
          `;
        }).join("")}
      </section>
    </main>
  `;
}

function renderTown() {
  const profile = activeProfile();
  const place = getWorkbook(activePlaceId) || WORKBOOKS[0];
  return `
    <main class="town-shell">
      <section class="town-stage" aria-label="Clickable Founder Town map">
        <div class="town-title-card">
          <span class="kicker">Clickable business town</span>
          <h1>Tap a place to open a workbook.</h1>
          <p>Ready places open now. Other places can be queued for future workbooks.</p>
        </div>
        ${townSvg(true, profile)}
        <div class="town-controls">
          <button class="secondary-button" data-action="notebook" data-testid="button-notebook-town">Founder Notebook</button>
          <button class="secondary-button" data-action="growth" data-testid="button-growth-town">Growth Map</button>
          <button class="secondary-button" data-action="library" data-testid="button-library-town">Library</button>
        </div>
      </section>
      ${renderPlaceSheet(place, profile)}
    </main>
  `;
}

function townSvg(interactive = true, profile = activeProfile()) {
  const places = WORKBOOKS.map((place) => {
    const status = workbookStatus(place, profile);
    const attrs = interactive
      ? `role="button" tabindex="0" data-place="${place.id}" data-testid="button-place-${place.id}" aria-label="${escapeHtml(place.place)}"`
      : "";
    return `
      <g class="town-pin pin-${place.color} ${status}" transform="translate(${place.marker.x} ${place.marker.y})" ${attrs}>
        <circle class="pin-glow" r="5.8"></circle>
        <circle class="pin-core" r="3.15"></circle>
        <text x="0" y="-7.2" text-anchor="middle">${place.icon}</text>
        <text class="pin-label" x="0" y="8.6" text-anchor="middle">${escapeSvg(place.place)}</text>
      </g>
    `;
  }).join("");

  return `
    <svg class="founder-town-map" viewBox="0 0 100 100" role="img" aria-label="Founder Town clickable business map">
      <defs>
        <linearGradient id="townSky" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#F7F0DF"/>
          <stop offset="1" stop-color="#E6D6B8"/>
        </linearGradient>
        <filter id="paperShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.4" stdDeviation="1.2" flood-color="#241A12" flood-opacity=".18"/>
        </filter>
      </defs>
      <rect x="2" y="2" width="96" height="96" rx="8" fill="url(#townSky)" stroke="#241A12" stroke-opacity=".18"/>
      <path d="M7 78 C18 70 25 68 34 59 C45 48 54 51 63 39 C72 27 83 30 94 20" fill="none" stroke="#C8A978" stroke-width="9" stroke-linecap="round"/>
      <path d="M7 78 C18 70 25 68 34 59 C45 48 54 51 63 39 C72 27 83 30 94 20" fill="none" stroke="#F7F0DF" stroke-width="4" stroke-linecap="round" stroke-dasharray="3 4"/>
      <path d="M8 24 C18 19 30 19 42 24 C53 29 62 25 73 19 C84 13 93 15 97 20" fill="none" stroke="#5E7FA3" stroke-width="5" stroke-linecap="round" opacity=".35"/>
      <g filter="url(#paperShadow)" opacity=".96">
        <path d="M12 66h16v10H12zM14 59h12v7H14z" fill="#FFF8E8" stroke="#241A12" stroke-opacity=".18"/>
        <path d="M34 49h15v12H34zM37 43h9v6H37z" fill="#F0DFC0" stroke="#241A12" stroke-opacity=".18"/>
        <path d="M56 58h15v13H56zM59 50h9v8H59z" fill="#FFF8E8" stroke="#241A12" stroke-opacity=".18"/>
        <path d="M69 35h17v12H69zM72 28h11v7H72z" fill="#F3D8C8" stroke="#241A12" stroke-opacity=".18"/>
        <path d="M45 22h16v12H45zM49 15h8v7H49z" fill="#E7D7EC" stroke="#241A12" stroke-opacity=".18"/>
        <path d="M10 21h15v12H10zM13 15h9v6H13z" fill="#DEE7D9" stroke="#241A12" stroke-opacity=".18"/>
        <path d="M78 76h16v11H78zM82 68h8v8H82z" fill="#FFF8E8" stroke="#241A12" stroke-opacity=".18"/>
      </g>
      <g class="town-trees" opacity=".75">
        <circle cx="19" cy="47" r="2.5" fill="#2F5D46"/><circle cx="22" cy="44" r="2" fill="#2F5D46"/>
        <circle cx="88" cy="38" r="2.4" fill="#2F5D46"/><circle cx="91" cy="42" r="1.9" fill="#2F5D46"/>
        <circle cx="42" cy="84" r="2.2" fill="#2F5D46"/><circle cx="46" cy="82" r="1.8" fill="#2F5D46"/>
      </g>
      ${places}
    </svg>
  `;
}

function renderPlaceSheet(place, profile) {
  const status = workbookStatus(place, profile);
  const ready = place.status === "ready";
  const queued = profile?.queuedWorkbooks?.includes(place.id);
  const done = profile?.completedWorkbooks?.includes(place.id);
  return `
    <aside class="place-sheet" data-testid="place-sheet">
      <div class="sheet-handle"></div>
      <div class="place-sheet-head">
        <div class="place-icon ${status}">${place.icon}</div>
        <div>
          <span class="kicker">Vol. ${place.number} · ${escapeHtml(place.district)}</span>
          <h2>${escapeHtml(place.place)}</h2>
          <p>${escapeHtml(place.subtitle || "This workbook is waiting on the future shelf.")}</p>
        </div>
      </div>
      <div class="sheet-status-row">
        <span class="badge-chip ${status}">${done ? "Completed" : ready ? "Ready to read" : queued ? "Queued" : "Tap to queue"}</span>
        <span class="badge-chip">${escapeHtml(place.workbookTitle)}</span>
      </div>
      <div class="sheet-actions">
        ${ready ? `<button class="primary-button" data-action="open-workbook" data-workbook="${place.id}" data-testid="button-open-workbook">Open workbook →</button>` : ""}
        ${!ready ? `<button class="primary-button" data-action="queue-workbook" data-workbook="${place.id}" data-testid="button-queue-workbook">${queued ? "Remove from queue" : "Queue this workbook"}</button>` : ""}
        <button class="secondary-button" data-action="library" data-testid="button-sheet-library">Workbook Library</button>
      </div>
      ${!ready ? `<p class="small-note">This place is visible on the map so your child can ask for it, just like tapping an Atlas country without a workbook yet.</p>` : ""}
    </aside>
  `;
}

function renderWorkbook(id) {
  const profile = activeProfile();
  const workbook = getWorkbook(id) || WORKBOOKS[0];
  if (workbook.status !== "ready") {
    view = "town";
    return renderTown();
  }
  const note = profile?.notebook?.[workbook.id] || "";
  const done = profile?.completedWorkbooks?.includes(workbook.id);
  return `
    <main class="reader-shell" data-testid="workbook-reader">
      <section class="workbook-cover">
        <div class="cover-art">
          ${townSvg(false, profile)}
        </div>
        <div class="cover-copy">
          <button class="mark-done ${done ? "checked" : ""}" data-action="mark-done" data-workbook="${workbook.id}" data-testid="button-mark-done">${done ? "✓ Done" : "□ Mark done"}</button>
          <span class="kicker">Vol. ${workbook.number} · ${escapeHtml(workbook.district)}</span>
          <h1>${escapeHtml(workbook.workbookTitle)}</h1>
          <p>${escapeHtml(workbook.subtitle)}</p>
          <button class="secondary-button" data-action="town" data-testid="button-back-town-reader">Back to town</button>
        </div>
      </section>
      <section class="reader-page about-book">
        <span class="kicker">About this workbook</span>
        <h2>${escapeHtml(workbook.place)}: ${escapeHtml(workbook.workbookTitle)}</h2>
        <p>Part of the SAVE Small Town Business series published by SAVE Learning Co. Designed for curious readers around Grade 3 with a parent nearby.</p>
        <p><strong>© 2026 SAVE Learning Co. All rights reserved.</strong></p>
        <p>This workbook is for learning only. It is not legal, tax, payroll, or accounting advice.</p>
      </section>
      <section class="reader-page feature-page">
        <span class="kicker">Big Question</span>
        <h2>${escapeHtml(workbook.bigQuestion)}</h2>
        <p class="lede">${escapeHtml(workbook.opening)}</p>
      </section>
      ${workbook.sections.map((section, index) => `
        <section class="reader-page workbook-section">
          <span class="kicker">${escapeHtml(section.label)}</span>
          <h2>${escapeHtml(section.title)}</h2>
          ${section.body.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
          ${index === 1 ? `<div class="pull-note">Business words are tools. We use them gently, one at a time.</div>` : ""}
        </section>
      `).join("")}
      <section class="reader-page notebook-prompt">
        <span class="kicker">Founder Notebook</span>
        <h2>${escapeHtml(workbook.prompt)}</h2>
        <textarea data-notebook-field="${workbook.id}" data-testid="textarea-workbook-note" placeholder="Write or dictate one short answer...">${escapeHtml(note)}</textarea>
        <div class="reader-actions">
          <button class="primary-button" data-action="save-workbook" data-workbook="${workbook.id}" data-testid="button-save-workbook">Save to Notebook</button>
          <button class="secondary-button" data-action="notebook" data-testid="button-open-notebook-reader">Open Notebook</button>
        </div>
      </section>
      <section class="reader-page parent-mini-guide">
        <span class="kicker">Parent Note</span>
        <p>${escapeHtml(workbook.parentNote)}</p>
      </section>
    </main>
  `;
}

function renderLibraryDrawer() {
  const profile = activeProfile();
  const open = drawerOpen ? "open" : "";
  return `
    <aside class="library-drawer ${open}" data-testid="library-drawer" aria-hidden="${drawerOpen ? "false" : "true"}">
      <div class="drawer-head">
        <span class="kicker">My Library</span>
        <button class="icon-button" data-action="close-library" data-testid="button-close-library" aria-label="Close library">✕</button>
      </div>
      <h2>SAVE Business Workbooks</h2>
      <div class="library-list">
        ${WORKBOOKS.map((book) => {
          const status = workbookStatus(book, profile);
          return `
            <button class="library-row ${status}" data-place="${book.id}" data-testid="button-library-${book.id}">
              <span>${book.number}</span>
              <strong>${escapeHtml(book.workbookTitle)}</strong>
              <em>${book.status === "ready" ? "Ready" : profile?.queuedWorkbooks?.includes(book.id) ? "Queued" : "Queue"}</em>
            </button>
          `;
        }).join("")}
      </div>
    </aside>
    <button class="drawer-scrim ${open}" data-action="close-library" aria-label="Close library overlay"></button>
  `;
}

function renderNotebook() {
  const profile = activeProfile();
  const entries = WORKBOOKS.filter((book) => String(profile?.notebook?.[book.id] || "").trim());
  return `
    <main class="screen notebook-screen">
      <section class="screen-header">
        <span class="kicker">Founder Notebook</span>
        <h1>${escapeHtml(profile.name)}'s Founder Notebook</h1>
        <p>Your workbook notes, queued topics, and own business idea live here.</p>
      </section>
      <section class="notebook-grid">
        <form class="notebook-page founder-form" data-founder-form>
          <span class="kicker">My Business Idea</span>
          <label>Business name <input name="businessName" maxlength="40" value="${escapeHtml(profile.founderBusiness.name)}" placeholder="Bookmark Shop" data-testid="input-business-name" /></label>
          <label>Product or service <input name="businessOffer" maxlength="60" value="${escapeHtml(profile.founderBusiness.offer)}" placeholder="Handmade bookmarks" data-testid="input-business-offer" /></label>
          <label>Customer <input name="businessCustomer" maxlength="60" value="${escapeHtml(profile.founderBusiness.customer)}" placeholder="Readers at co-op" data-testid="input-business-customer" /></label>
          <label>Starter supplies <input name="businessSupplies" maxlength="80" value="${escapeHtml(profile.founderBusiness.supplies)}" placeholder="Paper, markers, ribbon" data-testid="input-business-supplies" /></label>
          <button class="primary-button" type="submit" data-testid="button-save-business-idea">Save Business Idea</button>
        </form>
        <div class="notebook-page">
          <span class="kicker">Town Progress</span>
          <div class="ledger-list">
            <div class="ledger-row"><span>Workbooks complete</span><strong>${completedCount(profile)} of ${readyWorkbooks().length}</strong></div>
            <div class="ledger-row"><span>Future workbooks queued</span><strong>${queuedCount(profile)}</strong></div>
            <div class="ledger-row"><span>Notebook answers</span><strong>${notebookCount(profile)}</strong></div>
          </div>
        </div>
      </section>
      <section class="notebook-page">
        <h2>Saved Workbook Answers</h2>
        <div class="ledger-list">
          ${entries.length ? entries.map((book) => `<div class="notebook-entry"><strong>${book.number}. ${escapeHtml(book.workbookTitle)}</strong><p>${escapeHtml(profile.notebook[book.id])}</p></div>`).join("") : `<div class="empty-note">Notebook answers will appear here after a workbook is saved.</div>`}
        </div>
      </section>
    </main>
  `;
}

function renderParentGuide() {
  return `
    <main class="screen">
      <section class="screen-header">
        <span class="kicker">Parent Guide</span>
        <h1>How Founder Town works</h1>
        <p>Founder Town uses the Expedition Atlas pattern: farthest view first, tap a place, open a workbook, or queue a future workbook.</p>
      </section>
      <section class="parent-card">
        <h2>What this teaches</h2>
        <p>SAVE Small Town Business teaches children the first ideas of entrepreneurship through play: finding a need, creating a product or service, buying supplies, setting prices, serving customers, tracking money in and money out, finding profit, saving, reinvesting, and understanding a simple civic version of taxes.</p>
        <div class="pull-note">The Town Share activity is not tax or legal advice. It is a child-friendly model showing that businesses keep records and contribute to shared community needs.</div>
        <div class="pull-note">This workbook is for learning only. It is not legal, tax, payroll, or accounting advice. A real business owner should ask a qualified professional and check federal, state, and local rules.</div>
      </section>
      <section class="grid">
        ${groupByDistrict().map(([district, books]) => `
          <div class="parent-card">
            <span class="kicker">${escapeHtml(district)}</span>
            <div class="ledger-list">${books.map((book) => `<div class="ledger-row"><span>${book.number}. ${escapeHtml(book.workbookTitle)}</span><strong>${book.status === "ready" ? "ready" : "queue"}</strong></div>`).join("")}</div>
          </div>
        `).join("")}
      </section>
      <section class="parent-card">
        <h2>Real-world source base</h2>
        <p>The chapter notes are grounded in SBA and IRS public guidance for business planning, market research, structures, EINs, employees, payroll awareness, and records.</p>
        <button class="secondary-button" data-action="sources" data-testid="button-sources-parent">Open Sources</button>
      </section>
    </main>
  `;
}

function renderGrowthPath() {
  return `
    <main class="screen">
      <section class="screen-header">
        <span class="kicker">Big Map Path</span>
        <h1>Founder Town can grow beyond Main Street.</h1>
        <p>V1 focuses on the first town. Future volumes can grow toward bigger business systems.</p>
      </section>
      <section class="parent-card">
        <div class="path-list">
          ${GROWTH_PATH.map(([title, body], index) => `
            <div class="path-step ${index ? "locked-path" : ""}">
              <span class="path-number">${index + 1}</span>
              <div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></div>
            </div>
          `).join("")}
        </div>
      </section>
    </main>
  `;
}

function renderSources() {
  return `
    <main class="screen">
      <section class="screen-header">
        <span class="kicker">Sources & Licensing</span>
        <h1>Founder Town source notes</h1>
        <p>V1 uses original illustrated CSS/SVG visuals. No stock photos are used.</p>
      </section>
      <section class="parent-card">
        <h2>Official sources</h2>
        <div class="ledger-list">
          ${Object.values(SOURCES).map((source) => `
            <div class="source-entry">
              <strong>${escapeHtml(source.label)}</strong>
              <p>${escapeHtml(source.note)}</p>
              <a href="${source.url}" target="_blank" rel="noreferrer">${source.url}</a>
            </div>
          `).join("")}
        </div>
      </section>
      <section class="parent-card">
        <h2>Image policy</h2>
        <p>Future versions may use real business artifacts only from verified commercial-safe sources such as Library of Congress Free to Use and Reuse, Smithsonian Open Access / CC0, National Archives public-domain records, U.S. federal public-domain sources, or clearly licensed Wikimedia Commons files.</p>
      </section>
    </main>
  `;
}

function wireEvents() {
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      if (action === "start") {
        if (activeProfile()) {
          view = "town";
        } else if (hasSharedProfiles()) {
          view = "welcome";
          window.ProfileAPI.openPicker?.({ allowClose: false });
        } else {
          view = "profiles";
        }
      }
      if (action === "profiles") {
        if (hasSharedProfiles()) {
          window.ProfileAPI.openPicker?.({ allowClose: true });
          return;
        }
        view = "profiles";
      }
      if (action === "town") view = activeProfile() ? "town" : "welcome";
      if (action === "notebook") view = "notebook";
      if (action === "parent") view = "parent";
      if (action === "growth") view = "growth";
      if (action === "sources") view = "sources";
      if (action === "library") drawerOpen = true;
      if (action === "close-library") drawerOpen = false;
      if (action === "open-workbook") {
        activePlaceId = button.dataset.workbook;
        view = "workbook";
      }
      if (action === "queue-workbook") toggleQueue(button.dataset.workbook);
      if (action === "mark-done") markWorkbookDone(button.dataset.workbook, true);
      if (action === "save-workbook") saveWorkbook(button.dataset.workbook);
      if (!["queue-workbook", "mark-done", "save-workbook"].includes(action)) render();
    });
  });

  document.querySelector("[data-profile-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    createProfile(form.get("profileName"));
    view = "town";
    render();
  });

  document.querySelector("[data-founder-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const profile = activeProfile();
    const form = new FormData(event.currentTarget);
    profile.founderBusiness = {
      name: cleanName(form.get("businessName")),
      offer: cleanName(form.get("businessOffer")),
      customer: cleanName(form.get("businessCustomer")),
      supplies: cleanName(form.get("businessSupplies")),
    };
    setProfile(profile);
    showToast("Business idea saved.");
    render();
  });

  document.querySelectorAll("[data-profile-id]").forEach((button) => {
    button.addEventListener("click", () => {
      appState.activeProfileId = button.dataset.profileId;
      saveRootState();
      view = "town";
      render();
    });
  });

  document.querySelectorAll("[data-shared-profile-id]").forEach((button) => {
    button.addEventListener("click", () => {
      window.ProfileAPI.setActive?.(button.dataset.sharedProfileId);
      view = "town";
      render();
    });
  });

  document.querySelectorAll("[data-place]").forEach((button) => {
    const selectPlace = () => {
      activePlaceId = button.dataset.place;
      drawerOpen = false;
      view = "town";
      render();
    };
    button.addEventListener("click", selectPlace);
    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectPlace();
      }
    });
  });

  document.querySelector("[data-notebook-field]")?.addEventListener("input", () => {});
}

function toggleQueue(id) {
  const profile = activeProfile();
  const book = getWorkbook(id);
  if (!profile || !book || book.status === "ready") return;
  const next = new Set(profile.queuedWorkbooks);
  if (next.has(id)) {
    next.delete(id);
    showToast(`${book.workbookTitle} removed from the queue.`);
  } else {
    next.add(id);
    showToast(`${book.workbookTitle} added to the workbook queue.`);
  }
  profile.queuedWorkbooks = [...next];
  setProfile(profile);
  render();
}

function markWorkbookDone(id, rerender = true) {
  const profile = activeProfile();
  const book = getWorkbook(id);
  if (!profile || !book || book.status !== "ready") return;
  if (!profile.completedWorkbooks.includes(id)) profile.completedWorkbooks.push(id);
  setProfile(profile);
  showToast(`${book.workbookTitle} marked done.`);
  if (rerender) render();
}

function saveWorkbook(id) {
  const profile = activeProfile();
  const book = getWorkbook(id);
  if (!profile || !book) return;
  const textarea = document.querySelector(`[data-notebook-field="${CSS.escape(id)}"]`);
  const value = textarea ? textarea.value.trim() : "";
  if (value) profile.notebook[id] = value;
  if (!profile.completedWorkbooks.includes(id)) profile.completedWorkbooks.push(id);
  setProfile(profile);
  showToast(`${book.workbookTitle} saved to the Founder Notebook.`);
  render();
}

function workbookStatus(book, profile) {
  if (profile?.completedWorkbooks?.includes(book.id)) return "done";
  if (book.status === "ready") return "ready";
  if (profile?.queuedWorkbooks?.includes(book.id)) return "queued";
  return "queue";
}

function readyWorkbooks() {
  return WORKBOOKS.filter((book) => book.status === "ready");
}

function groupByDistrict() {
  return [...new Set(WORKBOOKS.map((book) => book.district))].map((district) => [
    district,
    WORKBOOKS.filter((book) => book.district === district),
  ]);
}

function getWorkbook(id) {
  return WORKBOOKS.find((book) => book.id === id);
}

function completedCount(profile) {
  return (profile?.completedWorkbooks || []).filter(getWorkbook).length;
}

function queuedCount(profile) {
  return (profile?.queuedWorkbooks || []).filter(getWorkbook).length;
}

function notebookCount(profile) {
  return Object.values(profile?.notebook || {}).filter((value) => String(value || "").trim()).length;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeSvg(value) {
  return escapeHtml(value).replace(/'/g, "&apos;");
}

window.addEventListener("load", () => {
  if (hasSharedProfiles()) {
    window.ProfileAPI.onChange?.(() => {
      view = "town";
      drawerOpen = false;
      render();
    });
    if (!window.ProfileAPI.getActive?.()) {
      view = "welcome";
      window.ProfileAPI.openPicker?.({ allowClose: false });
    }
  } else if (!activeProfile()) {
    view = "welcome";
  }
  render();
});
