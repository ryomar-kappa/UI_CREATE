// Type definitions for Beauty Genius workflow

export enum WorkflowStep {
  WELCOME = "welcome",
  IMAGE_UPLOAD = "image_upload",
  AGE_INPUT = "age_input",
  SKIN_ANALYSIS = "skin_analysis",
  ANALYSIS_RESULT = "analysis_result",
  SKINCARE_RECOMMENDATION = "skincare_recommendation",
}

export type SkinType = "dry" | "oily" | "normal" | "combination" | "sensitive";

export type AnalysisStatus =
  | "idle"
  | "uploading"
  | "uploaded"
  | "analyzing"
  | "complete"
  | "error";

export interface AnalysisResult {
  skinType: SkinType;
  confidenceScore: number;
  ageEstimate?: number;
  skinConcerns: string[];
  recommendations: ProductRecommendation[];
}

export interface ProductRecommendation {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  benefits: string[];
}

export interface ProductData {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  price: number;
}

export interface BeautyGeniusWorkflowProps {
  isOpen?: boolean;
  onClose?: () => void;
  productData?: ProductData;
  className?: string;
}

export interface StepComponentProps {
  onNext: () => void;
  onBack?: () => void;
  onClose?: () => void;
}

export interface ImageUploadProps extends StepComponentProps {
  onImageUpload: (file: File) => void;
  uploadProgress: number;
  analysisStatus: AnalysisStatus;
}

export interface AgeInputProps extends StepComponentProps {
  age: number;
  onAgeChange: (age: number) => void;
}

export interface AnalysisResultProps extends StepComponentProps {
  analysisResult: AnalysisResult | null;
  isAnalyzing: boolean;
}

export interface SkinAnalysisProps extends StepComponentProps {
  analysisStatus: AnalysisStatus;
}

export interface BeautyGeniusStore {
  // State
  currentStep: WorkflowStep;
  isOpen: boolean;
  uploadedImage: File | null;
  userAge: number;
  skinType: SkinType;
  analysisResult: AnalysisResult | null;
  analysisStatus: AnalysisStatus;
  uploadProgress: number;

  // Actions
  setStep: (step: WorkflowStep) => void;
  setIsOpen: (isOpen: boolean) => void;
  setImage: (file: File) => void;
  setAge: (age: number) => void;
  setSkinType: (type: SkinType) => void;
  setAnalysisResult: (result: AnalysisResult) => void;
  setAnalysisStatus: (status: AnalysisStatus) => void;
  setUploadProgress: (progress: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  reset: () => void;
}
