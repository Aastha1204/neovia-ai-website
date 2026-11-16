/** Pricing for every service. Source: neovia-pricing.html (updated 2026-11-15). All prices in INR, excluding 18% GST. */

export type PricingTier = {
  name: string;
  setup: number;
  monthly: number;
  setup_label: string | null;
  monthly_label: string | null;
  popular: boolean;
  features: string[];
};

export type PricingProduct = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  best_for: string;
  tiers: PricingTier[];
  note?: string;
};

export type GrowthPlan = {
  name: string;
  monthly: number;
  setup: number;
  contract_months: number;
  best_for: string;
  features: string[];
};

export type PricingAddon = { name: string; setup?: number; monthly?: number; detail?: string; price_label?: string };

export type PricingData = {
  updated: string;
  categories: string[];
  products: PricingProduct[];
  growth_plans: GrowthPlan[];
  addons: PricingAddon[];
  terms: string[];
};

export const PRICING: PricingData = {
  "updated": "2026-11-15",
  "categories": [
    "Websites & Google",
    "Bookings & Payments",
    "Leads & Marketing",
    "AI Assistants"
  ],
  "products": [
    {
      "id": "localrank",
      "name": "LocalRank",
      "category": "Websites & Google",
      "tagline": "Get found on Google Maps and turn searches into calls.",
      "best_for": "Clinics, labs, salons, shops and any local business",
      "tiers": [
        {
          "name": "Basic",
          "setup": 8999,
          "monthly": 0,
          "setup_label": null,
          "monthly_label": "No monthly fee",
          "popular": false,
          "features": [
            "Google Business Profile setup or clean-up",
            "Right categories, services and business hours",
            "15 photos and 5 posts uploaded",
            "Review link and QR stand design"
          ]
        },
        {
          "name": "Advance",
          "setup": 26499,
          "monthly": 5999,
          "setup_label": null,
          "monthly_label": null,
          "popular": true,
          "features": [
            "Everything in Basic, plus:",
            "5-page mobile website with WhatsApp button and map",
            "Domain for the first year, hosting and small edits",
            "4 Google posts a month",
            "Replies to your Google reviews",
            "Hours and offers kept up to date"
          ]
        },
        {
          "name": "Pro",
          "setup": 26499,
          "monthly": 10499,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Everything in Advance, plus:",
            "8 Google posts a month",
            "2 website page updates a month",
            "Listings on local directories",
            "Monthly Google ranking check",
            "Monthly report: calls, direction requests and website clicks from Google"
          ]
        }
      ]
    },
    {
      "id": "clinic-website",
      "name": "Clinic Website",
      "category": "Websites & Google",
      "tagline": "A fast clinic website that turns visitors into booked appointments.",
      "best_for": "Clinics, dental clinics, physiotherapy, diagnostic labs",
      "tiers": [
        {
          "name": "Basic",
          "setup": 21999,
          "monthly": 1499,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "5-page mobile website",
            "Treatments with prices",
            "Doctor profile",
            "WhatsApp and call buttons, Google Maps",
            "Domain for the first year, hosting, SSL and small edits"
          ]
        },
        {
          "name": "Advance",
          "setup": 39999,
          "monthly": 2999,
          "setup_label": null,
          "monthly_label": null,
          "popular": true,
          "features": [
            "Everything in Basic, plus:",
            "Online appointment booking",
            "Instant WhatsApp booking confirmation",
            "Doctor timings shown live"
          ]
        },
        {
          "name": "Pro",
          "setup": 61999,
          "monthly": 5499,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Everything in Advance, plus:",
            "Up to 5 doctors or 2 branches",
            "Blog for health articles",
            "1 landing page for ads"
          ]
        }
      ]
    },
    {
      "id": "reviewboost",
      "name": "ReviewBoost",
      "category": "Websites & Google",
      "tagline": "More 5-star Google reviews, on autopilot.",
      "best_for": "Restaurants, clinics, salons, gyms",
      "tiers": [
        {
          "name": "Basic",
          "setup": 10999,
          "monthly": 1499,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Review request on WhatsApp after every visit",
            "QR stand design for your counter",
            "Monthly review count report"
          ]
        },
        {
          "name": "Advance",
          "setup": 17999,
          "monthly": 2999,
          "setup_label": null,
          "monthly_label": null,
          "popular": true,
          "features": [
            "Everything in Basic, plus:",
            "AI-drafted replies to every review",
            "Instant alert to the owner on low ratings",
            "2 staff logins"
          ]
        },
        {
          "name": "Pro",
          "setup": 26499,
          "monthly": 5499,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Everything in Advance, plus:",
            "Up to 3 locations",
            "Competitor review tracking"
          ]
        }
      ],
      "note": "We ask every customer for a review, as Google's policy requires."
    },
    {
      "id": "showup",
      "name": "ShowUp",
      "category": "Bookings & Payments",
      "tagline": "Fewer no-shows with WhatsApp appointment reminders.",
      "best_for": "Clinics, dental clinics, physiotherapy, labs",
      "tiers": [
        {
          "name": "Basic",
          "setup": 13499,
          "monthly": 1499,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "1 doctor",
            "WhatsApp reminders 1 day and 2 hours before",
            "One-tap confirm or reschedule",
            "Today's appointments screen"
          ]
        },
        {
          "name": "Advance",
          "setup": 21999,
          "monthly": 2999,
          "setup_label": null,
          "monthly_label": null,
          "popular": true,
          "features": [
            "Everything in Basic, plus:",
            "Up to 3 doctors",
            "Reception and owner logins",
            "No-show report",
            "Follow-up visit reminders"
          ]
        },
        {
          "name": "Pro",
          "setup": 35499,
          "monthly": 3999,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Everything in Advance, plus:",
            "Up to 8 doctors or 2 branches",
            "Advance payment link",
            "Recall messages to patients who opted in"
          ]
        }
      ]
    },
    {
      "id": "slotpay",
      "name": "SlotPay",
      "category": "Bookings & Payments",
      "tagline": "Online booking with UPI advance payment.",
      "best_for": "Salons, spas, studios, consultants",
      "tiers": [
        {
          "name": "Basic",
          "setup": 17999,
          "monthly": 1499,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Online booking page",
            "1 location, up to 5 staff",
            "UPI advance payment",
            "WhatsApp booking reminders"
          ]
        },
        {
          "name": "Advance",
          "setup": 30999,
          "monthly": 2999,
          "setup_label": null,
          "monthly_label": null,
          "popular": true,
          "features": [
            "Everything in Basic, plus:",
            "Packages and memberships",
            "Staff calendar",
            "Sales reports"
          ]
        },
        {
          "name": "Pro",
          "setup": 52999,
          "monthly": 3999,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Everything in Advance, plus:",
            "Multiple branches",
            "Booking page on your own domain",
            "Loyalty points"
          ]
        }
      ]
    },
    {
      "id": "feeflow",
      "name": "FeeFlow",
      "category": "Bookings & Payments",
      "tagline": "Fee reminders with a UPI link, so fees come in on time.",
      "best_for": "Coaching classes, tuition, schools, gyms",
      "tiers": [
        {
          "name": "Basic",
          "setup": 13499,
          "monthly": 1499,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Up to 150 students",
            "WhatsApp fee reminders with UPI link",
            "Paid / pending screen"
          ]
        },
        {
          "name": "Advance",
          "setup": 21999,
          "monthly": 2999,
          "setup_label": null,
          "monthly_label": null,
          "popular": true,
          "features": [
            "Everything in Basic, plus:",
            "Up to 500 students",
            "Instalments",
            "Automatic receipts",
            "Parent links"
          ]
        },
        {
          "name": "Pro",
          "setup": 35499,
          "monthly": 3999,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Everything in Advance, plus:",
            "No student limit",
            "Multiple branches",
            "Attendance and marks messages to parents"
          ]
        }
      ]
    },
    {
      "id": "billease",
      "name": "BillEase",
      "category": "Bookings & Payments",
      "tagline": "GST invoicing under your CA firm's brand.",
      "best_for": "CA firms and tax consultants (and businesses with special billing needs)",
      "tiers": [
        {
          "name": "Basic",
          "setup": 13499,
          "monthly": 1499,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Custom GST billing for one business",
            "Built for workflows that standard billing apps can't handle",
            "Invoices on WhatsApp and email"
          ]
        },
        {
          "name": "Advance",
          "setup": 21999,
          "monthly": 249,
          "setup_label": null,
          "monthly_label": "₹249 per client / month",
          "popular": true,
          "features": [
            "White-label GST billing for your trader clients",
            "Your firm's name and logo",
            "Client logins",
            "Minimum 20 clients"
          ]
        },
        {
          "name": "Pro",
          "setup": 30999,
          "monthly": 199,
          "setup_label": null,
          "monthly_label": "₹199 per client / month",
          "popular": false,
          "features": [
            "Everything in Advance, plus:",
            "For 50+ clients",
            "E-invoicing",
            "Bulk client onboarding"
          ]
        }
      ]
    },
    {
      "id": "ca-dashboard",
      "name": "CA Client Dashboard",
      "category": "Bookings & Payments",
      "tagline": "Track every client's filing from 'documents pending' to 'filed'.",
      "best_for": "CA firms, tax consultants, accountants",
      "tiers": [
        {
          "name": "Basic",
          "setup": 21999,
          "monthly": 1499,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Up to 100 clients",
            "Status board: Docs pending → In progress → Review → Filed",
            "Due-date tracking"
          ]
        },
        {
          "name": "Advance",
          "setup": 35499,
          "monthly": 2999,
          "setup_label": null,
          "monthly_label": null,
          "popular": true,
          "features": [
            "Everything in Basic, plus:",
            "Up to 300 clients",
            "Owner, Staff and View-only roles",
            "WhatsApp reminders to clients for pending documents"
          ]
        },
        {
          "name": "Pro",
          "setup": 52999,
          "monthly": 3999,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Everything in Advance, plus:",
            "No client limit",
            "Client document upload portal",
            "BillEase white-label setup included"
          ]
        }
      ]
    },
    {
      "id": "leadlaunch",
      "name": "LeadLaunch",
      "category": "Leads & Marketing",
      "tagline": "A landing page and lead system that replies in seconds.",
      "best_for": "Real estate, interior designers, coaching, travel",
      "tiers": [
        {
          "name": "Basic",
          "setup": 13499,
          "monthly": 999,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "1-page offer or project page",
            "Lead form and WhatsApp button",
            "Meta pixel installed",
            "Hosting"
          ]
        },
        {
          "name": "Advance",
          "setup": 21999,
          "monthly": 1499,
          "setup_label": null,
          "monthly_label": null,
          "popular": true,
          "features": [
            "Everything in Basic, plus:",
            "Instant WhatsApp reply with your brochure",
            "Owner alert for every new lead",
            "All leads in a Google Sheet"
          ]
        },
        {
          "name": "Pro",
          "setup": 21999,
          "monthly": 13999,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Everything in Advance, plus:",
            "Meta (Instagram + Facebook) ads management",
            "For up to ₹50,000 monthly ad spend",
            "Monthly ads report",
            "Up to ₹1.5 lakh ad spend: ₹20,499 a month"
          ]
        }
      ],
      "note": "Ad spend is paid by you directly to Meta."
    },
    {
      "id": "postpilot",
      "name": "PostPilot",
      "category": "Leads & Marketing",
      "tagline": "Social media posts done for you, every month.",
      "best_for": "Wedding planners, restaurants, salons, gyms",
      "tiers": [
        {
          "name": "Basic",
          "setup": 4499,
          "monthly": 13499,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "12 posts a month",
            "1 platform",
            "Captions and hashtags",
            "Scheduling"
          ]
        },
        {
          "name": "Advance",
          "setup": 4499,
          "monthly": 26499,
          "setup_label": null,
          "monthly_label": null,
          "popular": true,
          "features": [
            "Everything in Basic, plus:",
            "16 posts + 4 Reels made from your clips",
            "2 platforms"
          ]
        },
        {
          "name": "Pro",
          "setup": 4499,
          "monthly": 43999,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Everything in Advance, plus:",
            "20 posts + 8 Reels",
            "3 platforms",
            "Monthly performance report"
          ]
        }
      ],
      "note": "One-time ₹4,499 setup (brand kit and templates) is waived when you pay 3 months upfront."
    },
    {
      "id": "broadcasthub",
      "name": "BroadcastHub",
      "category": "Leads & Marketing",
      "tagline": "WhatsApp and email campaigns to customers who opted in.",
      "best_for": "Gyms, salons, coaching, retail shops",
      "tiers": [
        {
          "name": "Basic",
          "setup": 10999,
          "monthly": 4999,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "WhatsApp Business API on your own number",
            "Contact import and opt-in form",
            "2 campaigns a month, written and designed for you"
          ]
        },
        {
          "name": "Advance",
          "setup": 17999,
          "monthly": 9499,
          "setup_label": null,
          "monthly_label": null,
          "popular": true,
          "features": [
            "Everything in Basic, plus:",
            "4 campaigns a month",
            "1 automatic flow (renewal or birthday)",
            "Email campaigns"
          ]
        },
        {
          "name": "Pro",
          "setup": 26499,
          "monthly": 15999,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Everything in Advance, plus:",
            "Weekly campaigns",
            "Customer segments",
            "Up to 3 automatic flows"
          ]
        }
      ],
      "note": "WhatsApp message fees are charged by Meta at cost."
    },
    {
      "id": "leadlens",
      "name": "LeadLens",
      "category": "Leads & Marketing",
      "tagline": "Your marketing report card on WhatsApp, every 1st of the month.",
      "best_for": "Any business spending on ads, Google or WhatsApp marketing",
      "tiers": [
        {
          "name": "Basic",
          "setup": 17999,
          "monthly": 2999,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Leads from website form, WhatsApp and Google Business Profile in one place",
            "Live dashboard",
            "WhatsApp summary + 1-page PDF on the 1st of every month"
          ]
        },
        {
          "name": "Advance",
          "setup": 30999,
          "monthly": 4999,
          "setup_label": null,
          "monthly_label": null,
          "popular": true,
          "features": [
            "Everything in Basic, plus:",
            "Up to 6 sources, including Instagram/Facebook ads, missed calls and AI receptionist",
            "Duplicate leads merged",
            "Reply time, cost per lead and cost per deal",
            "3 AI recommendations every month",
            "Update revenue with a one-line WhatsApp reply"
          ]
        },
        {
          "name": "Pro",
          "setup": 48999,
          "monthly": 7499,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Everything in Advance, plus:",
            "Multiple branches",
            "Custom stages (site visit, demo, deal)",
            "CRM sync (e.g. Zoho)",
            "Staff-wise reply time",
            "Weekly report"
          ]
        }
      ]
    },
    {
      "id": "whatsapp-followup",
      "name": "WhatsApp Follow-up",
      "category": "Leads & Marketing",
      "tagline": "Every enquiry gets a reply in seconds, and nobody is forgotten.",
      "best_for": "Clinics, salons, interior designers, any business with WhatsApp enquiries",
      "tiers": [
        {
          "name": "Basic",
          "setup": 10999,
          "monthly": 1499,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "AI-written instant reply to every enquiry and missed lead",
            "3 automatic follow-ups"
          ]
        },
        {
          "name": "Advance",
          "setup": 17999,
          "monthly": 2999,
          "setup_label": null,
          "monthly_label": null,
          "popular": true,
          "features": [
            "Everything in Basic, plus:",
            "All leads in a Google Sheet",
            "Lead tags",
            "Owner alerts"
          ]
        },
        {
          "name": "Pro",
          "setup": 31999,
          "monthly": 6499,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Everything in Advance, plus:",
            "AI chatbot trained on your brochure and FAQs",
            "Full conversations on WhatsApp",
            "Up to 1,000 chats a month"
          ]
        }
      ]
    },
    {
      "id": "ai-admission",
      "name": "AI Admission Assistant",
      "category": "AI Assistants",
      "tagline": "Answers every parent's question and books demo classes, 24×7.",
      "best_for": "Coaching institutes, schools, colleges",
      "tiers": [
        {
          "name": "Basic",
          "setup": 26499,
          "monthly": 5499,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Answers parents in English and Hinglish from your brochure and fees",
            "Lead score for every enquiry",
            "Website + WhatsApp",
            "Up to 1,000 chats a month"
          ]
        },
        {
          "name": "Advance",
          "setup": 43999,
          "monthly": 9999,
          "setup_label": null,
          "monthly_label": null,
          "popular": true,
          "features": [
            "Everything in Basic, plus:",
            "Demo class booking",
            "Hand-off to your counsellor",
            "Automatic follow-ups",
            "Up to 3,000 chats a month"
          ]
        },
        {
          "name": "Pro",
          "setup": 70499,
          "monthly": 15499,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Everything in Advance, plus:",
            "Doubt-solving bot for students, trained on your notes",
            "Up to 5,000 chats a month"
          ]
        }
      ]
    },
    {
      "id": "rag-chatbot",
      "name": "RAG Chatbot",
      "category": "AI Assistants",
      "tagline": "An AI assistant that answers only from your own documents.",
      "best_for": "Hospitals, travel agencies, builders, study-abroad consultants",
      "tiers": [
        {
          "name": "Basic",
          "setup": 175000,
          "monthly": 5499,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Website + WhatsApp chatbot",
            "Trained on your brochure, price list and FAQs (up to ~100 pages)",
            "English and Hinglish",
            "Up to 1,000 chats a month"
          ]
        },
        {
          "name": "Advance",
          "setup": 225000,
          "monthly": 10999,
          "setup_label": null,
          "monthly_label": null,
          "popular": true,
          "features": [
            "Everything in Basic, plus:",
            "Up to ~500 pages of documents",
            "Hindi and Marathi",
            "Every answer shows its source",
            "Monthly accuracy report",
            "Up to 3,000 chats a month"
          ]
        },
        {
          "name": "Pro",
          "setup": 300000,
          "monthly": 21499,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Everything in Advance, plus:",
            "Several knowledge bases",
            "Internal search for your staff",
            "CRM or hospital-software link",
            "Up to 6,000 chats a month"
          ]
        }
      ]
    },
    {
      "id": "agentic-ai",
      "name": "Agentic AI",
      "category": "AI Assistants",
      "tagline": "An AI agent that doesn't just answer, it gets the work done.",
      "best_for": "Builders, study-abroad consultants, hospitals, travel agencies",
      "tiers": [
        {
          "name": "Basic",
          "setup": 175000,
          "monthly": 11999,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Answers from your documents",
            "Books slots or site visits",
            "Sends leads to your Google Sheet or CRM",
            "Automatic follow-ups and hand-off to staff",
            "Up to 3,000 chats a month"
          ]
        },
        {
          "name": "Advance",
          "setup": 250000,
          "monthly": 15999,
          "setup_label": null,
          "monthly_label": null,
          "popular": true,
          "features": [
            "Everything in Basic, plus:",
            "Calendar and CRM integration",
            "Payment links",
            "Multi-step flows (quote → follow-up → booking)",
            "Up to 4,000 chats a month"
          ]
        },
        {
          "name": "Pro",
          "setup": 350000,
          "monthly": 23999,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Everything in Advance, plus:",
            "Several AI agents working together (sales, support, reminders)",
            "Hospital-software or ERP link",
            "Up to 6,000 chats a month"
          ]
        }
      ]
    },
    {
      "id": "callcatch",
      "name": "CallCatch",
      "category": "AI Assistants",
      "tagline": "Never lose a lead to a missed call.",
      "best_for": "Travel agencies, real estate, clinics",
      "tiers": [
        {
          "name": "Basic",
          "setup": 10999,
          "monthly": 1499,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Missed call → instant WhatsApp reply",
            "Enquiry note sent to you"
          ]
        },
        {
          "name": "Advance",
          "setup": 35499,
          "monthly": 5999,
          "setup_label": null,
          "monthly_label": null,
          "popular": true,
          "features": [
            "AI voice receptionist answers your calls",
            "Takes enquiry details and sends them to you",
            "300 call minutes a month"
          ]
        },
        {
          "name": "Pro",
          "setup": 61999,
          "monthly": 9999,
          "setup_label": null,
          "monthly_label": null,
          "popular": false,
          "features": [
            "Everything in Advance, plus:",
            "Speaks Hindi, Marathi and English",
            "Books appointments",
            "Adds every caller to your CRM",
            "600 call minutes a month"
          ]
        }
      ]
    }
  ],
  "growth_plans": [
    {
      "name": "Local Growth",
      "monthly": 25000,
      "setup": 34999,
      "contract_months": 6,
      "best_for": "Clinics, dental, salons, gyms and restaurants with one location",
      "features": [
        "Google Business Profile managed every month",
        "ReviewBoost Advance",
        "WhatsApp Follow-up with AI replies",
        "8 social media posts a month",
        "Website hosting and edits",
        "Monthly lead report"
      ]
    },
    {
      "name": "Front-Desk Autopilot",
      "monthly": 30000,
      "setup": 39999,
      "contract_months": 6,
      "best_for": "Clinics with 2+ doctors, coaching with 200+ students, salons and spas",
      "features": [
        "ShowUp, FeeFlow or SlotPay Advance",
        "WhatsApp AI chatbot (1,000 chats)",
        "ReviewBoost Advance",
        "Google Business Profile care",
        "12 social media posts a month",
        "Monthly report call"
      ]
    },
    {
      "name": "AI Sales Agent",
      "monthly": 50000,
      "setup": 149999,
      "contract_months": 6,
      "best_for": "Real estate, study-abroad consultants, travel agencies, interior designers",
      "features": [
        "Agentic AI Basic (3,000 chats)",
        "LeadLaunch lead system",
        "Meta ads management (up to ₹50,000 spend)",
        "CallCatch missed-call",
        "2 WhatsApp campaigns a month",
        "12 social media posts a month",
        "Weekly lead report"
      ]
    },
    {
      "name": "AI Front Office",
      "monthly": 80000,
      "setup": 299999,
      "contract_months": 12,
      "best_for": "Hospitals, IVF centres, multi-branch coaching, large builders",
      "features": [
        "RAG Chatbot Pro (6,000 chats, staff search)",
        "AI voice receptionist Pro (600 minutes)",
        "ShowUp Pro",
        "ReviewBoost Pro",
        "LeadLaunch with ads management (up to ₹1.5 lakh spend)",
        "12 social media posts a month",
        "Monthly strategy call"
      ]
    }
  ],
  "addons": [
    {
      "name": "AI chatbot add-on for any WhatsApp product",
      "setup": 17999,
      "monthly": 3999,
      "detail": "Up to 1,000 chats a month"
    },
    {
      "name": "Extra AI chats",
      "price_label": "₹1,999 per 1,000 chats"
    },
    {
      "name": "Extra AI call minutes",
      "price_label": "₹9 per minute"
    },
    {
      "name": "Extra work or changes",
      "price_label": "₹2,200 per hour"
    }
  ],
  "terms": [
    "All prices are in INR and exclude 18% GST.",
    "Setup: 50% advance to start, 50% on go-live. Setups under ₹15,000 are paid fully in advance.",
    "Monthly plans are billed in advance on the 1st, with a 3-month minimum. Pay for a year upfront and get 1 month free.",
    "Setup includes 2 rounds of changes.",
    "Not included: WhatsApp message fees (charged by Meta), payment gateway fees and ad spend. These are paid on your own accounts.",
    "Where we build a website, your domain is included for the first year; renewals are billed yearly at cost.",
    "Growth Plans need a 6-month contract (12 months for AI Front Office). Leaving early makes the setup discount payable."
  ]
};
