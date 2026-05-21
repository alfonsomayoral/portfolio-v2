export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  context: string;
  role: string;
  year: string;
  status: 'shipped' | 'research' | 'archived';
  featured: boolean;
  tech: string[];
  highlights: string[];
  links: ProjectLink[];
  nda?: boolean;
  accent: string; // hex color for card glow
}

export const PROJECTS: Project[] = [
  {
    id: 'spotter',
    title: 'Spotter AI',
    tagline: 'A camera-first fitness companion that sees your gym sessions, understands your meals, and grows with your community.',
    description:
      'Cross-platform iOS and Android app on the App Store. Four pillars in one product — nutrition, workout, social, and gamification — powered by GPT-4o vision and a production Supabase stack.',
    context:
      'Development started in June 2025. Shipped to App Store in February 2026. iOS + Android with one codebase, two languages (English and Spanish). 1000+ downloads, 350+ weekly active users in the first weeks.',
    role: 'Founder & engineering lead',
    year: '2026',
    status: 'shipped',
    featured: true,
    tech: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'GPT-4o', 'RevenueCat', 'Remotion'],
    highlights: [
      'Four pillars in one app: nutrition (GPT-4o vision), workout (sets/reps/weight/RPE, 1RM, 500+ exercise library), social feed (likes/comments/follows, Remotion video summaries), gamification (60+ achievements, XP leagues, streaks).',
      '15 Supabase edge functions in production. 3-tier subscription (Free / Pro / Premium) via RevenueCat.',
      'Foundation models over custom training: GPT-4o for food vision, GPT-4o-mini for barcode clarification. Cost-shaped via on-device classification gating.',
      '167 components, 20 Zustand stores, full i18n (es/en), EAS Build pipeline for both stores.',
    ],
    links: [
      { label: 'App Store', href: 'https://apps.apple.com/us/app/spotter-ai/id6756170372' },
    ],
    accent: '#10b981',
  },
  {
    id: 'suntory-genai',
    title: 'Enterprise GenAI at Beam Suntory',
    tagline: 'Production AI engineering inside the AI software team at a Fortune 500 — agents, MCPs, and enterprise Azure architectures.',
    description:
      'One year as an AI Engineer at Beam Suntory, building end-to-end GenAI solutions across departments. Sanitized case study — patterns and engineering, not product internals.',
    context:
      'AI Engineer since September 2025, inside the AI software team. End-to-end role across discovery, architecture, build, observability, and iteration with stakeholders. Specifics are NDA — the patterns are publicly shareable.',
    role: 'AI Engineer',
    year: '2025 — Present',
    status: 'shipped',
    featured: true,
    nda: true,
    tech: ['Python', 'OpenAI Agents SDK', 'LangChain', 'Azure AI Foundry', 'Azure AI Search', 'MCP'],
    highlights: [
      '5+ distinct production use cases across departments; several have become the default tool the team reaches for.',
      'Agents as the default interface — focused capability per agent, curated toolset, clear human handoff.',
      'MCP for internal tool exposure: version-controlled tool definitions, explicit security review surface.',
      'Hybrid retrieval (dense + sparse + reranking) over Azure AI Search beats pure embedding search on enterprise content.',
    ],
    links: [],
    accent: '#34d399',
  },
  {
    id: 'aisc-madrid',
    title: 'AISC Madrid',
    tagline: "Co-founded Madrid's largest student-run AI community — first AISC chapter in Europe.",
    description:
      'First AISC chapter outside the US and first AI student association at UC3M. 500+ members, 30+ events, partnerships with Microsoft, GitHub, Hugging Face, and Spotify in our first year.',
    context:
      'Co-founded on 1 September 2025. Core team of 16 today. We are the most active student association at UC3M and the bridge between Madrid engineering schools and the AI hiring market.',
    role: 'Co-founder & Director of Events',
    year: '2025 — Present',
    status: 'shipped',
    featured: true,
    tech: ['Community', 'Leadership', 'Events', 'Partnerships'],
    highlights: [
      'First AISC chapter in Europe and first AI student association at UC3M.',
      'Industry partners in year one: Microsoft, GitHub, Hugging Face, Spotify.',
      'Built the event pipeline end to end: format, speaker booking, logistics, promotion, attendance.',
      'Mission: demystify AI. Fundamentals + real industry tools + alumni and professionals from the companies shaping the field.',
    ],
    links: [
      { label: 'GitHub Organization', href: 'https://github.com/AISC-Madrid' },
    ],
    accent: '#059669',
  },
  {
    id: 'tfg',
    title: 'RGB-D Nutritional Pipeline (TFG)',
    tagline: 'Undergraduate thesis at UC3M — single-scan portion estimation fusing iPhone LiDAR with multimodal LLMs.',
    description:
      'Research-grade pipeline that fuses LiDAR depth, TSDF reconstruction, and GPT-4o reasoning to estimate food volume and macronutrients from a single iPhone Pro scan.',
    context:
      'Undergraduate thesis at Universidad Carlos III de Madrid. Defense scheduled for 6 July 2026. Independent of Spotter AI: Spotter uses pretrained foundation models served via API; the TFG trains and evaluates custom geometry + multimodal architectures end-to-end on public food datasets.',
    role: 'Author',
    year: '2026',
    status: 'research',
    featured: false,
    tech: ['Python', 'ARKit', 'LiDAR', 'Open3D', 'DeepLabV3+', 'GPT-4o', 'PyTorch'],
    highlights: [
      'Pipeline: ARKit (36 RGB-D frames) → TSDF reconstruction (Open3D) → 2D segmentation (DeepLabV3+) → mesh-based volume (Poisson + divergence theorem) → GPT-4o for classification + density + macros.',
      'LLM-direct classification over hand-curated food databases: better long-tail coverage, no compounding errors when a food is missing.',
      'Mesh-based volume estimation replaces voxel counting, inspired by VolE (Scientific Reports 2026).',
      'Datasets: Nutrition5k, FoodSeg103, MetaFood3D, FNDDS, BEDCA.',
    ],
    links: [],
    accent: '#22c55e',
  },
  {
    id: 'bearhack',
    title: 'BearHack — Bad Posture Detection',
    tagline: '3rd place at UC Riverside Hackathon — real-time posture monitoring with MediaPipe and an Arduino feedback device.',
    description:
      '24-hour hackathon project combining MediaPipe pose estimation with a hardware alert system. 3rd place out of 40+ teams in a 150+ person hackathon.',
    context:
      'Built during my exchange year at UC Riverside (2024-25). Team-of-three project, shipped a working end-to-end demo from webcam to wrist alert.',
    role: 'Computer vision + integration',
    year: '2024',
    status: 'archived',
    featured: false,
    tech: ['Python', 'MediaPipe', 'OpenCV', 'Arduino'],
    highlights: [
      '3rd place out of 40+ teams in a 150+ person hackathon.',
      'Real-time pose estimation with MediaPipe over webcam capture.',
      'Custom Arduino hardware for the feedback alert.',
      'Cut scope mid-hack from four features to one excellent demo — lesson learned the hard way.',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/alfonsomayoral/BearHack_Project' },
    ],
    accent: '#16a34a',
  },
];
