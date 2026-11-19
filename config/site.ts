/**
 * ALL editable website content lives in this file.
 * Search for "REPLACE" / placeholder values in CONTACT and swap in your real details.
 */

export const OWNER = {
  brand: "Neovia AI",
  name: "Aastha Agnihotri", // founder
  tagline: "AI chatbots, WhatsApp automation and websites for local businesses",
  city: "Mumbai, India",
  degree: "B.Tech CSE (AI & ML)",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://neoviaai.in",
};

export const CONTACT = {
  phone: "+918691969772",
  whatsapp: "918691969772", // country code, no +
  email: "aasthaagnihotri979@gmail.com",
  bookingUrl: "/book-meeting", // page with the built-in meeting calendar. Empty = "Book a call" is hidden, WhatsApp is used.
  demoVideoUrl: "", // REPLACE with a ~30 second video (mp4 / YouTube embed). Empty = placeholder shown.
};

/** Meeting calendar (page /book-meeting). Times are India time. Change days and hours here. */
export const MEETING = {
  timezone: "Asia/Kolkata",
  weekdays: [1, 2, 3, 4, 5, 6] as readonly number[], // 0 = Sunday ... 6 = Saturday
  start: "10:00",
  end: "18:00",
  durationMin: 30,
  advanceDays: 30, // how far ahead people can book
  leadMinutes: 120, // earliest booking is this long from now
  topics: ["See a demo", "Pricing and packages", "A custom project", "Something else"],
  modes: ["Google Meet video call", "Phone call", "WhatsApp video call"],
};

/** Neo, the website chat assistant (see lib/neo-prompt.ts for its instructions). */
export const NEO = {
  name: "Neo",
  // Which AI answers: NEO_PROVIDER=openai (GPT) or anthropic (Claude). Unset = OpenAI if only OPENAI_API_KEY exists, else Anthropic.
  openaiModel: process.env.OPENAI_MODEL || "gpt-4o-mini",
  // Claude model. Default is the most capable; for lower running cost set NEO_MODEL=claude-haiku-5-5 or claude-sonnet-5-5.
  model: process.env.NEO_MODEL || "claude-opus-5-5",
};

export const PILOT_OFFER = {
  enabled: false,
  text: "Limited pilot slots: discounted setup for my first few clients",
};

export type Package = {
  name: string;
  range: string;
  note: string;
  includes: string;
};

export const PACKAGES: Package[] = [
  {
    name: "AI Starter Solutions",
    range: "₹15,000 – ₹25,000",
    note: "Introductory price",
    includes: "Basic chatbot, FAQ assistant, simple workflow automation and small-business AI integrations.",
  },
  {
    name: "Business Automation",
    range: "₹30,000 – ₹60,000",
    note: "Typical project range",
    includes: "Lead management, CRM automation, customer-support workflows, API integrations and multi-step automation.",
  },
  {
    name: "Custom AI Development",
    range: "₹60,000 – ₹1,50,000",
    note: "Typical project range",
    includes: "RAG knowledge assistants, custom AI dashboards, document intelligence and multi-agent prototypes.",
  },
  {
    name: "Enterprise AI & Agentic Systems",
    range: "₹1,50,000 – ₹3,00,000+",
    note: "Custom quote for larger scopes",
    includes: "Complex multi-agent systems, enterprise integrations and customised AI platforms.",
  },
];

/** 0 = off. Otherwise 1–4 marks that package as "Most popular". */
export const highlightPackage = 0;

export const CARE_PLANS = [
  { name: "Care", price: "₹3,600/mo" },
  { name: "Growth", price: "₹7,200/mo" },
  { name: "Advanced", price: "₹9,900+/mo" },
];

export const PRICING_FOOTNOTE =
  "Ranges are typical starting points; your final quote depends on scope. GST extra if applicable. Domain, hosting, WhatsApp message fees and AI usage beyond included limits are paid at actuals.";

export type Demo = {
  slug: string;
  title: string;
  url: string;
  industry: string;
  outcomeLine: string;
  description: string;
  features: [string, string, string];
  image: string; // base path in /public/demos (without -desktop / -mobile.webp)
  /** Setup price in ₹ used by the "Book now" button. null = customer enters the amount you agreed on WhatsApp. */
  price: number | null;
};

// Descriptions are written from what each live demo actually shows.
export const DEMOS: Demo[] = [
  {
    slug: "whatsapp-followup",
    title: "WhatsApp Follow-up Automation",
    url: "https://wpfollowup.vercel.app/",
    industry: "Dental studio",
    outcomeLine: "Every enquiry gets a reply in seconds, and a polite follow-up if they go quiet.",
    description:
      "A chat simulator for a sample dental studio: a new enquiry gets an instant friendly reply, then gentle follow-ups, and you get an alert when a lead says yes.",
    features: [
      "Instant reply plus Day 1, 3 and 7 follow-ups that stop when the customer replies",
      "Hot-lead alert so you know exactly who to call",
      "STOP / opt-out is always respected",
    ],
    image: "/demos/whatsapp-followup",
    price: 9900, // as shown on the demo page (one-time setup)
  },
  {
    slug: "admission-assistant",
    title: "AI Admission Assistant",
    url: "https://bright-future-classes-alpha.vercel.app",
    industry: "Coaching class",
    outcomeLine: "Parents get answers at 2 am, and you only call the serious leads.",
    description:
      "A chatbot for a sample coaching class that answers in English and Hinglish, only from the class’s own fees and batches, and shows the owner each lead live.",
    features: [
      "Answers in English and Hinglish from your own fees and batch details",
      "Captures the parent’s phone number during the chat",
      "Scores each lead from 0–100 so hot leads stand out on your screen",
    ],
    image: "/demos/admission-assistant",
    price: 22500, // as shown on the demo page (one-time)
  },
  {
    slug: "clinic-website",
    title: "Clinic Website",
    url: "https://smile-craft-next-ten.vercel.app",
    industry: "Dental clinic",
    outcomeLine: "Patients see your treatments and prices, then book a slot in under a minute.",
    description:
      "A clean website for a sample dental clinic in Fort, Mumbai, with treatments, doctor profile, FAQs, opening hours and an online appointment form.",
    features: [
      "Treatment list with starting prices and a “Book this” button",
      "Pick a day and time slot online, with confirmation on WhatsApp",
      "Doctor profile, FAQs, map-style visit details and opening hours",
    ],
    image: "/demos/clinic-website",
    price: null, // REPLACE with your price in ₹ to switch on automatic amounts
  },
  {
    slug: "ca-dashboard",
    title: "CA Client Dashboard",
    url: "https://cademo-five.vercel.app",
    industry: "CA firm",
    outcomeLine: "Follow-ups, filings and documents in one place instead of scattered sheets.",
    description:
      "A client dashboard for a sample CA firm that shows overdue follow-ups and due filings the moment you open it.",
    features: [
      "See overdue client calls and due filings as soon as you log in",
      "Drag clients through Docs pending → In progress → Review → Filed",
      "Owner, Staff and View-only roles, so fees stay hidden from the wrong people",
    ],
    image: "/demos/ca-dashboard",
    price: null, // REPLACE with your price in ₹ to switch on automatic amounts
  },
  {
    slug: "localrank",
    title: "LocalRank",
    url: "https://localrank-three.vercel.app/",
    industry: "Local businesses",
    outcomeLine: "See how you show up on Google locally, and get a monthly report on what improved.",
    description:
      "A local-search tool shown on a sample pathology lab: a free audit, a before / after view of the online presence, and a monthly report, plus a website with online booking.",
    features: [
      "Free audit that shows where a local business is losing enquiries",
      "Before / after comparison of the online presence",
      "Monthly report plus a website with online booking",
    ],
    image: "/demos/localrank",
    price: null, // custom quote: customer enters the amount agreed on WhatsApp
  },
  {
    slug: "reviewboost",
    title: "ReviewBoost",
    url: "https://reviewboost-rust.vercel.app/",
    industry: "Restaurants and local shops",
    outcomeLine: "Every happy customer gets a one-tap link to leave a Google review.",
    description:
      "A Google review automation for a sample restaurant: staff taps Send, the customer gets a WhatsApp message with a one-tap link to the Google review box, and the owner watches reviews grow on one screen.",
    features: [
      "WhatsApp thank-you after the visit, plus one gentle reminder that stops by itself",
      "Owner dashboard with message funnel, review count and staff leaderboard",
      "AI reply drafts for new reviews and a printable QR standee for tables",
    ],
    image: "/demos/reviewboost",
    price: null, // custom: customer enters the amount agreed on WhatsApp
  },
  {
    slug: "showup",
    title: "ShowUp",
    url: "https://show-up-health.vercel.app/login",
    industry: "Dental clinic",
    outcomeLine: "A simple front-desk app for a clinic, with separate views for reception and the owner.",
    description:
      "A clinic app shown on a sample dental clinic (SmileCare): reception and the owner each sign in to their own view, starting from a Today screen.",
    features: [
      "Separate sign-ins for reception and the clinic owner",
      "A Today screen for the front desk",
      "Shown with a sample dental clinic and sample data",
    ],
    image: "/demos/showup",
    price: null, // custom: customer enters the amount agreed on WhatsApp
  },
  {
    slug: "slotpay",
    title: "SlotPay",
    url: "https://slotpay.vercel.app",
    industry: "Salon and spa",
    outcomeLine: "Customers book a slot and pay a small advance online, so fewer no-shows and no phone calls.",
    description:
      "An online booking site for a sample salon and spa: the customer picks a service, a stylist and a time, pays a small advance, and gets confirmation and reminders on WhatsApp.",
    features: [
      "Pick a service, stylist and time with live availability",
      "Pay a small advance (₹100–₹200) by UPI, card or netbanking; the slot is held while paying",
      "WhatsApp confirmation and reminders with one-tap Reschedule or Cancel",
    ],
    image: "/demos/slotpay",
    price: null, // custom: customer enters the amount agreed on WhatsApp
  },
  {
    slug: "billease",
    title: "BillEase",
    url: "https://bill-ease.vercel.app",
    industry: "Shops and traders",
    outcomeLine: "A correct GST invoice in under a minute, sent on WhatsApp, with payments tracked.",
    description:
      "A GST billing app shown with a sample electrical business: create an invoice, send it on WhatsApp with a UPI QR, track who has paid, and hand the CA a clean monthly GST summary.",
    features: [
      "GST invoice in under a minute, sent on WhatsApp with a UPI QR",
      "Dashboard with sales, receivables, overdue invoices and ageing",
      "Separate CA (white-label) view with a monthly GST summary",
    ],
    image: "/demos/billease",
    price: null, // custom: customer enters the amount agreed on WhatsApp
  },
  {
    slug: "callcatch",
    title: "CallCatch",
    url: "https://call-catch-five.vercel.app",
    industry: "Any local business",
    outcomeLine: "Every call gets answered, even at 10 pm on a Sunday, and the lead lands on WhatsApp.",
    description:
      "An AI call assistant shown on a fictional business: Riya answers calls in Hindi, English and Hinglish, captures the lead, books a callback and sends everything to WhatsApp.",
    features: [
      "Answers calls in Hindi, English and Hinglish, day or night",
      "Captures the lead and books a callback",
      "Sends everything to WhatsApp, with a dashboard and missed-call recovery",
    ],
    image: "/demos/callcatch",
    price: null, // custom: customer enters the amount agreed on WhatsApp
  },
  {
    slug: "postpilot",
    title: "PostPilot",
    url: "https://post-pilot-khaki.vercel.app",
    industry: "Event decor, cafés and gyms",
    outcomeLine: "A month of on-brand social posts, approved on WhatsApp and published on time.",
    description:
      "A social media tool shown on three sample businesses (an event decorator, a café and a gym): it plans a month of posts for Instagram and Facebook, you approve them on WhatsApp, and they go out on time.",
    features: [
      "A month of on-brand posts planned for Instagram and Facebook",
      "Approve posts on WhatsApp",
      "Published on time, with a preview for each sample business",
    ],
    image: "/demos/postpilot",
    price: null, // custom: customer enters the amount agreed on WhatsApp
  },
  {
    slug: "leadlaunch",
    title: "LeadLaunch",
    url: "https://lead-launch-k5h1.vercel.app",
    industry: "Real estate",
    outcomeLine: "Buyers explore the project, unlock the brochure and book a site visit in one place.",
    description:
      "A project landing page shown on a fictional apartment tower in Dombivli East: buyers see 1 and 2 BHK plans in 3D, unlock the brochure with their number, and book a site-visit slot.",
    features: [
      "3D dollhouse and walkthrough of each home, with the full floor plan unlocked after a lead is captured",
      "Brochure and price sheet request that saves the buyer’s name and number",
      "Site-visit booking with live time slots, plus amenities, connectivity and FAQs",
    ],
    image: "/demos/leadlaunch",
    price: null, // custom: customer enters the amount agreed on WhatsApp
  },
  {
    slug: "leadlens",
    title: "LeadLens",
    url: "https://lead-lens-sigma.vercel.app",
    industry: "Any business running ads",
    outcomeLine: "On the 1st of every month, a one-page report on WhatsApp shows what your marketing money did.",
    description:
      "A monthly marketing report shown on a sample business: enquiries from Instagram ads, Google, calls, website and WhatsApp come into one table, and a one-page report plus a live dashboard land on WhatsApp.",
    features: [
      "All lead sources in one table, with duplicate enquiries counted once",
      "Enquiries, reply time, funnel and cost per lead, each traceable to its rows",
      "A one-page report on WhatsApp on the 1st; reply WON or LOST to keep it accurate",
    ],
    image: "/demos/leadlens",
    price: null, // custom: customer enters the amount agreed on WhatsApp
  },
  {
    slug: "agentic-chatbot",
    title: "Agentic AI Chatbot",
    url: "https://nia-vvyo.onrender.com",
    industry: "Any local business",
    outcomeLine: "A chatbot that doesn't just answer: it helps customers book and gets things done.",
    description:
      "Nia, an agentic AI assistant shown on a sample roofing company. It answers questions about prices, inspections and repairs from the business's own details, books a free inspection, adds notes, and you can switch the demo to other business types.",
    features: [
      "Answers questions about prices, repairs and warranty for the business",
      "Takes actions, like booking a free inspection or adding a note for the owner",
      "Switch the demo between business types with one tap",
    ],
    image: "/demos/agentic-chatbot",
    price: null, // custom: customer enters the amount agreed on WhatsApp
  },
];

/** Carousel at the top of the page: everything I build. icon keys map to components/WorkCarousel.tsx */
export const WORKS = [
  { title: "Website", text: "Fast, mobile-friendly sites that turn visitors into enquiries.", icon: "globe" },
  { title: "Chatbot + Lead Capture", text: "A smart assistant that answers questions and saves phone numbers.", icon: "chat" },
  { title: "WhatsApp Automation", text: "Instant replies and polite follow-ups on WhatsApp.", icon: "whatsapp" },
  { title: "Dashboard", text: "Leads, clients and records in one simple place.", icon: "list" },
  { title: "LocalRank", text: "Get found on Google: profile, website and a monthly report.", icon: "globe" },
  { title: "ReviewBoost", text: "More Google reviews: a WhatsApp message with a one-tap review link.", icon: "chat" },
  { title: "ShowUp", text: "A simple front-desk app for clinics: reception and owner views.", icon: "list" },
  { title: "SlotPay", text: "Online booking with a small advance payment and WhatsApp reminders.", icon: "globe" },
  { title: "BillEase", text: "GST invoices on WhatsApp, with payments tracked and a CA summary.", icon: "list" },
  { title: "CallCatch", text: "An AI that answers your calls and sends every lead to WhatsApp.", icon: "phone" },
  { title: "PostPilot", text: "A month of social posts, approved on WhatsApp and published on time.", icon: "spark" },
  { title: "LeadLaunch", text: "A real-estate project page with 3D plans, brochure unlock and site-visit booking.", icon: "globe" },
  { title: "LeadLens", text: "A monthly WhatsApp report on enquiries, reply time and what converted.", icon: "list" },
  { title: "Mobile App", text: "Simple apps for your customers or your team.", icon: "phone" },
  { title: "Agentic AI", text: "AI that handles multi-step work on its own, with your approval.", icon: "spark" },
  { title: "RAG Chatbot", text: "A chatbot that answers from your own documents.", icon: "book" },
  { title: "Agentic AI Chatbot", text: "A chatbot that can also take actions, like booking or updating records.", icon: "bot" },
  { title: "AI Automation", text: "Repetitive business tasks done automatically.", icon: "gear" },
] as const;

/** Hero carousel: one slide per service. demoSlug = real screenshot of a live demo; illustration = generic labelled drawing (no live demo yet). */
export const HERO_SLIDES: ReadonlyArray<{ service: string; demoSlug?: string; illustration?: "mobile" | "agentic" | "rag" | "agentic-chat" | "automation" }> = [
  { service: "Website", demoSlug: "clinic-website" },
  { service: "Chatbot + Lead Capture", demoSlug: "admission-assistant" },
  { service: "WhatsApp Automation", demoSlug: "whatsapp-followup" },
  { service: "Dashboard", demoSlug: "ca-dashboard" },
  { service: "LocalRank", demoSlug: "localrank" },
  { service: "ReviewBoost", demoSlug: "reviewboost" },
  { service: "ShowUp", demoSlug: "showup" },
  { service: "SlotPay", demoSlug: "slotpay" },
  { service: "BillEase", demoSlug: "billease" },
  { service: "CallCatch", demoSlug: "callcatch" },
  { service: "PostPilot", demoSlug: "postpilot" },
  { service: "LeadLaunch", demoSlug: "leadlaunch" },
  { service: "LeadLens", demoSlug: "leadlens" },
  { service: "Mobile App", illustration: "mobile" },
  { service: "Agentic AI", illustration: "agentic" },
  { service: "RAG Chatbot", illustration: "rag" },
  { service: "Agentic AI Chatbot", demoSlug: "agentic-chatbot" },
  { service: "AI Automation", illustration: "automation" },
];

export const DEMO_NOTE = "Free servers can take 30–50 seconds to wake up the first time you open a demo.";

/** The "What is Neovia AI?" explanation section on the home page. Edit the wording here. */
export const WHAT_WE_DO = {
  eyebrow: "What is Neovia AI?",
  title: "An AI agency that answers your customers, books their visits and follows up, so you never miss an enquiry",
  intro:
    "Neovia AI builds and runs the websites, chatbots and WhatsApp automation that local businesses use to get found, reply to every enquiry in seconds, take bookings and payments, and keep customers coming back. You focus on your clinic, class, salon or shop. We handle the technology.",
  agencyTitle: "What does an AI agency actually do?",
  agencyIntro: "Think of us as your outsourced AI and tech team. Here is how a project works:",
  agencySteps: [
    { title: "We understand your business", text: "We find where customers slip away: missed calls, slow replies, no-shows, late payments, few Google reviews." },
    { title: "We build the right tools", text: "A website, a chatbot, WhatsApp follow-ups, a booking and payment page, an AI voice receptionist, or a dashboard, only what you need." },
    { title: "We connect everything", text: "Your tools work with WhatsApp, Google, your calendar and UPI or card payments, so your customers use what they already know." },
    { title: "We run it for you", text: "Hosting, updates, monitoring and a monthly report are included, and we are there when something needs a change." },
  ],
  benefitsTitle: "What you get",
  benefits: [
    "Every enquiry gets a reply in seconds, day or night",
    "More customers found on Google Maps and booked online",
    "Fewer no-shows and fewer forgotten follow-ups",
    "Fees, advances and bills collected on time",
    "Leads saved in one place, with the hot ones highlighted",
    "One clear plan with a setup and a monthly fee, no surprises",
  ],
  forWho: "Made for clinics, labs, coaching classes, salons and spas, gyms, restaurants, real estate, interior designers, CA firms and other local businesses.",
  servicesTitle: "What we build",
  groups: {
    "Websites & Google": "Get found on Google and turn visitors into calls, bookings and 5-star reviews.",
    "Bookings & Payments": "Let customers book, pay and get reminders without phoning you, plus billing and client tracking for CA firms.",
    "Leads & Marketing": "Reply to new enquiries instantly, run social posts and campaigns, and see which marketing actually brings customers.",
    "AI Assistants": "AI that answers questions from your own documents, books slots, and picks up your calls.",
  } as Record<string, string>,
};

export const HERO = {
  headline: "AI chatbots, automation and websites that bring your business customers 24×7",
  sub: "For Mumbai and Kalyan-Dombivli-Thane businesses: clinics, coaching classes, real estate, CAs, interior designers and gyms. See a free demo, no pressure.",
  chips: [OWNER.degree, "Python · FastAPI · LangChain", "Reply within 24 hours"],
};

export const PROBLEMS = [
  { title: "Enquiries missed after hours", text: "A customer messages at 9 pm. Nobody answers. By morning they have called someone else." },
  { title: "Slow replies lose customers", text: "People ask three businesses and go with whoever replies first. Even a few hours is a long wait." },
  { title: "No website or a weak one", text: "When people search for you and find nothing, or something outdated, they assume you are not serious." },
  { title: "Leads scattered everywhere", text: "Some in WhatsApp, some in a notebook, some in your head. Follow-ups get forgotten." },
];

export const COMPARISON = [
  { without: "Enquiries wait until you are free", with: "Every enquiry gets a reply in seconds, day or night" },
  { without: "Follow-ups depend on your memory", with: "Polite follow-ups go out automatically and stop when the customer replies" },
  { without: "Leads in chats, notebooks and sheets", with: "One simple place where every lead is saved" },
  { without: "Same questions answered again and again", with: "A smart assistant answers common questions from your own details" },
  { without: "You find out who is serious after many calls", with: "Hot leads are highlighted so you call them first" },
  { without: "Customers can’t find you online", with: "A clear website with your services, prices and a booking button" },
];

export const INDUSTRIES = [
  {
    name: "Clinics",
    problem: "Patients call when the clinic is closed, and appointment requests get lost between calls and chats.",
    setup: "A website with online booking, instant WhatsApp replies and reminders so patients are not forgotten.",
    demoSlug: "clinic-website",
  },
  {
    name: "Coaching classes",
    problem: "Parents ask about fees and batches late at night, and the same questions come up all day.",
    setup: "A smart assistant that answers from your fees and batches, saves the parent’s number and highlights serious leads.",
    demoSlug: "admission-assistant",
  },
  {
    name: "Real estate",
    problem: "Site-visit enquiries come from many places and many leads go cold after the first call.",
    setup: "Instant replies to new enquiries and follow-up messages that offer a site-visit slot.",
    demoSlug: "whatsapp-followup",
  },
  {
    name: "CAs",
    problem: "Client follow-ups, due dates and documents live in scattered sheets and chats.",
    setup: "A simple client dashboard with due filings, follow-ups and document status in one place.",
    demoSlug: "ca-dashboard",
  },
  {
    name: "Interior designers",
    problem: "Enquiries arrive from Instagram and calls, and no one follows up after the first message.",
    setup: "A quick reply that asks what they need, then gentle follow-ups until they agree to a consultation.",
    demoSlug: "whatsapp-followup",
  },
  {
    name: "Gyms",
    problem: "Free-trial enquiries go quiet after one message, and the front desk is too busy to chase.",
    setup: "Automatic replies with trial-slot offers and follow-ups that stop the moment the person responds.",
    demoSlug: "whatsapp-followup",
  },
];

export const SERVICES = [
  { name: "Website", get: "A fast, mobile-friendly site with your services, prices, map and a booking or enquiry button.", time: "1–2 weeks" },
  { name: "AI Chatbot + Lead Capture", get: "A smart assistant that answers customer questions from your own details and saves their phone number.", time: "1–2 weeks" },
  { name: "WhatsApp Follow-up Automation", get: "Instant replies and polite follow-ups, with an alert when a lead is ready to talk.", time: "1–2 weeks" },
  { name: "Dashboard & Record System", get: "One place to see leads, clients, dues and documents, with roles for your staff.", time: "2–4 weeks" },
  { name: "Mobile App", get: "A simple app for your customers or team, planned together with you before any work starts.", time: "4–8 weeks" },
  { name: "Custom AI / RAG & Agentic systems", get: "Assistants that read your documents and handle multi-step work, scoped in writing first.", time: "Depends on scope" },
];

export const STEPS = [
  { title: "Free 15-min call", text: "Tell me about your business and where enquiries slip away." },
  { title: "Written scope & quote", text: "You get a clear written plan and price before any work starts." },
  { title: "Build & demo", text: "I build it, show you a working version and fix what you want changed." },
  { title: "Launch & support", text: "We go live together, and I stay available to help after." },
];

/** "Book now" asks for this share of the project price up front (your terms: 50% to start). */
export const ADVANCE_PERCENT = 50;

export const PAYMENT_NOTE = "Payment in plain words: 50% to start, 50% on delivery.";

export const ABOUT = {
  bio: "I’m Aastha, founder of Neovia AI and a B.Tech CSE (AI & ML) graduate based in Mumbai. I build chatbots, WhatsApp automation, websites and dashboards for small and mid-size businesses. I talk in plain language, work to a written scope, and test everything before I hand it over.",
  skills: ["Python", "FastAPI", "LangChain", "Next.js", "TypeScript", "Supabase", "WhatsApp automation", "RAG assistants"],
  promises: [
    "I build with AI tools and test everything before delivery.",
    "You own your website and data.",
    "Written scope before any work starts.",
  ],
};

export const AUDIT = {
  title: "Free 15-minute audit",
  text: "Send me your business name; I’ll show you 3 places you’re losing enquiries (free, 15 minutes).",
};

export const FAQ = [
  { q: "What is an AI agency, and what will you do for my business?", a: "An AI agency builds and runs AI tools for businesses that do not have a tech team. For you that means a website, chatbot, WhatsApp automation, bookings and payments, or an AI receptionist, set up for your business, connected to WhatsApp and Google, and looked after every month. See the \"What is Neovia AI?\" section above for the full picture." },
  { q: "How long does a project take?", a: "A website or simple chatbot usually takes 1–2 weeks. Dashboards take 2–4 weeks and bigger systems longer. You get a timeline in writing before we start." },
  { q: "What do I need to give you?", a: "Your business details, services, prices and timings, plus any logo or photos you have. For WhatsApp automation, a business number. I tell you the exact list on the call." },
  { q: "Who owns the website and data?", a: "You do. Your website, your domain and your customer data belong to you." },
  { q: "What if the AI gives a wrong answer?", a: "The assistant is set up to answer only from details you approve, and I test it with real questions before delivery. If it is unsure, it hands the chat to you. If you spot a mistake later, I fix it." },
  { q: "Do you provide support after launch?", a: "Yes. Every project includes help getting started, and optional monthly Care plans cover changes, monitoring and quick fixes." },
  { q: "How does payment work?", a: "50% to start, 50% on delivery. Domain, hosting, WhatsApp message fees and AI usage beyond included limits are paid at actuals." },
];

export const BUSINESS_TYPES = ["Clinic / Dental", "Coaching class", "Real estate", "CA / Accounting", "Interior designer", "Gym / Fitness", "Salon", "Other"];

export const ROI_DEFAULTS = { enquiries: 60, missedPct: 25, value: 5000 };

export const ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID || ""; // Plausible domain; off if unset

/** WhatsApp link with pre-filled message. */
export function waLink(message: string) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WA_MESSAGE = "Hi Neovia AI, I'd like a free demo for my business.";

/** Names of CONTACT fields that still hold placeholder values (checked at build time in next.config.ts). */
export function placeholderFields() {
  const out: string[] = [];
  if (CONTACT.phone.includes("XXXX")) out.push("CONTACT.phone");
  if (CONTACT.whatsapp.includes("XXXX")) out.push("CONTACT.whatsapp");
  if (CONTACT.email === "you@example.com") out.push("CONTACT.email");
  return out;
}

/**
 * Payments. UPI works as is. Card / net banking / all banks / wallets go through Razorpay (see README):
 * set RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET and NEXT_PUBLIC_RAZORPAY_KEY_ID in .env to switch the card button on.
 * Bank transfer details are shown only when filled in.
 */
export const PAYMENTS = {
  upiId: "8691969772@superyes",
  payeeName: "Neovia AI", // shown in UPI apps that read the link (the QR shows the registered bank name)
  qrImage: "/upi-qr.png",
  bank: { accountName: "", accountNumber: "", ifsc: "", bankName: "" }, // REPLACE to show bank-transfer details
  note: "Pay only after we have agreed the written scope and quote. 50% to start, 50% on delivery.",
};

export function upiLink(amount?: number) {
  const p = new URLSearchParams({ pa: PAYMENTS.upiId, pn: PAYMENTS.payeeName, cu: "INR", tn: "Neovia AI project payment" });
  if (amount && amount > 0) p.set("am", String(amount));
  return `upi://pay?${p.toString()}`;
}
