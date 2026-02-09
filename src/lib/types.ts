// Onboarding types

export type PlanType = 'self-hosted' | 'managed-admin' | 'managed-vps';

export interface ContactData {
  name: string;
  email: string;
  phone: string;
  company?: string;
}

export interface AssistantConfig {
  assistantName: string;
  personality: 'professional' | 'friendly' | 'casual';
  language: 'es' | 'en' | 'both';
}

export type IntegrationType = 'whatsapp' | 'telegram' | 'discord' | 'slack' | 'webchat';

export interface IntegrationConfig {
  type: IntegrationType;
  // Additional config per integration type will be collected post-payment
}

export type AIModel = 'claude-sonnet' | 'claude-opus' | 'gpt-4o' | 'gpt-4o-mini';

export interface ModelConfig {
  model: AIModel;
}

export interface SkillConfig {
  selectedSkills: string[];
}

export interface OnboardingData {
  plan: PlanType;
  contact: ContactData;
  assistant: AssistantConfig;
  integration: IntegrationConfig;
  model: ModelConfig;
  skills: SkillConfig;
}

export interface PlanPricing {
  setupFee: number;
  hardwareFee: number | null;
  monthlyFee: number | null;
  isSubscription: boolean;
}

export const PLAN_PRICING: Record<PlanType, PlanPricing> = {
  'self-hosted': {
    setupFee: 2500,
    hardwareFee: 16000, // Mac Mini
    monthlyFee: null,
    isSubscription: false,
  },
  'managed-admin': {
    setupFee: 2500,
    hardwareFee: null,
    monthlyFee: 300,
    isSubscription: true,
  },
  'managed-vps': {
    setupFee: 2500,
    hardwareFee: null,
    monthlyFee: null,
    isSubscription: false,
  },
};

export const AVAILABLE_SKILLS = [
  { id: 'weather', name: 'Clima', description: 'Consultar clima y pronósticos', free: true },
  { id: 'calendar', name: 'Calendario', description: 'Gestión de eventos y recordatorios', free: true },
  { id: 'web-search', name: 'Búsqueda Web', description: 'Buscar información en internet', free: true },
  { id: 'email', name: 'Email', description: 'Leer y enviar correos electrónicos', free: false },
  { id: 'notes', name: 'Notas', description: 'Tomar y organizar notas', free: true },
  { id: 'reminders', name: 'Recordatorios', description: 'Crear y gestionar recordatorios', free: true },
  { id: 'home-automation', name: 'Domótica', description: 'Control de dispositivos smart home', free: false },
  { id: 'finance', name: 'Finanzas', description: 'Seguimiento de gastos y presupuestos', free: false },
];

export const AI_MODELS = [
  { 
    id: 'claude-sonnet' as AIModel, 
    name: 'Claude Sonnet', 
    description: 'Equilibrio perfecto entre velocidad y capacidad',
    recommended: true,
  },
  { 
    id: 'claude-opus' as AIModel, 
    name: 'Claude Opus', 
    description: 'Máxima capacidad de razonamiento',
    recommended: false,
  },
  { 
    id: 'gpt-4o' as AIModel, 
    name: 'GPT-4o', 
    description: 'Modelo multimodal de OpenAI',
    recommended: false,
  },
  { 
    id: 'gpt-4o-mini' as AIModel, 
    name: 'GPT-4o Mini', 
    description: 'Rápido y económico',
    recommended: false,
  },
];

export const INTEGRATIONS = [
  { 
    id: 'whatsapp' as IntegrationType, 
    name: 'WhatsApp', 
    icon: '💬',
    description: 'Conecta tu WhatsApp personal o Business',
  },
  { 
    id: 'telegram' as IntegrationType, 
    name: 'Telegram', 
    icon: '✈️',
    description: 'Bot de Telegram privado',
  },
  { 
    id: 'discord' as IntegrationType, 
    name: 'Discord', 
    icon: '🎮',
    description: 'Bot para tu servidor de Discord',
  },
  { 
    id: 'slack' as IntegrationType, 
    name: 'Slack', 
    icon: '💼',
    description: 'Integración con tu workspace',
  },
  { 
    id: 'webchat' as IntegrationType, 
    name: 'Web Chat', 
    icon: '🌐',
    description: 'Chat en tu sitio web',
  },
];
