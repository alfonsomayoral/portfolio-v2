export interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  orgUrl?: string;
  location: string;
  period: string;
  current: boolean;
  summary: string;
  highlights: string[];
  tags: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'suntory',
    role: 'AI Engineer',
    org: 'Beam Suntory',
    orgUrl: 'https://www.beamsuntory.com',
    location: 'Madrid, Spain',
    period: 'Sep 2025 — Present',
    current: true,
    summary:
      'Inside the AI software team. End-to-end ownership of GenAI solutions: business use-case discovery, secure Azure architecture, agent / MCP implementation, observability and iteration with stakeholders until each tool becomes part of a daily workflow.',
    highlights: [
      'Led 5+ distinct production use cases across departments; several have become the default tool for the teams that adopted them.',
      'Stack: OpenAI Agents SDK, LangChain, Azure AI Foundry, Azure AI Search, MCP, OpenAI Vector Store. Azure primary, some GCP.',
      'Built enterprise-grade architectures: SSO, data classification, audit logs, cost monitoring, observability — not just APIs from a notebook.',
      'Learned to recognize a real business use case versus a demo: workflows repeated weekly by multiple people are gold.',
    ],
    tags: ['LLMs', 'Agents', 'MCP', 'Azure', 'LangChain', 'Enterprise'],
  },
  {
    id: 'aisc-madrid',
    role: 'Co-founder & Director of Events',
    org: 'AISC Madrid',
    orgUrl: 'https://github.com/AISC-Madrid',
    location: 'Madrid, Spain',
    period: 'Sep 2025 — Present',
    current: true,
    summary:
      'First AISC chapter in Europe, first AI student association at UC3M. Co-founded from zero. Own the event pipeline, partner relationships, and community ops alongside a core team of 16.',
    highlights: [
      '500+ community members across UC3M; 30+ events organized in the first year.',
      'Partners: Microsoft, GitHub, Hugging Face, Spotify.',
      'Format mix: workshops, talks, and full-day events — builder-first, speaker-second.',
      'Today the most active student association at UC3M.',
    ],
    tags: ['Leadership', 'Community', 'Events', 'Partnerships'],
  },
  {
    id: 'aisc-riverside',
    role: 'Competitive Projects Team',
    org: 'AISC Riverside',
    location: 'Riverside, CA',
    period: 'Sep 2024 — Jun 2025',
    current: false,
    summary:
      'During my exchange year at UC Riverside. Built real-time AI projects with the competitive team and ran AI workshops across the engineering school.',
    highlights: [
      'Delivered 3 workshops to 30+ participants on AI, ML, NLP, and CV.',
      'Built real-time video-call interview sentiment analysis with the competitive team.',
      'Brought the AISC playbook back to Madrid — direct inspiration for AISC Madrid.',
    ],
    tags: ['Computer Vision', 'NLP', 'Workshops'],
  },
  {
    id: 'telefonica',
    role: 'Talentum Scholar',
    org: 'Telefónica Business Solutions',
    location: 'Madrid, Spain',
    period: 'Jun 2022 — Aug 2022',
    current: false,
    summary:
      'Summer software engineering scholarship across Telefónica Group companies. 10+ professional lectures, 2 real-world case studies, 8+ workshops on data, AI, and software development.',
    highlights: [
      'Selected for an internship rotating across Telefónica Group companies.',
      'Solved 2 real-world business case studies with industry mentors.',
      'First exposure to working inside a large technology organization.',
    ],
    tags: ['Internship', 'Software Engineering'],
  },
];
