// UI生成関連の型定義
export interface UIGenerationRequest {
  keywords: string[];
  requirements: string;
  designStyle?: 'modern' | 'classic' | 'minimal' | 'colorful';
  targetDevice?: 'desktop' | 'mobile' | 'tablet';
}

export interface GeneratedComponent {
  id: string;
  name: string;
  code: string;
  preview?: string;
  metadata: ComponentMetadata;
}

export interface ComponentMetadata {
  keywords: string[];
  createdAt: Date;
  framework: 'react' | 'vue' | 'angular';
  dependencies: string[];
}

// PlayWright関連の型定義
export interface TestScenario {
  id: string;
  name: string;
  steps: TestStep[];
  expectedResults: string[];
}

export interface TestStep {
  action: 'click' | 'type' | 'wait' | 'assert';
  target: string;
  value?: string;
  timeout?: number;
}

// デザイン生成関連の型定義
export interface DesignTheme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
}

export interface LayoutOptions {
  layout: 'grid' | 'flex' | 'absolute';
  spacing: 'tight' | 'normal' | 'loose';
  responsive: boolean;
}