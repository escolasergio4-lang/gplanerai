export interface Field {
  type: 'text' | 'number' | 'textarea' | 'select';
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
}

export interface Generator {
  id: string;
  icon: string;
  title: string;
  description: string;
  fields: Field[];
  prompt: (data: any) => string;
}

export interface ApiConfig {
  provider: 'gemini' | 'groq' | 'openai' | 'deepseek' | 'anthropic' | 'openrouter';
  key: string;
  model: string;
}

export interface PersonalizationData {
  professorName?: string;
  schoolName?: string;
  schoolYear?: string;
  didacticUnit?: string;
}

export type ViewState = 'welcome' | 'generator';
