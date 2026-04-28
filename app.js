const STORAGE_KEY = "msm_business_basics_atlas_v2";
const LEGACY_STORAGE_KEY = "save.mainStreetMakers.v1";
const DEFAULT_PROFILE_NAME = "Founder";
const SAFE_ICONS = ["🍋", "🐾", "🎨", "🍪", "🧵", "🌱", "📚", "💌", "🧺", "🪴"];

const PRESET_BUSINESSES = [
  {
    id: "lemonade",
    title: "Lemonade Stand",
    type: "Drink stand",
    product: "Cold lemonade",
    icon: "🍋",
    price: 2,
    supplies: ["lemons", "cups", "ice"],
    blurb: "A sunny first example for learning business basics.",
  },
  {
    id: "pet-treat",
    title: "Pet Treat Cart",
    type: "Treat cart",
    product: "Pet treats",
    icon: "🐾",
    price: 3,
    supplies: ["oats", "bags", "labels"],
    blurb: "A neighborly cart for serving families with pets.",
  },
  {
    id: "art-sticker",
    title: "Art & Sticker Booth",
    type: "Art booth",
    product: "Handmade stickers",
    icon: "🎨",
    price: 1,
    supplies: ["paper", "markers", "sticker sheets"],
    blurb: "A creative booth for learning customers, price, and records.",
  },
];

const DISTRICTS = [
  {
    id: "idea",
    name: "The Big Idea",
    icon: "💡",
    sign: "Idea Shop",
    blurb: "What is a business, and who does it help?",
  },
  {
    id: "plan",
    name: "The Founder’s Plan",
    icon: "📝",
    sign: "Planning Office",
    blurb: "Test the idea before spending too much time or money.",
  },
  {
    id: "setup",
    name: "The Grown-Up Setup Desk",
    icon: "🏛️",
    sign: "Setup Desk",
    blurb: "Learn the grown-up paperwork words without giving legal advice.",
  },
  {
    id: "records",
    name: "The Record Book",
    icon: "📒",
    sign: "Record Book",
    blurb: "Track money, receipts, budgets, and what worked.",
  },
];

const CHAPTERS = [
  {
    id: "business",
    district: "idea",
    number: 1,
    title: "What Is a Business?",
    icon: "🏪",
    bigQuestion: "How does a business help people?",
    grownWord: "Business",
    wordMeaning: "A way to help people with a product or service.",
    reading: [
      "A business begins with help. A person sees a need and offers a useful answer.",
      "A lemonade stand helps thirsty neighbors. A bookmark shop helps readers keep their place. A lawn helper helps a family care for a yard.",
      "Money matters, but it is not the first idea. The first idea is service. A good founder asks, “Who can I help?”",
    ],
    kidExample: "Your shop can be small and still teach a big idea: notice a need, offer help, and keep your promise.",
    tryIt: "Point to one person your business could help today.",
    prompt: "My business helps people who need...",
    parentNote: "Start with service. This keeps business from feeling like only buying and selling.",
    sourceIds: ["sba-plan"],
  },
  {
    id: "offer",
    district: "idea",
    number: 2,
    title: "Product or Service?",
    icon: "🧰",
    bigQuestion: "Is the business selling a thing, a helpful job, or both?",
    grownWord: "Product and service",
    wordMeaning: "A product is a thing people buy. A service is a helpful job.",
    reading: [
      "Some businesses sell products. A cookie cart sells cookies. A sticker booth sells stickers.",
      "Some businesses sell services. A lawn helper does a helpful job. A party helper sets up tables or carries supplies.",
      "Some businesses do both. A garden stand may sell flowers and also help plant them.",
    ],
    kidExample: "A bracelet booth sells a product. A bracelet class is a service. A booth that sells bracelets and teaches a tiny class does both.",
    tryIt: "Sort your business idea into product, service, or both.",
    prompt: "My offer is a product, service, or both because...",
    parentNote: "This chapter introduces a basic business model distinction in child-sized language.",
    sourceIds: ["sba-plan"],
  },
  {
    id: "customer",
    district: "idea",
    number: 3,
    title: "Who Is the Customer?",
    icon: "👥",
    bigQuestion: "Who might want or need this offer?",
    grownWord: "Customer",
    wordMeaning: "A person who may buy or use what a business offers.",
    reading: [
      "A customer is not just “anybody.” A customer is a person with a need your business can serve.",
      "A pet treat cart serves families with pets. A bookmark shop serves readers. A birthday card table serves people who want to cheer someone up.",
      "Good founders learn about customers before they make a big plan.",
    ],
    kidExample: "If you sell lemonade, your best customer may be someone walking outside on a warm day.",
    tryIt: "Name three kinds of people who might want your offer.",
    prompt: "Three customers who might like my business are...",
    parentNote: "The SBA describes market research as a way to find customers and understand demand before starting.",
    sourceIds: ["sba-market"],
  },
  {
    id: "sense",
    district: "plan",
    number: 4,
    title: "Does the Idea Make Sense?",
    icon: "🔎",
    bigQuestion: "How can a founder check an idea before building it?",
    grownWord: "Market research",
    wordMeaning: "Learning what customers need before you start.",
    reading: [
      "A founder does not need to guess everything. A founder can ask kind questions and notice what people choose.",
      "Will people want this? Are there already many similar choices? What price feels fair? These questions help an idea become clearer.",
      "Testing first can save time, supplies, and disappointment.",
    ],
    kidExample: "Before making twenty bookmarks, ask three readers which animal, color, or verse style they would choose.",
    tryIt: "Write one question you could ask a possible customer.",
    prompt: "One kind question I can ask a possible customer is...",
    parentNote: "The SBA recommends looking at demand, market size, location, saturation, and pricing when researching a market.",
    sourceIds: ["sba-market"],
  },
  {
    id: "test",
    district: "plan",
    number: 5,
    title: "How Do You Test an Idea?",
    icon: "🧪",
    bigQuestion: "What is a tiny safe test?",
    grownWord: "Test market",
    wordMeaning: "A small way to learn if people may want the offer.",
    reading: [
      "A test is a small try. It helps a founder learn before making a big batch.",
      "A cookie cart could test three cookie flavors with family. A card table could show three card designs and ask which one is clearest.",
      "A test should be simple, kind, and safe. The goal is to learn.",
    ],
    kidExample: "Make one sample sign before making ten signs. Ask, “Can you tell what I sell?”",
    tryIt: "Choose a tiny test your business could do this week.",
    prompt: "My tiny test will be...",
    parentNote: "Direct research can include surveys, questionnaires, focus groups, or interviews. For a child, keep it informal and parent-guided.",
    sourceIds: ["sba-market"],
  },
  {
    id: "cost",
    district: "plan",
    number: 6,
    title: "What Does It Cost to Start?",
    icon: "📦",
    bigQuestion: "What supplies or tools are needed first?",
    grownWord: "Startup cost",
    wordMeaning: "Money or supplies needed before a business can begin.",
    reading: [
      "Many businesses need supplies before they can serve a customer.",
      "A lemonade stand may need lemons, cups, ice, and a sign. A sticker booth may need paper, markers, and sticker sheets.",
      "A careful founder starts small. The first plan does not need every fancy thing.",
    ],
    kidExample: "A starter bundle is better than a too-big bundle if you are still learning.",
    tryIt: "Choose the three most important supplies for your first day.",
    prompt: "My three starter supplies are...",
    parentNote: "A business plan often includes cost structure and key resources. Keep this at the level of estimating needed supplies.",
    sourceIds: ["sba-business-plan"],
  },
  {
    id: "price",
    district: "plan",
    number: 7,
    title: "What Price Makes Sense?",
    icon: "🏷️",
    bigQuestion: "How can a price be fair to the customer and the business?",
    grownWord: "Pricing",
    wordMeaning: "Choosing what customers pay for a product or service.",
    reading: [
      "A price is a promise. It tells the customer what the business asks in return for the offer.",
      "A price that is too low may not cover the work. A price that is too high may make customers walk away.",
      "A fair price thinks about supplies, time, quality, and what customers expect.",
    ],
    kidExample: "If lemonade supplies cost money, the price needs to help replace those supplies.",
    tryIt: "Pick low, fair, or high for your example price and explain why.",
    prompt: "A fair starting price might be...",
    parentNote: "The SBA includes pricing among the questions to study when evaluating a market.",
    sourceIds: ["sba-market"],
  },
  {
    id: "money",
    district: "records",
    number: 8,
    title: "Money In, Money Out, Profit",
    icon: "🧮",
    bigQuestion: "What is left after expenses?",
    grownWord: "Profit",
    wordMeaning: "What is left after expenses are paid.",
    reading: [
      "Revenue is money that comes in. Expenses are money the business spends.",
      "Profit is what is left after expenses. If 6 coins come in and 3 coins go out, 3 coins are left.",
      "A founder needs to know all three words: revenue, expenses, and profit.",
    ],
    kidExample: "If you sell lemonade for 6 coins and cups and lemons cost 3 coins, the profit is 3 coins.",
    tryIt: "Solve this: 8 coins in minus 5 coins out equals what?",
    prompt: "Revenue means... Expenses mean... Profit means...",
    parentNote: "The IRS recordkeeping page explains that books should show income and expenses. This chapter builds the vocabulary gently.",
    sourceIds: ["irs-records"],
  },
  {
    id: "records",
    district: "records",
    number: 9,
    title: "Keeping Records",
    icon: "🧾",
    bigQuestion: "Why do businesses keep receipts and notes?",
    grownWord: "Recordkeeping",
    wordMeaning: "Saving clear notes and papers that show what happened.",
    reading: [
      "A record is a clue from the past. It helps a business remember what came in, what went out, and what changed.",
      "Receipts, invoices, sales slips, and deposit notes can help explain the numbers.",
      "Good records make it easier for a grown-up to answer business and tax questions later.",
    ],
    kidExample: "A receipt can remind you that you bought cups on Monday before the Saturday lemonade stand.",
    tryIt: "Draw or write one receipt your business might keep.",
    prompt: "One record my business should keep is...",
    parentNote: "The IRS says records should support income, expenses, deductions, credits, and tax return entries.",
    sourceIds: ["irs-records"],
  },
  {
    id: "structure",
    district: "setup",
    number: 10,
    title: "Business Name and Structure",
    icon: "🏗️",
    bigQuestion: "Why do grown-ups choose a business type?",
    grownWord: "Business structure",
    wordMeaning: "The legal form a business uses, such as sole proprietor, LLC, or corporation.",
    reading: [
      "A real business may need a grown-up to choose a structure. That choice affects paperwork, taxes, records, and risk.",
      "A sole proprietor is one person running a business. An LLC is a business with state paperwork and legal rules. A corporation has more formal company rules.",
      "Children do not need to choose one here. We are learning the map so the words feel less mysterious.",
    ],
    kidExample: "Think of structure like choosing the right kind of folder before filing important papers.",
    tryIt: "Match each word: sole proprietor, LLC, corporation, to its simple meaning.",
    prompt: "A business structure matters because...",
    parentNote: "The SBA says structure affects taxes, ability to raise money, paperwork, and personal liability. This is education only, not advice.",
    sourceIds: ["sba-structure"],
  },
  {
    id: "ein",
    district: "setup",
    number: 11,
    title: "EIN, State Filing, and Permits",
    icon: "🗂️",
    bigQuestion: "What official numbers and papers might a business need?",
    grownWord: "EIN",
    wordMeaning: "A federal tax ID number for a business.",
    reading: [
      "Some real businesses need official numbers and papers. An EIN is a federal tax ID number for a business.",
      "Some businesses also register with a state. Some need licenses or permits. The rules can change by place and business type.",
      "That is why grown-ups check official sources and ask qualified helpers.",
    ],
    kidExample: "An EIN is not a prize or badge. It is more like an official label used for business tax records.",
    tryIt: "Circle the safe answer: ask a grown-up to check official rules.",
    prompt: "An EIN is used for...",
    parentNote: "The IRS says EINs are free directly from the IRS. The IRS also says a legal entity should be formed through the state before applying for an EIN.",
    sourceIds: ["irs-ein", "sba-register"],
  },
  {
    id: "payroll",
    district: "setup",
    number: 12,
    title: "Employees, Payroll, and Grown-Up Help",
    icon: "👷",
    bigQuestion: "What changes when a business has workers?",
    grownWord: "Payroll",
    wordMeaning: "The system for paying workers and handling required tax records.",
    reading: [
      "A tiny pretend shop may only have one learner. A real business can grow and hire workers.",
      "When workers are involved, grown-ups must handle pay, records, forms, and tax rules carefully.",
      "A wise founder knows when to ask for help from a parent, accountant, attorney, payroll provider, or official office.",
    ],
    kidExample: "If your shop grows from one table to a busy store, the record book becomes even more important.",
    tryIt: "Name one grown-up helper a business owner might ask for help.",
    prompt: "A business should ask for grown-up help when...",
    parentNote: "The IRS says employers must handle worker classification, EINs, withholding, depositing, reporting, paying employment taxes, and records.",
    sourceIds: ["irs-employees", "irs-records"],
  },
];

const SOURCES = {
  "sba-plan": {
    label: "SBA Plan Your Business",
    url: "https://www.sba.gov/business-guide/plan-your-business",
    note: "Business planning, market research, funding, and startup guidance.",
  },
  "sba-business-plan": {
    label: "SBA Write Your Business Plan",
    url: "https://www.sba.gov/business-guide/plan-your-business/write-your-business-plan",
    note: "Business plans as roadmaps for structure, running, and growth.",
  },
  "sba-market": {
    label: "SBA Market Research and Competitive Analysis",
    url: "https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis",
    note: "Demand, market size, saturation, pricing, direct research, and competition.",
  },
  "sba-structure": {
    label: "SBA Choose a Business Structure",
    url: "https://www.sba.gov/business-guide/launch-your-business/choose-business-structure",
    note: "High-level structure differences and why structure matters.",
  },
  "sba-register": {
    label: "SBA Register Your Business",
    url: "https://www.sba.gov/business-guide/launch-your-business/register-your-business",
    note: "General registration concepts and state/local variation.",
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

const GROWTH_PATH = [
  ["Main Street", "Learn the first business words"],
  ["Whole Town", "Plan a simple shop"],
  ["County Route", "Test customers and costs"],
  ["State Map", "Learn setup and records"],
  ["U.S. Map", "Study bigger business systems"],
  ["World Shipping", "Optional future stage"],
];

const DEFAULT_STATE = { profiles: {}, activeProfileId: "" };
let memoryStore = null;
let appState = loadRootState();
let view = "welcome";
let activeChapterId = null;
let selectedDistrict = "";
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

function hasSharedProfiles() {
  return !!(window.ProfileAPI && window.SaveStore && window.SaveStore.getItem && window.SaveStore.setItem);
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
  appState = normalizeRoot(appState);
  if (hasSharedProfiles()) return;
  const storage = safeLocalStorage();
  if (storage) {
    storage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(appState));
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
    selectedBusiness: profile.selectedBusiness || "",
    customBusiness: profile.customBusiness || {},
    completedBuildings: profile.completedBuildings || [],
    notebook: profile.notebook || {},
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

function normalizeProfile(profile, id) {
  const legacyNotebook = profile?.notebook || {};
  return {
    id,
    name: cleanName(profile?.name || DEFAULT_PROFILE_NAME),
    selectedBusiness: profile?.selectedBusiness || "",
    customBusiness: profile?.customBusiness || {},
    completedBuildings: Array.isArray(profile?.completedBuildings) ? profile.completedBuildings.filter((id) => getChapter(id)) : [],
    notebook: legacyNotebook,
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
          <div class="brand-name">Business Basics Atlas</div>
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
  if (view === "map") html += renderAtlas();
  if (view === "notebook") html += renderNotebook();
  if (view === "parent") html += renderParentGuide();
  if (view === "growth") html += renderGrowthPath();
  if (view === "sources") html += renderSources();
  app.innerHTML = html + footer();
  wireEvents();
  if (activeChapterId) renderChapterModal(activeChapterId);
}

function footer() {
  return `
    <footer class="footer-note">
      <strong>SAVE Learning Co.</strong> · © 2026 SAVE Learning Co. All rights reserved.
      <br />Main Street Press visuals are original CSS/SVG-style art. No stock photos are used in this v1 app.
    </footer>
  `;
}

function renderWelcome() {
  const profile = activeProfile();
  const learnerLine = profile ? `Welcome back, ${escapeHtml(profile.name)}.` : "Choose a learner to begin.";
  return `
    <main class="hero">
      <section class="hero-card">
        <span class="kicker">Small Town Business · Main Street Press</span>
        <h1>Business Basics Atlas</h1>
        <p class="hero-copy">${learnerLine} Explore a cozy Main Street map and learn how real businesses work, one short chapter at a time.</p>
        <div class="hero-actions">
          <button class="primary-button" data-action="start" data-testid="button-start">Start Learning</button>
          <button class="secondary-button" data-action="profiles" data-testid="button-profiles">Choose Learner</button>
          <button class="secondary-button" data-action="parent" data-testid="button-parent-welcome">Parent Guide</button>
        </div>
        <div class="pull-note">
          This is not legal, tax, payroll, or accounting advice. It is a child-friendly map of business ideas for parent-guided learning.
        </div>
      </section>
      <section class="town-preview" aria-label="Illustrated Main Street preview">
        <div class="preview-building b1"><span>IDEA</span></div>
        <div class="preview-building b2"><span>PLAN</span></div>
        <div class="preview-building b3"><span>RECORD</span></div>
        <div class="coin-stack" aria-hidden="true"><div class="coin">?</div><div class="coin">✓</div><div class="coin">✎</div></div>
      </section>
    </main>
  `;
}

function renderProfiles() {
  if (hasSharedProfiles()) return renderSharedProfiles();
  const profiles = Object.values(appState.profiles);
  return `
    <main class="screen">
      <section class="screen-header">
        <span class="kicker">Learner Profiles</span>
        <h1>Who is learning today?</h1>
        <p>Each child gets a separate Founder Notebook.</p>
      </section>
      <section class="grid">
        ${profiles.map((profile) => `
          <button class="business-card" data-profile-id="${profile.id}" data-testid="button-profile-${profile.id}">
            <div class="business-icon">👤</div>
            <h3>${escapeHtml(profile.name)}</h3>
            <p>${visitedCount(profile)} chapters visited · ${notebookCount(profile)} notes</p>
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
        <h1>Who is learning today?</h1>
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
              <p>${visitedCount(progress)} chapters visited · ${notebookCount(progress)} notes</p>
            </button>
          `;
        }).join("")}
      </section>
    </main>
  `;
}

function renderBusinessPicker() {
  const profile = activeProfile();
  return `
    <main class="screen">
      <section class="screen-header">
        <span class="kicker">${escapeHtml(profile.name)}'s Founder Notebook</span>
        <h1>Pick an example business.</h1>
        <p>The chapters use this business for examples. You can use a preset or create your own shop.</p>
      </section>
      <section class="business-grid">
        ${PRESET_BUSINESSES.map(businessCard).join("")}
        <button class="business-card custom-card" data-action="creator" data-testid="button-custom-shop">
          <div class="business-icon">✏️</div>
          <h3>Create My Own Shop</h3>
          <p>Cookie Cart, Bracelet Booth, Lawn Helper, Bookmark Shop, Garden Stand, Birthday Card Table...</p>
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
      <div class="ledger-row"><span>Example offer</span><strong>${escapeHtml(business.product)}</strong></div>
    </button>
  `;
}

function renderCreator() {
  return `
    <main class="screen">
      <section class="creator-card">
        <span class="kicker">Create My Own Shop</span>
        <h1>Design a simple business example.</h1>
        <form data-creator-form class="form-grid">
          <label>Shop name <input name="shopName" required maxlength="36" placeholder="Bookmark Shop" data-testid="input-shop-name" /></label>
          <label>Shop type <input name="shopType" required maxlength="36" placeholder="Market booth" data-testid="input-shop-type" /></label>
          <label>Product or service <input name="product" required maxlength="48" placeholder="Handmade bookmarks" data-testid="input-product" /></label>
          <label>Supply 1 <input name="supply1" required maxlength="24" placeholder="paper" /></label>
          <label>Supply 2 <input name="supply2" required maxlength="24" placeholder="markers" /></label>
          <label>Supply 3 <input name="supply3" required maxlength="24" placeholder="ribbon" /></label>
          <label>Example price <input name="price" type="number" min="1" max="99" value="2" data-testid="input-price" /></label>
          <div class="safe-icons" role="group" aria-label="Choose a shop icon">
            ${SAFE_ICONS.map((icon) => `<button type="button" class="icon-choice ${icon === tempIcon ? "selected" : ""}" data-icon="${icon}" data-testid="button-icon-${icon}">${icon}</button>`).join("")}
          </div>
          <button class="primary-button" type="submit" data-testid="button-save-custom-shop">Save Shop</button>
        </form>
      </section>
    </main>
  `;
}

function renderAtlas() {
  const profile = activeProfile();
  const business = currentBusiness(profile);
  const active = selectedDistrict || "idea";
  return `
    <main class="screen">
      <section class="screen-header">
        <div>
          <span class="kicker">Business Basics Atlas</span>
          <h1>${escapeHtml(business.title)} Main Street</h1>
          <p>Choose a district, then open a chapter. No coins. No locked levels. Just a clear map of how business works.</p>
          <div class="button-row atlas-tools">
            <button class="secondary-button" data-action="notebook" data-testid="button-notebook">Founder Notebook</button>
            <button class="secondary-button" data-action="parent" data-testid="button-parent">Parent Guide</button>
            <button class="secondary-button" data-action="sources" data-testid="button-sources">Sources</button>
            <button class="secondary-button" data-action="business" data-testid="button-change-business">Change Business</button>
          </div>
        </div>
        ${statusStrip(profile)}
      </section>
      <section class="atlas-layout">
        <div class="town-map-card">
          <div class="district-road" aria-hidden="true"></div>
          ${DISTRICTS.map((district, index) => `
            <button class="district-card district-${index} ${active === district.id ? "selected" : ""}" data-district="${district.id}" data-testid="button-district-${district.id}">
              <span class="district-icon">${district.icon}</span>
              <strong>${district.sign}</strong>
              <small>${district.name}</small>
            </button>
          `).join("")}
        </div>
        <aside class="panel">
          <span class="kicker">${escapeHtml(getDistrict(active).name)}</span>
          <h2>${escapeHtml(getDistrict(active).sign)}</h2>
          <p>${escapeHtml(getDistrict(active).blurb)}</p>
          <div class="chapter-list">
            ${chaptersFor(active).map((chapter) => chapterCard(profile, chapter)).join("")}
          </div>
        </aside>
      </section>
    </main>
  `;
}

function chapterCard(profile, chapter) {
  const done = profile.completedBuildings.includes(chapter.id);
  return `
    <button class="chapter-card ${done ? "done" : ""}" data-chapter="${chapter.id}" data-testid="button-chapter-${chapter.id}">
      <span class="chapter-number">${chapter.number}</span>
      <span class="chapter-icon">${chapter.icon}</span>
      <span>
        <strong>${escapeHtml(chapter.title)}</strong>
        <small>${escapeHtml(chapter.bigQuestion)}</small>
      </span>
      <b>${done ? "Saved" : "Open"}</b>
    </button>
  `;
}

function statusStrip(profile) {
  return `
    <div class="status-strip" data-testid="status-strip">
      <span class="status-chip" data-testid="text-progress">📚 ${visitedCount(profile)}/${CHAPTERS.length} chapters visited</span>
      <span class="status-chip" data-testid="text-notes">✎ ${notebookCount(profile)} notebook notes</span>
    </div>
  `;
}

function renderChapterModal(id) {
  const profile = activeProfile();
  const chapter = getChapter(id);
  if (!profile || !chapter) return;
  const business = currentBusiness(profile) || PRESET_BUSINESSES[0];
  const done = profile.completedBuildings.includes(id);
  const note = profile.notebook[id] || "";
  const modal = document.createElement("div");
  modal.className = "modal-backdrop";
  modal.dataset.modal = "chapter";
  modal.innerHTML = `
    <article class="modal-card chapter-modal" role="dialog" aria-modal="true" aria-labelledby="chapter-title" data-testid="modal-chapter">
      <header class="modal-header">
        <div>
          <span class="mission-tag">${escapeHtml(getDistrict(chapter.district).name)} · Chapter ${chapter.number}</span>
          <h2 id="chapter-title">${chapter.icon} ${escapeHtml(chapter.title)}</h2>
          <p>${escapeHtml(chapter.bigQuestion)}</p>
        </div>
        <button class="icon-button" data-action="close-chapter" aria-label="Close chapter" data-testid="button-close-chapter">✕</button>
      </header>
      <div class="chapter-spread">
        <section class="feature-page">
          <span class="kicker">Read Together</span>
          <h3 class="feature-headline">${escapeHtml(chapter.bigQuestion)}</h3>
          ${chapter.reading.map((p) => `<p>${withBusiness(p, business)}</p>`).join("")}
          <div class="ledger-definition">
            <strong>Grown-up business word</strong>
            <dl>
              <div><dt>${escapeHtml(chapter.grownWord)}</dt><dd>${escapeHtml(chapter.wordMeaning)}</dd></div>
            </dl>
          </div>
          <div class="pull-note"><strong>Example:</strong> ${withBusiness(chapter.kidExample, business)}</div>
        </section>
        <section class="activity-zone">
          <div class="activity-card">
            <span class="kicker">Try It</span>
            <h3>${escapeHtml(chapter.tryIt)}</h3>
            ${renderChapterActivity(chapter, business)}
          </div>
          <div class="activity-card receipt-card">
            <span class="kicker">Founder Notebook</span>
            <h3>${escapeHtml(chapter.prompt)}</h3>
            <textarea data-notebook-field="${chapter.id}" data-testid="textarea-chapter-note" placeholder="Write or dictate one short answer...">${escapeHtml(note)}</textarea>
          </div>
          <div class="activity-card parent-mini-guide">
            <span class="kicker">Parent Note</span>
            <p>${escapeHtml(chapter.parentNote)}</p>
          </div>
        </section>
      </div>
      <div class="mission-actions">
        <button class="primary-button" data-action="save-chapter" data-chapter-save="${chapter.id}" data-testid="button-save-chapter">${done ? "Update Notebook" : "Save Chapter"}</button>
        <button class="secondary-button" data-action="notebook" data-testid="button-open-notebook-chapter">Open Notebook</button>
      </div>
    </article>
  `;
  document.body.appendChild(modal);
  requestAnimationFrame(() => modal.classList.add("show"));
  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.closest("[data-action='close-chapter']")) closeChapterModal();
  });
}

function renderChapterActivity(chapter, business) {
  if (chapter.id === "offer") {
    return `
      <div class="choice-list">
        <button class="choice-card" data-quick-note="My offer is a product because it is something a customer can hold.">Product</button>
        <button class="choice-card" data-quick-note="My offer is a service because it is a helpful job.">Service</button>
        <button class="choice-card" data-quick-note="My offer is both a product and a service.">Both</button>
      </div>
    `;
  }
  if (chapter.id === "cost") {
    return `<div class="ledger-list">${business.supplies.map((s) => `<div class="ledger-row"><span>${escapeHtml(s)}</span><strong>starter supply</strong></div>`).join("")}</div>`;
  }
  if (chapter.id === "money") {
    return `<div class="math-strip"><strong>8 in</strong><span>−</span><strong>5 out</strong><span>=</span><strong>3 left</strong></div>`;
  }
  if (chapter.id === "structure") {
    return `
      <div class="ledger-list">
        <div class="ledger-row"><span>Sole proprietor</span><strong>one owner</strong></div>
        <div class="ledger-row"><span>LLC</span><strong>state paperwork</strong></div>
        <div class="ledger-row"><span>Corporation</span><strong>formal company rules</strong></div>
      </div>
    `;
  }
  if (chapter.id === "ein") {
    return `<p class="status-chip">Safe answer: ask a grown-up to check official federal, state, and local rules.</p>`;
  }
  return `<p>Say your answer out loud first. Then write one short sentence in the Founder Notebook.</p>`;
}

function closeChapterModal() {
  const modal = document.querySelector("[data-modal='chapter']");
  if (modal) modal.remove();
  activeChapterId = null;
}

function saveChapter(id) {
  const profile = activeProfile();
  const chapter = getChapter(id);
  if (!profile || !chapter) return;
  const textarea = document.querySelector(`[data-notebook-field="${CSS.escape(id)}"]`);
  const value = textarea ? textarea.value.trim() : "";
  if (value) profile.notebook[id] = value;
  if (!profile.completedBuildings.includes(id)) profile.completedBuildings.push(id);
  setProfile(profile);
  showToast(`${chapter.title} saved to the Founder Notebook.`);
  closeChapterModal();
  render();
}

function renderNotebook() {
  const profile = activeProfile();
  const business = currentBusiness(profile) || { title: "Not chosen yet", type: "Not chosen", product: "Not chosen" };
  const entries = CHAPTERS.filter((chapter) => String(profile.notebook[chapter.id] || "").trim());
  return `
    <main class="screen">
      <section class="screen-header">
        <span class="kicker">Founder Notebook</span>
        <h1>${escapeHtml(profile.name)}'s Founder Notebook</h1>
        <p>A record of chapter notes, business ideas, and parent-guided discussion.</p>
      </section>
      <section class="notebook-grid">
        <div class="notebook-page">
          <span class="kicker">Business Example</span>
          <div class="ledger-list">
            <div class="ledger-row"><span>Business</span><strong>${escapeHtml(business.title)}</strong></div>
            <div class="ledger-row"><span>Type</span><strong>${escapeHtml(business.type)}</strong></div>
            <div class="ledger-row"><span>Offer</span><strong>${escapeHtml(business.product)}</strong></div>
            <div class="ledger-row"><span>Chapters visited</span><strong>${visitedCount(profile)} of ${CHAPTERS.length}</strong></div>
          </div>
        </div>
        <div class="notebook-page">
          <span class="kicker">Chapter Map</span>
          <div class="ledger-list">${CHAPTERS.map((chapter) => `<span class="badge-chip">${profile.completedBuildings.includes(chapter.id) ? "✓" : "○"} ${chapter.number}. ${escapeHtml(chapter.title)}</span>`).join("")}</div>
        </div>
      </section>
      <section class="notebook-page">
        <h2>Saved Chapter Answers</h2>
        <div class="ledger-list">
          ${entries.length ? entries.map((chapter) => `<div class="notebook-entry"><strong>${chapter.number}. ${escapeHtml(chapter.title)}</strong><p>${escapeHtml(profile.notebook[chapter.id])}</p></div>`).join("") : `<div class="empty-note">Notebook answers will appear here after a chapter is saved.</div>`}
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
        <h1>How to teach Business Basics Atlas</h1>
        <p>This app teaches the first ideas of business through a guided Main Street map, short readings, and Founder Notebook prompts.</p>
      </section>
      <section class="parent-card">
        <h2>What this teaches</h2>
        <p>SAVE Small Town Business teaches children the first ideas of entrepreneurship through guided lessons: finding a need, creating a product or service, testing an idea, planning costs, setting prices, tracking money in and money out, keeping records, learning setup words, and knowing when grown-ups need expert help.</p>
        <div class="pull-note">This workbook is for learning only. It is not legal, tax, payroll, or accounting advice. A real business owner should ask a qualified professional and check federal, state, and local rules.</div>
      </section>
      <section class="grid">
        ${DISTRICTS.map((district) => `
          <div class="parent-card">
            <span class="kicker">${district.icon} ${escapeHtml(district.name)}</span>
            <h2>${escapeHtml(district.sign)}</h2>
            <p>${escapeHtml(district.blurb)}</p>
            <div class="ledger-list">${chaptersFor(district.id).map((c) => `<div class="ledger-row"><span>${c.number}. ${escapeHtml(c.title)}</span><strong>${escapeHtml(c.grownWord)}</strong></div>`).join("")}</div>
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
        <h1>The business map can grow later.</h1>
        <p>V1 focuses on Business Basics. Future volumes can grow from a first Main Street idea to a bigger business map.</p>
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
        <h1>Business Basics source notes</h1>
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
        <h2>Future photo policy</h2>
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
        const profile = activeProfile();
        view = !profile ? "profiles" : currentBusiness(profile) ? "map" : "business";
      }
      if (action === "profiles") view = "profiles";
      if (action === "business") view = "business";
      if (action === "creator") view = "creator";
      if (action === "map") view = "map";
      if (action === "notebook") view = "notebook";
      if (action === "parent") view = "parent";
      if (action === "growth") view = "growth";
      if (action === "sources") view = "sources";
      if (action !== "close-chapter") {
        closeChapterModal();
        render();
      }
    });
  });

  document.querySelector("[data-profile-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    createProfile(form.get("profileName"));
    view = "business";
    render();
  });

  document.querySelectorAll("[data-profile-id]").forEach((button) => {
    button.addEventListener("click", () => {
      appState.activeProfileId = button.dataset.profileId;
      saveRootState();
      view = currentBusiness(activeProfile()) ? "map" : "business";
      render();
    });
  });

  document.querySelectorAll("[data-shared-profile-id]").forEach((button) => {
    button.addEventListener("click", () => {
      window.ProfileAPI.setActive?.(button.dataset.sharedProfileId);
      view = currentBusiness(activeProfile()) ? "map" : "business";
      render();
    });
  });

  document.querySelectorAll("[data-business]").forEach((button) => {
    button.addEventListener("click", () => {
      const profile = activeProfile();
      profile.selectedBusiness = button.dataset.business;
      profile.businessName = "";
      setProfile(profile);
      selectedDistrict = "idea";
      view = "map";
      render();
    });
  });

  document.querySelector("[data-creator-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const profile = activeProfile();
    const shopName = cleanName(form.get("shopName"));
    profile.selectedBusiness = "custom";
    profile.businessName = shopName;
    profile.customBusiness = {
      shopName,
      shopType: cleanName(form.get("shopType")),
      product: cleanName(form.get("product")),
      supplies: [form.get("supply1"), form.get("supply2"), form.get("supply3")].map(cleanName),
      icon: tempIcon,
      price: Math.max(1, Number(form.get("price")) || 1),
    };
    setProfile(profile);
    selectedDistrict = "idea";
    view = "map";
    render();
  });

  document.querySelectorAll("[data-icon]").forEach((button) => {
    button.addEventListener("click", () => {
      tempIcon = button.dataset.icon;
      render();
    });
  });

  document.querySelectorAll("[data-district]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedDistrict = button.dataset.district;
      render();
    });
  });

  document.querySelectorAll("[data-chapter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeChapterId = button.dataset.chapter;
      renderChapterModal(activeChapterId);
    });
  });
}

document.addEventListener("click", (event) => {
  const quick = event.target.closest("[data-quick-note]");
  if (quick) {
    const textarea = document.querySelector("[data-testid='textarea-chapter-note']");
    if (textarea) textarea.value = quick.dataset.quickNote || "";
    document.querySelectorAll("[data-quick-note]").forEach((el) => el.classList.remove("selected"));
    quick.classList.add("selected");
  }
  const save = event.target.closest("[data-chapter-save]");
  if (save) saveChapter(save.dataset.chapterSave);
});

function chaptersFor(districtId) {
  return CHAPTERS.filter((chapter) => chapter.district === districtId);
}

function getDistrict(id) {
  return DISTRICTS.find((district) => district.id === id) || DISTRICTS[0];
}

function getChapter(id) {
  return CHAPTERS.find((chapter) => chapter.id === id);
}

function visitedCount(profile) {
  return (profile?.completedBuildings || []).filter((id) => getChapter(id)).length;
}

function notebookCount(profile) {
  return Object.values(profile?.notebook || {}).filter((value) => String(value || "").trim()).length;
}

function withBusiness(text, business) {
  return escapeHtml(text)
    .replaceAll("{business}", escapeHtml(business.title))
    .replaceAll("{product}", escapeHtml(business.product))
    .replaceAll("{type}", escapeHtml(business.type));
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

window.addEventListener("load", () => {
  if (hasSharedProfiles()) {
    window.ProfileAPI.onChange?.(() => {
      activeChapterId = null;
      view = currentBusiness(activeProfile()) ? "map" : "business";
      render();
    });
    if (!window.ProfileAPI.getActive?.()) {
      view = "profiles";
      window.ProfileAPI.openPicker?.({ allowClose: true });
    }
  } else if (!activeProfile()) {
    view = "welcome";
  }
  render();
});
