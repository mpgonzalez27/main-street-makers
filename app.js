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
  ["Founder School", "Learn the first business words."],
  ["Main Street", "Try tiny shops, stands, booths, and carts."],
  ["Whole Town", "Serve customers in products, services, farms, and workshops."],
  ["County Route", "Think about nearby delivery and a second location."],
  ["State Map", "Learn bigger setup words and state rules."],
  ["U.S. Business", "Study regional and national business systems."],
  ["World Shipping", "Optional future stage."],
];

const AREAS = [
  {
    id: "schoolhouse",
    title: "Founder Schoolhouse",
    shortTitle: "Schoolhouse",
    icon: "🏫",
    kicker: "Start here",
    color: "gold",
    description:
      "Learn the words grown-ups use: business, customer, product, service, records, EIN, LLC, corporation, payroll, and more.",
    prompt: "Start with the Schoolhouse, then explore the real-world business areas.",
    marker: { x: 49, y: 68 },
    bookIds: [
      "idea-bench",
      "customer-corner",
      "workshop",
      "money-notebook",
      "ledger-office",
      "town-hall",
      "state-desk",
      "federal-desk",
      "payroll-counter",
    ],
  },
  {
    id: "main-street",
    title: "Main Street Shops",
    shortTitle: "Main Street",
    icon: "🏪",
    kicker: "First tiny businesses",
    color: "red",
    description:
      "Visit simple child-sized businesses like a lemonade stand, bookmark shop, art booth, garden stand, or pet treat cart.",
    prompt: "Use this area when your learner wants examples of real small starter businesses.",
    marker: { x: 52, y: 42 },
    bookIds: ["sign-shop", "market-booth", "price-post", "supply-store", "test-table"],
  },
  {
    id: "products",
    title: "Products Market",
    shortTitle: "Products",
    icon: "🧺",
    kicker: "Things people buy",
    color: "blue",
    description:
      "Explore businesses that make or sell things: cookies, cards, bracelets, bookmarks, garden baskets, and more.",
    prompt: "Future workbooks can zoom into each product idea like an Atlas country.",
    marker: { x: 27, y: 54 },
    bookIds: ["supply-store", "test-table", "price-post", "market-booth"],
  },
  {
    id: "services",
    title: "Service Street",
    shortTitle: "Services",
    icon: "🧹",
    kicker: "Helpful jobs",
    color: "green",
    description:
      "Explore helpful-job businesses: lawn helper, party helper, reading buddy, pet helper, cleanup helper, and more.",
    prompt: "This area helps kids see that not every business sells a thing.",
    marker: { x: 73, y: 55 },
    bookIds: ["workshop", "customer-corner", "market-booth", "price-post"],
  },
  {
    id: "farm-fields",
    title: "Farm & Food Fields",
    shortTitle: "Farm Fields",
    icon: "🌻",
    kicker: "Food, gardens, and local goods",
    color: "gold",
    description:
      "Explore garden stands, flower tables, egg stands, jam booths, and other wholesome farm-and-food ideas.",
    prompt: "Future workbooks can teach safe, simple local-product examples.",
    marker: { x: 22, y: 78 },
    bookIds: ["idea-bench", "supply-store", "ledger-office", "town-hall"],
  },
  {
    id: "maker-works",
    title: "Maker Works",
    shortTitle: "Maker Works",
    icon: "🏭",
    kicker: "Build, batch, and improve",
    color: "purple",
    description:
      "Explore workshops, batches, quality checks, tools, supplies, and careful making.",
    prompt: "This area is for maker-style businesses that build something step by step.",
    marker: { x: 76, y: 29 },
    bookIds: ["workshop", "supply-store", "money-notebook", "delivery-road"],
  },
  {
    id: "growth-road",
    title: "Growth Road",
    shortTitle: "Growth Road",
    icon: "🛻",
    kicker: "Beyond the first idea",
    color: "blue",
    description:
      "Follow the path from one small offer to a town, county, state, U.S., and world business map.",
    prompt: "This is the long-term path after the first Schoolhouse and Main Street lessons.",
    marker: { x: 49, y: 18 },
    bookIds: ["delivery-road", "state-desk", "federal-desk", "payroll-counter"],
  },
];

const DEFAULT_STATE = { profiles: {}, activeProfileId: "" };
let memoryStore = null;
let appState = loadRootState();
let view = "welcome";
let activePlaceId = "idea-bench";
let activeAreaId = "schoolhouse";
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
    <svg class="brand-mark founder-mark" viewBox="0 0 80 80" role="img" aria-label="SAVE Learning Co. Founder World mark">
      <path d="M15 57 C25 48 35 49 40 58 C46 69 61 67 67 55" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
      <path d="M19 40h19v20H19zM46 29h17v31H46z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/>
      <path d="M17 40l12-10 12 10M43 29l11.5-10L66 29" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="40" cy="24" r="8" fill="#D7A84A" stroke="currentColor" stroke-width="4"/>
    </svg>
  `;
}

function topbar() {
  const profile = activeProfile();
  return `
    <header class="topbar founder-topbar">
      <button class="brand-lockup brand-button" data-action="world" data-testid="button-brand-world" aria-label="Back to Founder World">
        ${brandMark()}
        <div>
          <div class="brand-kicker">SAVE Learning Co.</div>
          <div class="brand-name">Founder World</div>
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
  if (view === "world") html += renderWorld();
  if (view === "area") html += renderArea();
  if (view === "town") html += renderWorld();
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
      <br />Founder World uses original CSS/SVG-style visuals. No stock photos are used in this v1 app.
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
        <h1>Founder World</h1>
        <p>${learnerLine} Start at the Schoolhouse. Then tap a business area, open a workbook, or queue a future one.</p>
        <div class="hero-actions">
          <button class="primary-button" data-action="start" data-testid="button-start">Enter Founder World</button>
          <button class="secondary-button" data-action="parent" data-testid="button-parent-welcome">Parent Guide</button>
        </div>
        <div class="map-legend welcome-legend">
          <span><i class="dot ready"></i> Ready to read</span>
          <span><i class="dot queue"></i> Tap to queue</span>
        </div>
      </section>
      <section class="mini-town-preview" aria-label="Founder World preview">
        ${worldSvg(false)}
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

function renderWorld() {
  const profile = activeProfile();
  const area = getArea(activeAreaId) || AREAS[0];
  return `
    <main class="town-shell world-shell">
      <section class="town-stage world-stage" aria-label="Clickable Founder World map">
        <div class="town-title-card">
          <span class="kicker">Farthest view first</span>
          <h1>Choose a business world.</h1>
          <p>Start at the Schoolhouse. Then zoom into products, services, farms, makers, and growth paths.</p>
        </div>
        ${worldSvg(true, profile)}
        <div class="town-controls">
          <button class="secondary-button" data-action="notebook" data-testid="button-notebook-world">Founder Notebook</button>
          <button class="secondary-button" data-action="growth" data-testid="button-growth-world">Growth Map</button>
          <button class="secondary-button" data-action="library" data-testid="button-library-world">Library</button>
        </div>
      </section>
      ${renderAreaSheet(area, profile)}
    </main>
  `;
}

function renderArea() {
  const profile = activeProfile();
  const area = getArea(activeAreaId) || AREAS[0];
  const books = areaWorkbooks(area.id);
  const place = getWorkbook(activePlaceId) && area.bookIds.includes(activePlaceId)
    ? getWorkbook(activePlaceId)
    : books[0] || WORKBOOKS[0];
  activePlaceId = place.id;
  return `
    <main class="town-shell area-shell">
      <section class="town-stage area-stage" aria-label="${escapeHtml(area.title)} workbook map">
        <div class="town-title-card area-title-card">
          <span class="kicker">${escapeHtml(area.kicker)}</span>
          <h1>${escapeHtml(area.title)}</h1>
          <p>${escapeHtml(area.description)}</p>
        </div>
        ${areaMapSvg(area, true, profile)}
        <div class="town-controls">
          <button class="secondary-button" data-action="world" data-testid="button-back-world">World Map</button>
          <button class="secondary-button" data-action="notebook" data-testid="button-notebook-area">Founder Notebook</button>
          <button class="secondary-button" data-action="library" data-testid="button-library-area">Library</button>
        </div>
      </section>
      ${renderPlaceSheet(place, profile)}
    </main>
  `;
}

function renderAreaSheet(area, profile) {
  const books = areaWorkbooks(area.id);
  const ready = books.filter((book) => book.status === "ready").length;
  const queued = books.filter((book) => profile?.queuedWorkbooks?.includes(book.id)).length;
  const first = books[0] || WORKBOOKS[0];
  return `
    <aside class="place-sheet area-sheet" data-testid="area-sheet">
      <div class="sheet-handle"></div>
      <div class="place-sheet-head">
        <div class="place-icon area-icon ${area.color}">${area.icon}</div>
        <div>
          <span class="kicker">${escapeHtml(area.kicker)}</span>
          <h2>${escapeHtml(area.title)}</h2>
          <p>${escapeHtml(area.description)}</p>
        </div>
      </div>
      <div class="sheet-status-row">
        <span class="badge-chip ready">${ready} ready</span>
        <span class="badge-chip queued">${queued} queued</span>
        <span class="badge-chip">${books.length} map pins</span>
      </div>
      <p class="small-note">${escapeHtml(area.prompt)}</p>
      <div class="area-preview-list">
        ${books.slice(0, 5).map((book) => `<span>${book.icon} ${escapeHtml(book.workbookTitle)}</span>`).join("")}
      </div>
      <div class="sheet-actions">
        <button class="primary-button" data-action="enter-area" data-area="${area.id}" data-first-place="${first.id}" data-testid="button-enter-area">Enter ${escapeHtml(area.shortTitle)} →</button>
        <button class="secondary-button" data-action="library" data-testid="button-area-library">Workbook Library</button>
      </div>
    </aside>
  `;
}

function worldSvg(interactive = true, profile = activeProfile()) {
  const suffix = interactive ? "world" : "world-preview";
  const areas = AREAS.map((area) => {
    const books = areaWorkbooks(area.id);
    const completed = books.filter((book) => profile?.completedWorkbooks?.includes(book.id)).length;
    const readyCount = books.filter((book) => book.status === "ready").length;
    const status = readyCount && completed === readyCount ? "done" : area.id === activeAreaId ? "active" : "";
    const attrs = interactive
      ? `role="button" tabindex="0" data-area="${area.id}" data-testid="button-area-${area.id}" aria-label="${escapeHtml(area.title)}"`
      : "";
    return worldAreaSvg(area, status, attrs);
  }).join("");

  return `
    <svg class="founder-world-map" viewBox="0 0 100 100" role="img" aria-label="Founder World clickable business map">
      <defs>
        <linearGradient id="worldPaper-${suffix}" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#FFF8E8"/>
          <stop offset=".52" stop-color="#F0DFC0"/>
          <stop offset="1" stop-color="#DDBF82"/>
        </linearGradient>
        <linearGradient id="mapGrass-${suffix}" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#DDE8D4"/>
          <stop offset="1" stop-color="#BFD4B3"/>
        </linearGradient>
        <linearGradient id="mapField-${suffix}" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#E7D394"/>
          <stop offset="1" stop-color="#C8A978"/>
        </linearGradient>
        <linearGradient id="mapWater-${suffix}" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#C9DCE3"/>
          <stop offset="1" stop-color="#8DB0C0"/>
        </linearGradient>
        <pattern id="fieldRows-${suffix}" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-19)">
          <rect width="4" height="4" fill="transparent"/>
          <path d="M0 1h4" stroke="#8B6D32" stroke-opacity=".22" stroke-width=".35"/>
        </pattern>
        <pattern id="townBlocks-${suffix}" width="5" height="5" patternUnits="userSpaceOnUse">
          <rect width="5" height="5" fill="transparent"/>
          <path d="M5 0H0v5" fill="none" stroke="#241A12" stroke-opacity=".055" stroke-width=".35"/>
        </pattern>
        <filter id="worldShadow-${suffix}" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.2" stdDeviation="1.4" flood-color="#241A12" flood-opacity=".17"/>
        </filter>
        <filter id="cartoonLift-${suffix}" x="-25%" y="-30%" width="155%" height="165%">
          <feDropShadow dx="0.55" dy="1.15" stdDeviation="0.75" flood-color="#241A12" flood-opacity=".18"/>
        </filter>
      </defs>
      <rect x="2" y="2" width="96" height="96" rx="12" fill="url(#worldPaper-${suffix})" stroke="#241A12" stroke-opacity=".16"/>
      <path class="map-vignette" d="M9 8h82c4 0 7 3 7 7v70c0 4-3 7-7 7H9c-4 0-7-3-7-7V15c0-4 3-7 7-7z" fill="none"/>
      <path class="map-zone map-green" d="M5 9 C18 3 30 8 41 10 C55 13 70 5 86 8 C96 10 99 20 94 31 C88 43 76 42 64 38 C52 34 41 39 29 35 C16 31 8 25 5 9z" fill="url(#mapGrass-${suffix})"/>
      <path class="map-zone map-town" d="M31 31 C42 23 58 23 69 31 C78 38 78 50 69 58 C57 68 39 65 28 55 C20 47 21 38 31 31z" fill="#EEDDBF"/>
      <path class="map-zone map-services" d="M60 40 C72 35 89 39 94 51 C97 61 91 70 80 71 C66 73 58 64 58 52 C58 47 58 43 60 40z" fill="#D9E0DA"/>
      <path class="map-zone map-products" d="M7 39 C16 32 31 34 39 43 C42 51 35 62 23 65 C12 67 5 59 6 49 C6 45 6 42 7 39z" fill="#E7DAC2"/>
      <path class="map-zone map-fields" d="M5 67 C15 60 31 62 39 72 C45 81 38 94 22 95 C10 95 4 85 5 67z" fill="url(#mapField-${suffix})"/>
      <path class="map-zone map-industrial" d="M63 13 C73 7 89 10 94 22 C98 32 90 43 78 42 C65 40 59 29 63 13z" fill="#DDD4C4"/>
      <path class="map-water" d="M5 18 C12 20 15 27 17 34 C19 41 24 44 25 50 C14 50 7 47 5 41z" fill="url(#mapWater-${suffix})" opacity=".78"/>
      <path class="map-field-rows" d="M5 67 C15 60 31 62 39 72 C45 81 38 94 22 95 C10 95 4 85 5 67z" fill="url(#fieldRows-${suffix})"/>
      <path class="map-block-grid" d="M31 31 C42 23 58 23 69 31 C78 38 78 50 69 58 C57 68 39 65 28 55 C20 47 21 38 31 31z" fill="url(#townBlocks-${suffix})"/>
      <g class="terrain-highlights" opacity=".58">
        <path d="M11 15 C21 11 30 15 39 17" fill="none" stroke="#FFF8E8" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M67 16 C76 12 87 15 91 23" fill="none" stroke="#FFF8E8" stroke-width="1.1" stroke-linecap="round"/>
        <path d="M63 46 C71 42 83 44 90 52" fill="none" stroke="#FFF8E8" stroke-width="1" stroke-linecap="round"/>
        <path d="M10 45 C16 39 29 40 35 47" fill="none" stroke="#FFF8E8" stroke-width=".9" stroke-linecap="round"/>
      </g>
      <g class="world-roads">
        <path class="road-shadow" d="M49 92 C49 77 52 67 51 55 C50 43 50 31 49 11"/>
        <path class="world-road road-main" d="M49 92 C49 77 52 67 51 55 C50 43 50 31 49 11"/>
        <path class="world-road-line" d="M49 92 C49 77 52 67 51 55 C50 43 50 31 49 11"/>
        <path class="world-road road-side" d="M51 53 C42 49 31 50 22 54"/>
        <path class="world-road road-side" d="M51 53 C63 49 72 51 82 57"/>
        <path class="world-road road-side" d="M55 42 C62 34 70 28 82 25"/>
        <path class="world-road road-side" d="M43 63 C34 68 26 75 20 85"/>
        <path class="world-road-line thin" d="M51 53 C42 49 31 50 22 54"/>
        <path class="world-road-line thin" d="M51 53 C63 49 72 51 82 57"/>
        <path class="world-road-line thin" d="M55 42 C62 34 70 28 82 25"/>
        <path class="world-road-line thin" d="M43 63 C34 68 26 75 20 85"/>
      </g>
      <g class="map-cast-shadows" opacity=".38">
        <ellipse cx="52" cy="84" rx="16" ry="4.2"/>
        <ellipse cx="53" cy="51" rx="15" ry="3.5"/>
        <ellipse cx="81" cy="38" rx="12" ry="3.2"/>
        <ellipse cx="76" cy="61" rx="13" ry="3.3"/>
        <ellipse cx="23" cy="63" rx="13" ry="3.1"/>
        <ellipse cx="21" cy="88" rx="13" ry="3.2"/>
        <ellipse cx="51" cy="23" rx="11" ry="2.9"/>
      </g>
      <g class="map-detail-buildings" filter="url(#worldShadow-${suffix})">
        <g class="map-building school-building">
          <path d="M38 70h24v13H38z"/>
          <path class="roof red" d="M34 70h32L50 58z"/>
          <path d="M47 75h6v8h-6z" fill="#F7F0DF"/>
          <path d="M48 64h4v4h-4z" fill="#FFF8E8"/>
          <path d="M50 61v-4" stroke="#241A12" stroke-opacity=".35" stroke-width=".55"/>
        </g>
        <g class="map-building main-block">
          <path d="M38 39h7v10h-7zM46 37h8v12h-8zM55 40h8v9h-8z"/>
          <path class="roof blue" d="M37 39h27l-2 3H39z"/>
          <path d="M40 43h2v6h-2zM49 42h2v7h-2zM58 44h2v5h-2z" fill="#F7F0DF"/>
        </g>
        <g class="map-building product-stalls">
          <path d="M18 49h7v7h-7zM27 47h7v8h-7zM14 58h19v4H14z"/>
          <path class="roof gold" d="M17 49h9l-1.2 2.2h-6.6zM26 47h9l-1.2 2.2h-6.6z"/>
        </g>
        <g class="map-building service-row">
          <path d="M68 50h7v10h-7zM77 47h8v13h-8z"/>
          <path class="roof green" d="M67 50h19l-2 3H69z"/>
          <path d="M70 54h2v6h-2zM80 52h2v8h-2z" fill="#F7F0DF"/>
        </g>
        <g class="map-building farm-set">
          <path d="M14 77h13v9H14z"/>
          <path class="roof gold" d="M13 77l7.5-7 7.5 7z"/>
          <path d="M18 81h5v5h-5z" fill="#F7F0DF"/>
          <path d="M28 72h5v14h-5z" fill="#FFF8E8"/>
        </g>
        <g class="map-building maker-works">
          <path d="M70 25h18v11H70z"/>
          <path d="M74 19h4v6h-4zM82 17h4v8h-4z" fill="#8C7B73"/>
          <path class="roof purple" d="M69 25h20l-4-4-4 4-4-4-4 4z"/>
          <path d="M73 29h3v7h-3zM79 29h3v7h-3zM85 29h2v7h-2z" fill="#F7F0DF"/>
        </g>
        <g class="map-building growth-depot">
          <path d="M42 14h15v8H42z"/>
          <path class="roof blue" d="M41 14h17l-2 2.5H43z"/>
          <path d="M59 18h8l3 3h-11z" fill="#F7F0DF"/>
          <circle cx="61" cy="22.5" r="1" fill="#241A12" opacity=".55"/>
          <circle cx="68" cy="22.5" r="1" fill="#241A12" opacity=".55"/>
        </g>
      </g>
      <g class="map-cartoon-toppers" filter="url(#cartoonLift-${suffix})">
        <g class="schoolhouse-depth">
          <path class="wall-side" d="M62 70l4.6 3.2v12.2L62 83z" fill="#D8CCB1"/>
          <path class="wall-front" d="M38 70h24v13H38z" fill="#FFF8E8"/>
          <path class="roof-side red" d="M50 58l16 12l-4 3l-12-8.2z" fill="#8F3426"/>
          <path class="roof-face red" d="M34 70h32L50 58z" fill="#C85A45"/>
          <path class="trim" d="M38 70h24M42 74h5M55 74h4" stroke="#241A12" stroke-opacity=".24" stroke-width=".45" stroke-linecap="round"/>
          <path class="door" d="M47 75h6v8h-6z" fill="#E9DCC4"/>
          <path class="window" d="M41 74h4v4h-4zM55 74h4v4h-4z" fill="#C9DCE3"/>
          <path d="M50 61v-4" stroke="#241A12" stroke-opacity=".35" stroke-width=".55" stroke-linecap="round"/>
          <circle cx="50" cy="63.6" r="1.5" fill="#D7A84A" stroke="#FFF8E8" stroke-width=".5"/>
        </g>
        <g class="mainstreet-depth">
          <path class="wall-front" d="M39 40h23v10H39z" fill="#FFF8E8"/>
          <path class="wall-side" d="M62 40l3 2.2v10l-3-2.2z" fill="#D8CCB1"/>
          <path class="roof-side blue" d="M37 39h27l-2 3H39z" fill="#335C7E"/>
          <path class="awning" d="M40 42h21v3H40z" fill="#5E7FA3"/>
          <path class="stripe" d="M43 42v3M48 42v3M53 42v3M58 42v3" stroke="#FFF8E8" stroke-width=".65"/>
          <path class="door" d="M49 45h3.8v5h-3.8z" fill="#E9DCC4"/>
          <path class="window" d="M41 45h5v3h-5zM56 45h4.5v3h-4.5z" fill="#C9DCE3"/>
          <path class="sign-post" d="M51 35v4" stroke="#6B5A46" stroke-width=".5"/>
        </g>
        <g class="products-depth">
          <path class="crate" d="M15 57h7v5h-7zM24 56h7v6h-7z" fill="#C8A978"/>
          <path class="tent" d="M16 50h10l-1.5 4H17.5z" fill="#D7A84A"/>
          <path class="tent red" d="M25 49h10l-1.5 4h-7z" fill="#B84A32"/>
          <path class="stall" d="M17 54h7v5h-7zM26 53h7v6h-7z" fill="#FFF8E8"/>
          <circle cx="17" cy="60.2" r=".7" fill="#2F5D46"/><circle cx="20" cy="60.3" r=".7" fill="#B84A32"/><circle cx="29" cy="60.2" r=".7" fill="#D7A84A"/>
        </g>
        <g class="services-depth">
          <path class="wall-front" d="M68 51h17v10H68z" fill="#FFF8E8"/>
          <path class="wall-side" d="M85 51l3 2.1v9.9L85 61z" fill="#D8CCB1"/>
          <path class="roof-face green" d="M67 50h20l-2 3H69z" fill="#2F5D46"/>
          <path class="window" d="M70 54h4v4h-4zM78 54h4v4h-4z" fill="#C9DCE3"/>
          <path class="door" d="M74.8 54h3v7h-3z" fill="#E9DCC4"/>
          <path class="service-cart" d="M88 61h4.8l1 1.8h-6.6z" fill="#5E7FA3"/>
          <circle cx="88.6" cy="63.2" r=".7" fill="#241A12" opacity=".65"/><circle cx="92.5" cy="63.2" r=".7" fill="#241A12" opacity=".65"/>
        </g>
        <g class="farm-depth">
          <path class="barn-side" d="M27 77l4 2.5v9l-4-2.5z" fill="#B99040"/>
          <path class="barn-front" d="M14 77h13v9H14z" fill="#FFF8E8"/>
          <path class="roof-face gold" d="M13 77l7.5-7 7.5 7z" fill="#D7A84A"/>
          <path class="roof-side gold" d="M20.5 70l7.5 7l3 2.2l-8-4.6z" fill="#9B762C"/>
          <path class="door" d="M18 81h5v5h-5z" fill="#E9DCC4"/>
          <path class="crop" d="M9 76c4 .9 8 .9 12-.2M8 80c5 1 11 1 17-.4M9 84c5 1.2 12 1.1 18-.2" stroke="#6F8A3D" stroke-width=".7" stroke-linecap="round"/>
          <path class="sprout" d="M31 75c.4-1.4 1.4-2.4 2.7-2.9M31 78c.6-1.2 1.7-2.1 3.1-2.5" stroke="#2F5D46" stroke-width=".55" stroke-linecap="round"/>
        </g>
        <g class="maker-depth">
          <path class="wall-front" d="M70 25h18v11H70z" fill="#FFF8E8"/>
          <path class="wall-side" d="M88 25l3.1 2.4v10.8L88 36z" fill="#D7CDDD"/>
          <path class="roof-face purple" d="M69 25h20l-4-4-4 4-4-4-4 4z" fill="#6E557E"/>
          <path class="roof-side purple" d="M85 21l4 4l2.2 2.2l-4.2-2.2z" fill="#503A62"/>
          <path class="window" d="M73 29h3v4h-3zM80 29h3v4h-3z" fill="#C9DCE3"/>
          <path class="door" d="M84 29h2.6v7h-2.6z" fill="#E9DCC4"/>
          <path class="smoke" d="M76 18c1.1-1.3 3.1-1.2 3.8.2M83.5 15.8c1.3-1.1 3.4-.6 3.8 1.1" fill="none" stroke="#8C7B73" stroke-opacity=".48" stroke-width=".75" stroke-linecap="round"/>
        </g>
        <g class="growth-depth">
          <path class="wall-front" d="M42 14h15v8H42z" fill="#FFF8E8"/>
          <path class="wall-side" d="M57 14l3 2.1v8L57 22z" fill="#D8CCB1"/>
          <path class="roof-face blue" d="M41 14h17l-2 2.5H43z" fill="#5E7FA3"/>
          <path class="truck" d="M59 18h8l3 3h-11z" fill="#FFF8E8"/>
          <path d="M62 19.2h3" stroke="#5E7FA3" stroke-width=".55" stroke-linecap="round"/>
          <circle cx="61" cy="22.5" r="1" fill="#241A12" opacity=".6"/><circle cx="68" cy="22.5" r="1" fill="#241A12" opacity=".6"/>
        </g>
      </g>
      <g class="map-detail-nature">
        <path d="M8 23 C12 25 13 29 12 34" fill="none" stroke="#FFF8E8" stroke-opacity=".52" stroke-width=".9" stroke-linecap="round"/>
        <circle cx="17" cy="31" r="1.55" fill="#2F5D46"/><circle cx="20" cy="33" r="1.25" fill="#2F5D46"/>
        <circle cx="87" cy="46" r="1.45" fill="#2F5D46"/><circle cx="90" cy="49" r="1.1" fill="#2F5D46"/>
        <circle cx="38" cy="86" r="1.35" fill="#2F5D46"/><circle cx="42" cy="87" r="1.1" fill="#2F5D46"/>
        <path d="M11 87c5 1 12 1 18-1M12 82c5 1 14 .5 21-2M13 75c5 1.2 13 .8 20-1" stroke="#8B6D32" stroke-opacity=".36" stroke-width=".6" stroke-linecap="round"/>
      </g>
      ${areas}
    </svg>
  `;
}

function worldAreaSvg(area, status, attrs) {
  const safeTitle = escapeSvg(area.title);
  const safeShort = escapeSvg(area.shortTitle);
  const className = `world-area world-area-${area.id} area-${area.color} ${status}`;
  const stamp = status === "done"
    ? `<g class="area-stamp" aria-hidden="true"><circle cx="0" cy="0" r="3.1"></circle><path d="M-1.5 0l1 1.2 2.2-2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`
    : "";

  const label = (x, y, width = 17) => `
    <g class="area-map-label" transform="translate(${x} ${y})">
      <rect x="${-width / 2}" y="-3.15" width="${width}" height="6.3" rx="1.8"></rect>
      <text x="0" y=".85" text-anchor="middle">${safeShort}</text>
    </g>
  `;

  const pin = (x, y) => `
    <g class="area-map-pin" transform="translate(${x} ${y})">
      <circle class="pin-ring" r="3.15"></circle>
      <circle class="pin-dot" r="1.45"></circle>
    </g>
  `;

  const group = (body) => `
    <g class="${className}" ${attrs}>
      <title>${safeTitle}</title>
      ${body}
    </g>
  `;

  switch (area.id) {
    case "schoolhouse":
      return group(`
        <rect class="area-hit" x="35" y="59" width="31" height="29" rx="6"></rect>
        <path class="area-outline" d="M35 65 C40 58 53 56 63 62 C68 69 65 83 56 87 C45 91 35 82 35 65z"></path>
        ${pin(50, 69)}
        ${label(50, 91, 21)}
        <g class="area-stamp-holder" transform="translate(62 63)">${stamp}</g>
      `);
    case "main-street":
      return group(`
        <rect class="area-hit" x="34" y="31" width="33" height="28" rx="6"></rect>
        <path class="area-outline" d="M34 34 C43 27 58 28 66 36 C72 44 66 57 54 60 C42 62 32 52 34 34z"></path>
        ${pin(51, 45)}
        ${label(51, 30, 21)}
        <g class="area-stamp-holder" transform="translate(63 36)">${stamp}</g>
      `);
    case "products":
      return group(`
        <rect class="area-hit" x="7" y="38" width="33" height="28" rx="7"></rect>
        <path class="area-outline" d="M8 42 C17 34 32 36 39 44 C43 53 34 65 20 66 C10 66 4 56 8 42z"></path>
        ${pin(24, 53)}
        ${label(24, 39, 20)}
        <g class="area-stamp-holder" transform="translate(35 46)">${stamp}</g>
      `);
    case "services":
      return group(`
        <rect class="area-hit" x="60" y="41" width="35" height="31" rx="7"></rect>
        <path class="area-outline" d="M61 45 C72 37 89 42 94 53 C98 65 88 73 76 72 C65 71 58 58 61 45z"></path>
        ${pin(78, 55)}
        ${label(78, 40, 18)}
        <g class="area-stamp-holder" transform="translate(90 51)">${stamp}</g>
      `);
    case "farm-fields":
      return group(`
        <rect class="area-hit" x="5" y="64" width="35" height="32" rx="7"></rect>
        <path class="area-outline" d="M6 68 C15 60 31 63 39 73 C44 83 36 95 22 96 C9 96 2 84 6 68z"></path>
        ${pin(22, 78)}
        ${label(23, 66, 19)}
        <g class="area-stamp-holder" transform="translate(35 75)">${stamp}</g>
      `);
    case "maker-works":
      return group(`
        <rect class="area-hit" x="62" y="12" width="34" height="31" rx="7"></rect>
        <path class="area-outline" d="M64 14 C74 7 90 11 95 23 C99 35 89 44 77 43 C65 41 58 27 64 14z"></path>
        ${pin(78, 28)}
        ${label(79, 13, 19)}
        <g class="area-stamp-holder" transform="translate(92 24)">${stamp}</g>
      `);
    case "growth-road":
      return group(`
        <rect class="area-hit" x="37" y="7" width="29" height="20" rx="6"></rect>
        <path class="area-outline" d="M38 10 C46 6 58 7 65 13 C67 21 61 27 51 27 C41 27 35 18 38 10z"></path>
        ${pin(50, 18)}
        ${label(50, 8, 22)}
        <g class="area-stamp-holder" transform="translate(62 16)">${stamp}</g>
      `);
    default:
      return group(`
        <circle class="area-hit" cx="${area.marker.x}" cy="${area.marker.y}" r="10"></circle>
        <circle class="area-outline" cx="${area.marker.x}" cy="${area.marker.y}" r="8"></circle>
        ${pin(area.marker.x, area.marker.y)}
        ${label(area.marker.x, area.marker.y + 13, 20)}
        <g class="area-stamp-holder" transform="translate(${area.marker.x + 8} ${area.marker.y - 7})">${stamp}</g>
      `);
  }
}

function areaMapSvg(area, interactive = true, profile = activeProfile()) {
  return townSvg(interactive, profile, areaWorkbooks(area.id), area);
}

function townSvg(interactive = true, profile = activeProfile(), books = WORKBOOKS, area = null) {
  const suffix = interactive ? "hub" : "preview";
  const places = books.map((place, index) => {
    const status = workbookStatus(place, profile);
    const marker = areaMarker(place, area, index);
    const attrs = interactive
      ? `role="button" tabindex="0" data-place="${place.id}" data-testid="button-place-${place.id}" aria-label="${escapeHtml(place.place)}"`
      : "";
    return `
      <g class="town-pin pin-${place.color} ${status}" transform="translate(${marker.x} ${marker.y})" ${attrs}>
        <circle class="pin-glow" r="5.8"></circle>
        <circle class="pin-core" r="3.15"></circle>
        <text x="0" y="-7.2" text-anchor="middle">${place.icon}</text>
        <text class="pin-label" x="0" y="8.6" text-anchor="middle">${escapeSvg(place.place)}</text>
      </g>
    `;
  }).join("");

  return `
    <svg class="founder-town-map" viewBox="0 0 100 100" role="img" aria-label="${area ? escapeHtml(area.title) : "Founder World"} workbook area map">
      <defs>
        <linearGradient id="townSky-${suffix}" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#F7F0DF"/>
          <stop offset=".55" stop-color="#F2E4C6"/>
          <stop offset="1" stop-color="#E8D3A9"/>
        </linearGradient>
        <linearGradient id="roadGold-${suffix}" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stop-color="#C8A978"/>
          <stop offset=".5" stop-color="#D7B76A"/>
          <stop offset="1" stop-color="#B99454"/>
        </linearGradient>
        <filter id="paperShadow-${suffix}" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.2" stdDeviation="1.1" flood-color="#241A12" flood-opacity=".16"/>
        </filter>
        <filter id="softGlow-${suffix}" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.2" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect x="2" y="2" width="96" height="96" rx="10" fill="url(#townSky-${suffix})" stroke="#241A12" stroke-opacity=".18"/>
      <path d="M7 23 C17 18 29 19 40 24 C52 30 62 26 74 19 C85 13 94 15 97 20" fill="none" stroke="#5E7FA3" stroke-width="6" stroke-linecap="round" opacity=".28"/>
      <path d="M7 78 C18 70 25 68 34 59 C45 48 54 51 63 39 C72 27 83 30 94 20" fill="none" stroke="url(#roadGold-${suffix})" stroke-width="10" stroke-linecap="round"/>
      <path d="M7 78 C18 70 25 68 34 59 C45 48 54 51 63 39 C72 27 83 30 94 20" fill="none" stroke="#FFF7E5" stroke-width="4.2" stroke-linecap="round" stroke-dasharray="5 5" opacity=".95"/>
      <path d="M12 84 C22 82 33 88 44 84 C54 80 66 83 78 88 C87 92 94 88 98 85" fill="none" stroke="#2F5D46" stroke-width="2.5" stroke-linecap="round" opacity=".2"/>
      <g class="town-skybits" opacity=".72">
        <path d="M77 10c1.4-2 4.6-1.6 5.3.7 1.8-.7 3.9.4 4 2.2H73.8c.2-1.7 1.8-3 3.2-2.9z" fill="#FFF8E8"/>
        <path d="M14 10c1-1.5 3.4-1.2 4 .5 1.4-.5 3 .3 3.1 1.7H11.3c.2-1.2 1.4-2.1 2.7-2.2z" fill="#FFF8E8"/>
        <circle cx="88" cy="27" r="3.1" fill="#D7A84A" opacity=".45"/>
      </g>
      <g class="town-yards" opacity=".88">
        <path d="M9 63c5-5 12-5 18-2 2 5-1 12-8 14-7 2-12-4-10-12z" fill="#DDE8D4"/>
        <path d="M54 53c6-4 14-3 18 2 1 7-6 12-13 10-6-2-8-8-5-12z" fill="#DDE8D4"/>
        <path d="M73 70c4-4 11-3 16 1 2 5-.7 11-7 13-6 1-11-5-9-14z" fill="#EEE6D3"/>
      </g>
      <g class="cute-buildings" filter="url(#paperShadow-${suffix})">
        <g class="map-shop">
          <path d="M12 66h17v10H12z" fill="#FFF8E8"/>
          <path d="M14 59h13v7H14z" fill="#F2D8C8"/>
          <path d="M11 66h19l-2 3H13z" fill="#B84A32"/>
          <path d="M14 69h4v7h-4zM21 69h5v4h-5z" fill="#F7F0DF"/>
        </g>
        <g class="map-shop">
          <path d="M33 49h17v13H33z" fill="#FFF8E8"/>
          <path d="M36 43h11v6H36z" fill="#DDE8D4"/>
          <path d="M32 49h19l-2 3H34z" fill="#5E7FA3"/>
          <path d="M37 53h5v9h-5zM44 53h4v4h-4z" fill="#F7F0DF"/>
        </g>
        <g class="map-shop">
          <path d="M55 58h17v13H55z" fill="#FFF8E8"/>
          <path d="M58 51h10v7H58z" fill="#F0DFC0"/>
          <path d="M54 58h19l-2 3H56z" fill="#2F5D46"/>
          <path d="M60 62h5v9h-5zM67 62h3v4h-3z" fill="#F7F0DF"/>
        </g>
        <g class="map-shop">
          <path d="M69 35h18v13H69z" fill="#F5DDD0"/>
          <path d="M72 28h12v7H72z" fill="#F9E8B8"/>
          <path d="M68 35h20l-2 3H70z" fill="#B84A32"/>
          <path d="M74 39h6v9h-6zM82 39h3v4h-3z" fill="#FFF8E8"/>
        </g>
        <g class="map-shop">
          <path d="M44 22h18v13H44z" fill="#E9DCEC"/>
          <path d="M48 15h10v7H48z" fill="#F9E8B8"/>
          <path d="M43 22h20l-2 3H45z" fill="#6E557E"/>
          <path d="M50 26h5v9h-5zM57 26h3v4h-3z" fill="#FFF8E8"/>
        </g>
        <g class="map-shop">
          <path d="M9 21h17v13H9z" fill="#DEE7D9"/>
          <path d="M12 15h11v6H12z" fill="#FFF8E8"/>
          <path d="M8 21h19l-2 3H10z" fill="#5E7FA3"/>
          <path d="M14 25h5v9h-5zM21 25h3v4h-3z" fill="#F7F0DF"/>
        </g>
        <g class="map-shop">
          <path d="M78 76h17v12H78z" fill="#FFF8E8"/>
          <path d="M82 68h9v8H82z" fill="#F0DFC0"/>
          <path d="M77 76h19l-2 3H79z" fill="#D7A84A"/>
          <path d="M84 79h5v9h-5zM91 79h3v4h-3z" fill="#F7F0DF"/>
        </g>
        <g stroke="#241A12" stroke-opacity=".18" fill="none">
          <path d="M12 66h17v10H12zM14 59h13v7H14z"/>
          <path d="M33 49h17v13H33zM36 43h11v6H36z"/>
          <path d="M55 58h17v13H55zM58 51h10v7H58z"/>
          <path d="M69 35h18v13H69zM72 28h12v7H72z"/>
          <path d="M44 22h18v13H44zM48 15h10v7H48z"/>
          <path d="M9 21h17v13H9zM12 15h11v6H12z"/>
          <path d="M78 76h17v12H78zM82 68h9v8H82z"/>
        </g>
      </g>
      <g class="town-details" opacity=".92">
        <path d="M31 40h9" stroke="#B84A32" stroke-width=".6" stroke-linecap="round" stroke-dasharray="1 1"/>
        <path d="M64 25h9" stroke="#D7A84A" stroke-width=".6" stroke-linecap="round" stroke-dasharray="1 1"/>
        <rect x="29" y="74" width="4.5" height="6" rx=".7" fill="#FFF8E8" stroke="#241A12" stroke-opacity=".16"/>
        <path d="M30 76h2.5M30 77.8h2.5" stroke="#5E7FA3" stroke-width=".45" opacity=".65"/>
        <rect x="86" y="56" width="5" height="3" rx=".6" fill="#B84A32"/>
        <circle cx="87" cy="59.5" r=".8" fill="#241A12" opacity=".55"/><circle cx="90" cy="59.5" r=".8" fill="#241A12" opacity=".55"/>
        <path d="M70 53h5l2 3h-9z" fill="#D7A84A" stroke="#241A12" stroke-opacity=".15"/>
        <path d="M72.5 53v-3" stroke="#B84A32" stroke-width=".6"/>
        <circle cx="16" cy="82" r=".8" fill="#B84A32"/><circle cx="18" cy="81" r=".7" fill="#D7A84A"/><circle cx="20" cy="82.2" r=".8" fill="#6E557E"/>
        <circle cx="57" cy="80" r=".8" fill="#B84A32"/><circle cx="59" cy="81" r=".7" fill="#D7A84A"/><circle cx="61" cy="80.1" r=".8" fill="#6E557E"/>
      </g>
      <g class="town-trees" opacity=".82" filter="url(#softGlow-${suffix})">
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
  const area = areaForWorkbook(place.id, activeAreaId);
  return `
    <aside class="place-sheet" data-testid="place-sheet">
      <div class="sheet-handle"></div>
      <div class="place-sheet-head">
        <div class="place-icon ${status}">${place.icon}</div>
        <div>
          <span class="kicker">Vol. ${place.number} · ${escapeHtml(area.shortTitle)} · ${escapeHtml(place.district)}</span>
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
  const area = areaForWorkbook(workbook.id, activeAreaId);
  activeAreaId = area.id;
  if (workbook.status !== "ready") {
    view = "area";
    return renderArea();
  }
  const note = profile?.notebook?.[workbook.id] || "";
  const done = profile?.completedWorkbooks?.includes(workbook.id);
  return `
    <main class="reader-shell" data-testid="workbook-reader">
      <section class="workbook-cover">
        <div class="cover-art">
          ${areaMapSvg(area, false, profile)}
        </div>
        <div class="cover-copy">
          <button class="mark-done ${done ? "checked" : ""}" data-action="mark-done" data-workbook="${workbook.id}" data-testid="button-mark-done">${done ? "✓ Done" : "□ Mark done"}</button>
          <span class="kicker">Vol. ${workbook.number} · ${escapeHtml(area.shortTitle)} · ${escapeHtml(workbook.district)}</span>
          <h1>${escapeHtml(workbook.workbookTitle)}</h1>
          <p>${escapeHtml(workbook.subtitle)}</p>
          <button class="secondary-button" data-action="area" data-testid="button-back-area-reader">Back to ${escapeHtml(area.shortTitle)}</button>
        </div>
      </section>
      <section class="reader-page about-book">
        <span class="kicker">About this workbook</span>
        <h2>${escapeHtml(workbook.place)}: ${escapeHtml(workbook.workbookTitle)}</h2>
        <p>Part of the SAVE Founder World series published by SAVE Learning Co. Designed for curious readers around Grade 3 with a parent nearby.</p>
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
      <h2>Founder World Workbooks</h2>
      <div class="library-list">
        ${AREAS.map((area) => {
          const books = areaWorkbooks(area.id);
          return `
            <div class="library-area-label">${area.icon} ${escapeHtml(area.shortTitle)}</div>
            ${books.map((book) => {
              const status = workbookStatus(book, profile);
              return `
                <button class="library-row ${status}" data-area="${area.id}" data-place="${book.id}" data-testid="button-library-${area.id}-${book.id}">
                  <span>${book.number}</span>
                  <strong>${escapeHtml(book.workbookTitle)}</strong>
                  <em>${book.status === "ready" ? "Ready" : profile?.queuedWorkbooks?.includes(book.id) ? "Queued" : "Queue"}</em>
                </button>
              `;
            }).join("")}
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
          <span class="kicker">Founder World Progress</span>
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
        <h1>How Founder World works</h1>
        <p>Founder World uses the Expedition Atlas pattern: farthest view first, tap an area, zoom in, open a workbook, or queue a future workbook.</p>
      </section>
      <section class="parent-card">
        <h2>What this teaches</h2>
        <p>SAVE Founder World teaches children the first ideas of entrepreneurship through short map-linked workbooks: finding a need, creating a product or service, buying supplies, setting prices, serving customers, tracking money in and money out, finding profit, saving, reinvesting, and understanding a simple civic version of taxes.</p>
        <div class="pull-note">The Town Share activity is not tax or legal advice. It is a child-friendly model showing that businesses keep records and contribute to shared community needs.</div>
        <div class="pull-note">This workbook is for learning only. It is not legal, tax, payroll, or accounting advice. A real business owner should ask a qualified professional and check federal, state, and local rules.</div>
      </section>
      <section class="grid">
        ${AREAS.map((area) => `
          <div class="parent-card">
            <span class="kicker">${escapeHtml(area.kicker)}</span>
            <h2>${area.icon} ${escapeHtml(area.title)}</h2>
            <p>${escapeHtml(area.description)}</p>
            <div class="ledger-list">${areaWorkbooks(area.id).map((book) => `<div class="ledger-row"><span>${book.number}. ${escapeHtml(book.workbookTitle)}</span><strong>${book.status === "ready" ? "ready" : "queue"}</strong></div>`).join("")}</div>
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
        <h1>Founder World can grow beyond the first map.</h1>
        <p>V1 focuses on the Schoolhouse and the first business areas. Future volumes can zoom from tiny shops to bigger business systems.</p>
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
        <h1>Founder World source notes</h1>
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
          view = "world";
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
      if (action === "world" || action === "town") view = activeProfile() ? "world" : "welcome";
      if (action === "area") view = activeProfile() ? "area" : "welcome";
      if (action === "enter-area") {
        activeAreaId = button.dataset.area || activeAreaId;
        activePlaceId = button.dataset.firstPlace || firstAreaBook(activeAreaId)?.id || activePlaceId;
        view = activeProfile() ? "area" : "welcome";
      }
      if (action === "notebook") view = "notebook";
      if (action === "parent") view = "parent";
      if (action === "growth") view = "growth";
      if (action === "sources") view = "sources";
      if (action === "library") drawerOpen = true;
      if (action === "close-library") drawerOpen = false;
      if (action === "open-workbook") {
        activePlaceId = button.dataset.workbook;
        activeAreaId = areaForWorkbook(activePlaceId, activeAreaId).id;
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
    view = "world";
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
      view = "world";
      render();
    });
  });

  document.querySelectorAll("[data-shared-profile-id]").forEach((button) => {
    button.addEventListener("click", () => {
      window.ProfileAPI.setActive?.(button.dataset.sharedProfileId);
      view = "world";
      render();
    });
  });

  document.querySelectorAll("[data-area]").forEach((button) => {
    const selectArea = () => {
      activeAreaId = button.dataset.area;
      drawerOpen = false;
      if (!button.dataset.place) render();
    };
    button.addEventListener("click", selectArea);
    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectArea();
      }
    });
  });

  document.querySelectorAll("[data-place]").forEach((button) => {
    const selectPlace = () => {
      activePlaceId = button.dataset.place;
      activeAreaId = areaForWorkbook(activePlaceId, activeAreaId).id;
      drawerOpen = false;
      view = "area";
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

function getWorkbook(id) {
  return WORKBOOKS.find((book) => book.id === id);
}

function getArea(id) {
  return AREAS.find((area) => area.id === id);
}

function areaWorkbooks(areaId) {
  const area = getArea(areaId) || AREAS[0];
  return [...new Set(area.bookIds)].map(getWorkbook).filter(Boolean);
}

function firstAreaBook(areaId) {
  return areaWorkbooks(areaId)[0] || WORKBOOKS[0];
}

function areaForWorkbook(workbookId, preferredAreaId = "") {
  const preferred = getArea(preferredAreaId);
  if (preferred?.bookIds?.includes(workbookId)) return preferred;
  return AREAS.find((area) => area.bookIds.includes(workbookId)) || AREAS[0];
}

function areaMarker(place, area, index) {
  if (!area || area.id !== "schoolhouse") return place.marker;
  const schoolMarkers = [
    { x: 20, y: 37 },
    { x: 40, y: 36 },
    { x: 60, y: 37 },
    { x: 78, y: 45 },
    { x: 23, y: 63 },
    { x: 44, y: 64 },
    { x: 63, y: 64 },
    { x: 80, y: 70 },
    { x: 50, y: 84 },
  ];
  return schoolMarkers[index % schoolMarkers.length];
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
      view = "world";
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
