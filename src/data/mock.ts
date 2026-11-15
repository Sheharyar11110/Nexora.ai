import { unsplash } from "@/lib/utils";

export const IMG = {
  heroAbstract: unsplash("1677442136019-21780ecad995", 1600),
  aiRobot: unsplash("1620712943543-bcc4688e7485", 1200),
  abstract3d: unsplash("1635070041078-e363dbe005cb", 1200),
  gradient: unsplash("1618005182384-a83a8bd57fbe", 1200),
  tech: unsplash("1550751827-4bd374c3f58b", 1200),
  team: unsplash("1522071820081-009f0129c71c", 1200),
  teamWork: unsplash("1551434678-e076c223a692", 1200),
  neon: unsplash("1550684848-fac1c5b4e853", 1200),
  authSide: unsplash("1639322537228-f710d846310a", 1400),
};

export const GALLERY = [
  { id: "1506905925346-21bda4d32df4", prompt: "Majestic mountain range at golden hour, cinematic, volumetric light", model: "Aurora XL", ratio: "landscape" },
  { id: "1618172193622-ae2d025f4032", prompt: "Iridescent 3D fluid sculpture, glass morphism, studio lighting", model: "Prism 3", ratio: "square" },
  { id: "1519681393784-d120267933ba", prompt: "Snowy peaks under a starry night sky, long exposure, 8k", model: "Aurora XL", ratio: "portrait" },
  { id: "1541701494587-cb58502866ab", prompt: "Abstract fluid paint swirl, vibrant pastel palette, macro", model: "Canvas v2", ratio: "square" },
  { id: "1617791160505-6f00504e3519", prompt: "Soft 3D render of floating shapes, pastel gradient, octane", model: "Prism 3", ratio: "landscape" },
  { id: "1470071459604-3b5ec3a7fe05", prompt: "Misty forest valley at dawn, moody atmosphere, film grain", model: "Aurora XL", ratio: "portrait" },
  { id: "1558591710-4b4a1ae0f04d", prompt: "Holographic gradient waves, chrome texture, futuristic", model: "Canvas v2", ratio: "square" },
  { id: "1501785888041-af3ef285b470", prompt: "Turquoise lake surrounded by alpine peaks, ultra wide", model: "Aurora XL", ratio: "landscape" },
  { id: "1626544827763-d516dce335e2", prompt: "Minimal 3D abstract composition, clay material, soft shadows", model: "Prism 3", ratio: "portrait" },
  { id: "1518837695005-2083093ee35b", prompt: "Crashing ocean wave, crystal clear turquoise water, high speed", model: "Aurora XL", ratio: "square" },
  { id: "1614850523459-c2f4c699c52e", prompt: "Dark abstract liquid metal, deep purple and blue, hyperreal", model: "Canvas v2", ratio: "landscape" },
  { id: "1604076913837-52ab5629fba9", prompt: "Abstract colourful smoke, studio photography, black background", model: "Prism 3", ratio: "portrait" },
];

export const PEOPLE = {
  sarah: unsplash("1494790108377-be9c29b29330", 200),
  james: unsplash("1507003211169-0a1dd7228f2d", 200),
  alex: unsplash("1500648767791-00dcc994a43e", 200),
  emma: unsplash("1438761681033-6461ffad8d80", 200),
  david: unsplash("1472099645785-5658abf4ff4e", 200),
  mia: unsplash("1534528741775-53994a69daeb", 200),
  olivia: unsplash("1517841905240-472988babdf9", 200),
  noah: unsplash("1506794778202-cad84cf45f1d", 200),
  ava: unsplash("1544005313-94ddf0286df2", 200),
};

export const USER = { name: "Alex Morgan", email: "alex@nexora.ai", avatar: PEOPLE.alex, plan: "Pro", credits: 7420, creditsMax: 10000 };

export const TESTIMONIALS = [
  { name: "Sarah Chen", role: "Head of Growth, Lumina", avatar: PEOPLE.sarah, text: "Nexora replaced five tools for us. Our content velocity went up 4x in the first month — and the quality actually improved." },
  { name: "James Walker", role: "CTO, Archway Labs", avatar: PEOPLE.james, text: "The workflow builder is ridiculous. We automated our entire support triage in an afternoon. The team thinks I'm a wizard." },
  { name: "Emma Rodriguez", role: "Creative Director, Fable", avatar: PEOPLE.emma, text: "The image studio produces campaign-ready visuals. Our designers now spend time on ideas, not pixel pushing." },
  { name: "David Kim", role: "Founder, Stackwise", avatar: PEOPLE.david, text: "Best-in-class UX. It feels like the product was designed by people who actually use AI every single day." },
  { name: "Mia Thompson", role: "Marketing Lead, Orbit", avatar: PEOPLE.mia, text: "Brand voice training is a game changer. Every draft sounds like us — no more generic AI copy." },
  { name: "Noah Patel", role: "VP Engineering, Kinetic", avatar: PEOPLE.noah, text: "SOC 2, SSO, audit logs, and an API that just works. Procurement signed off in a week." },
  { name: "Olivia Bennett", role: "Product Manager, Nimbus", avatar: PEOPLE.olivia, text: "Analytics show exactly where AI saves us time. I finally have numbers to show leadership." },
  { name: "Ava Martins", role: "Content Strategist, Pulse", avatar: PEOPLE.ava, text: "I write a brief, Nexora drafts, I polish. My weekly output tripled and I leave work on time." },
];

export const LOGOS = ["Vercel", "Linear", "Stripe", "Notion", "Figma", "Ramp", "Loom", "Raycast", "Retool", "Supabase"];

export const REVENUE = [
  { m: "Jan", tokens: 4200, images: 2400, runs: 1200 },
  { m: "Feb", tokens: 5100, images: 2900, runs: 1500 },
  { m: "Mar", tokens: 4800, images: 3400, runs: 1900 },
  { m: "Apr", tokens: 6900, images: 3900, runs: 2400 },
  { m: "May", tokens: 7400, images: 4300, runs: 2900 },
  { m: "Jun", tokens: 8800, images: 5100, runs: 3300 },
  { m: "Jul", tokens: 8200, images: 5600, runs: 3900 },
  { m: "Aug", tokens: 10100, images: 6200, runs: 4500 },
  { m: "Sep", tokens: 11800, images: 6900, runs: 5200 },
  { m: "Oct", tokens: 12900, images: 7400, runs: 6100 },
  { m: "Nov", tokens: 14600, images: 8300, runs: 6900 },
  { m: "Dec", tokens: 16200, images: 9100, runs: 7600 },
];

export const WEEKLY = [
  { d: "Mon", v: 62 }, { d: "Tue", v: 78 }, { d: "Wed", v: 71 }, { d: "Thu", v: 94 }, { d: "Fri", v: 88 }, { d: "Sat", v: 41 }, { d: "Sun", v: 36 },
];

export const MODEL_SPLIT = [
  { name: "Text", value: 48, color: "#5b4bff" },
  { name: "Image", value: 27, color: "#f0541e" },
  { name: "Workflows", value: 17, color: "#0e9f6e" },
  { name: "Voice", value: 8, color: "#b07800" },
];

export const ACTIVITY = [
  { who: "Sarah Chen", avatar: PEOPLE.sarah, what: "generated 12 images in", target: "Spring Campaign", time: "2m ago", type: "image" },
  { who: "James Walker", avatar: PEOPLE.james, what: "deployed workflow", target: "Support Triage v3", time: "18m ago", type: "workflow" },
  { who: "Emma Rodriguez", avatar: PEOPLE.emma, what: "published blog post", target: "The Future of Design", time: "1h ago", type: "doc" },
  { who: "David Kim", avatar: PEOPLE.david, what: "invited 3 members to", target: "Growth Team", time: "3h ago", type: "team" },
  { who: "Mia Thompson", avatar: PEOPLE.mia, what: "trained brand voice", target: "Orbit Tone", time: "5h ago", type: "voice" },
];

export const PROJECTS = [
  { name: "Spring Campaign", type: "Image set", items: 48, updated: "2h ago", cover: GALLERY[1].id, members: [PEOPLE.sarah, PEOPLE.emma, PEOPLE.mia], progress: 82, tag: "Marketing" },
  { name: "Product Launch Copy", type: "Documents", items: 16, updated: "5h ago", cover: GALLERY[4].id, members: [PEOPLE.james, PEOPLE.david], progress: 64, tag: "Content" },
  { name: "Support Bot", type: "Workflow", items: 9, updated: "1d ago", cover: GALLERY[6].id, members: [PEOPLE.noah, PEOPLE.alex, PEOPLE.olivia], progress: 100, tag: "Automation" },
  { name: "Brand Refresh", type: "Image set", items: 124, updated: "2d ago", cover: GALLERY[3].id, members: [PEOPLE.emma, PEOPLE.ava], progress: 45, tag: "Design" },
  { name: "Investor Update", type: "Documents", items: 4, updated: "3d ago", cover: GALLERY[10].id, members: [PEOPLE.david], progress: 90, tag: "Ops" },
  { name: "Onboarding Emails", type: "Sequence", items: 12, updated: "4d ago", cover: GALLERY[8].id, members: [PEOPLE.mia, PEOPLE.sarah], progress: 30, tag: "Lifecycle" },
];

export const TEAM = [
  { name: "Alex Morgan", email: "alex@nexora.ai", role: "Owner", avatar: PEOPLE.alex, status: "online", usage: 82 },
  { name: "Sarah Chen", email: "sarah@nexora.ai", role: "Admin", avatar: PEOPLE.sarah, status: "online", usage: 67 },
  { name: "James Walker", email: "james@nexora.ai", role: "Editor", avatar: PEOPLE.james, status: "away", usage: 54 },
  { name: "Emma Rodriguez", email: "emma@nexora.ai", role: "Editor", avatar: PEOPLE.emma, status: "online", usage: 91 },
  { name: "David Kim", email: "david@nexora.ai", role: "Viewer", avatar: PEOPLE.david, status: "offline", usage: 12 },
  { name: "Mia Thompson", email: "mia@nexora.ai", role: "Editor", avatar: PEOPLE.mia, status: "online", usage: 73 },
  { name: "Noah Patel", email: "noah@nexora.ai", role: "Admin", avatar: PEOPLE.noah, status: "away", usage: 38 },
];

export const PLANS = [
  {
    name: "Starter",
    price: { monthly: 0, yearly: 0 },
    desc: "For individuals exploring what AI can do.",
    features: ["1,000 credits / month", "GPT-class chat assistant", "25 image generations", "5 templates", "Community support"],
    cta: "Start free",
  },
  {
    name: "Pro",
    price: { monthly: 29, yearly: 23 },
    desc: "For creators and professionals shipping daily.",
    features: ["10,000 credits / month", "All premium models", "Unlimited image generations", "Workflow builder (20 flows)", "Brand voice training", "Priority support"],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Business",
    price: { monthly: 99, yearly: 79 },
    desc: "For teams that need scale, control & security.",
    features: ["50,000 shared credits", "Unlimited workflows", "SSO & SCIM", "Audit logs & roles", "Custom model fine-tuning", "Dedicated success manager"],
    cta: "Contact sales",
  },
];

export const INVOICES = [
  { id: "INV-2026-011", date: "Nov 01, 2026", amount: 29, status: "Paid" },
  { id: "INV-2026-010", date: "Oct 01, 2026", amount: 29, status: "Paid" },
  { id: "INV-2026-009", date: "Sep 01, 2026", amount: 29, status: "Paid" },
  { id: "INV-2026-008", date: "Aug 01, 2026", amount: 29, status: "Paid" },
  { id: "INV-2026-007", date: "Jul 01, 2026", amount: 19, status: "Refunded" },
];

export const TEMPLATES = [
  { id: "blog", name: "Blog Post", desc: "Long-form SEO articles with outline", cat: "Content", color: "bg-lilac" },
  { id: "ad", name: "Ad Copy", desc: "High-converting ads for any platform", cat: "Marketing", color: "bg-peach" },
  { id: "email", name: "Cold Email", desc: "Personalized outreach that gets replies", cat: "Sales", color: "bg-mist" },
  { id: "social", name: "Social Thread", desc: "Viral threads for X & LinkedIn", cat: "Social", color: "bg-butter" },
  { id: "product", name: "Product Description", desc: "Benefit-driven ecommerce copy", cat: "Ecommerce", color: "bg-mint" },
  { id: "seo", name: "SEO Meta Tags", desc: "Titles and descriptions that rank", cat: "Marketing", color: "bg-lilac" },
  { id: "press", name: "Press Release", desc: "Newsworthy announcements, AP style", cat: "PR", color: "bg-mist" },
  { id: "script", name: "Video Script", desc: "Hooks, beats and CTAs for video", cat: "Social", color: "bg-peach" },
];

export const CHAT_HISTORY = [
  { id: "c1", title: "Q4 launch strategy brainstorm", time: "Today" },
  { id: "c2", title: "Refactor auth middleware", time: "Today" },
  { id: "c3", title: "Landing page hero copy", time: "Yesterday" },
  { id: "c4", title: "Explain vector embeddings", time: "Yesterday" },
  { id: "c5", title: "Customer churn analysis", time: "Previous 7 days" },
  { id: "c6", title: "Hiring plan for design team", time: "Previous 7 days" },
  { id: "c7", title: "SQL query optimization", time: "Previous 7 days" },
];

export const NOTIFICATIONS = [
  { title: "Workflow completed", desc: "Support Triage v3 processed 248 tickets", time: "2m", unread: true },
  { title: "Sarah commented", desc: "“Love the new hero variant!” on Spring Campaign", time: "1h", unread: true },
  { title: "Credits running low", desc: "You've used 74% of your monthly credits", time: "3h", unread: false },
  { title: "New model available", desc: "Aurora XL 2.0 is now live in Image Studio", time: "1d", unread: false },
];
