export type SkillCategory =
  | 'language'
  | 'ai'
  | 'cloud'
  | 'mobile'
  | 'data';

export interface Skill {
  id: string;
  label: string;
  category: SkillCategory;
  description: string;
  level: 'core' | 'strong' | 'working';
}

export const SKILL_CATEGORIES: Record<SkillCategory, { label: string; color: string }> = {
  language: { label: 'Languages', color: '#10b981' },
  ai: { label: 'AI / LLM', color: '#34d399' },
  cloud: { label: 'Cloud & Backend', color: '#059669' },
  mobile: { label: 'Mobile', color: '#22c55e' },
  data: { label: 'Data / ML', color: '#16a34a' },
};

export const SKILLS: Skill[] = [
  // Languages
  { id: 'python', label: 'Python', category: 'language', level: 'core', description: 'Daily driver for AI/ML, backend services, edge functions, scripting.' },
  { id: 'typescript', label: 'TypeScript', category: 'language', level: 'core', description: 'Spotter AI mobile app, this portfolio, Next.js services.' },
  { id: 'swift', label: 'Swift', category: 'language', level: 'working', description: 'Native iOS integrations, Spotter App Store builds.' },
  { id: 'c', label: 'C', category: 'language', level: 'working', description: 'UC3M low-level coursework, embedded systems.' },

  // AI / LLM
  { id: 'llms', label: 'LLMs', category: 'ai', level: 'core', description: 'GPT-4o, Claude, Gemini in production at Beam Suntory and Spotter.' },
  { id: 'agents', label: 'Agents', category: 'ai', level: 'core', description: 'OpenAI Agents SDK, LangChain agent flows, tool-use orchestration.' },
  { id: 'mcp', label: 'MCP', category: 'ai', level: 'strong', description: 'Model Context Protocol — tool exposure for enterprise agents.' },
  { id: 'rag', label: 'RAG', category: 'ai', level: 'core', description: 'Hybrid retrieval, evaluation, multi-LLM routing in production.' },
  { id: 'langchain', label: 'LangChain', category: 'ai', level: 'strong', description: 'Orchestration framework used across enterprise workloads.' },
  { id: 'openai', label: 'OpenAI SDK', category: 'ai', level: 'core', description: 'Vision, embeddings, agents — daily at work and on Spotter.' },

  // Cloud & Backend
  { id: 'azure', label: 'Azure', category: 'cloud', level: 'strong', description: 'AI Foundry, AI Search, Functions, end-to-end secure architectures.' },
  { id: 'supabase', label: 'Supabase', category: 'cloud', level: 'core', description: 'Spotter backbone — Postgres, RLS, Auth, Storage, edge functions.' },
  { id: 'fastapi', label: 'FastAPI', category: 'cloud', level: 'strong', description: 'Python service layer for AI/data workloads.' },
  { id: 'gcp', label: 'GCP', category: 'cloud', level: 'working', description: 'Vertex AI, BigQuery integrations on selected use cases.' },
  { id: 'docker', label: 'Docker', category: 'cloud', level: 'strong', description: 'Reproducible deployment of AI services.' },

  // Mobile
  { id: 'react-native', label: 'React Native', category: 'mobile', level: 'core', description: 'Spotter AI on iOS and Android with shared codebase.' },
  { id: 'expo', label: 'Expo', category: 'mobile', level: 'core', description: 'Expo SDK 54, Expo Router, EAS Build for Spotter.' },
  { id: 'arkit', label: 'ARKit', category: 'mobile', level: 'strong', description: 'LiDAR depth capture for the RGB-D nutritional pipeline (TFG).' },
  { id: 'corelm', label: 'Core ML', category: 'mobile', level: 'working', description: 'On-device food classification gating for Spotter scans.' },

  // Data / ML
  { id: 'pytorch', label: 'PyTorch', category: 'data', level: 'strong', description: 'Training and fine-tuning models for the TFG pipeline.' },
  { id: 'opencv', label: 'OpenCV', category: 'data', level: 'strong', description: 'Computer vision pipeline for posture detection and TFG.' },
  { id: 'open3d', label: 'Open3D', category: 'data', level: 'working', description: 'TSDF reconstruction for the RGB-D thesis pipeline.' },
  { id: 'transformers', label: 'Transformers', category: 'data', level: 'working', description: 'HuggingFace pipelines and CLIP fine-tuning in research.' },
];
