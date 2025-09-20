// Zustand store for Beauty Genius workflow state management

import { create } from 'zustand';
import {
  BeautyGeniusStore,
  WorkflowStep,
  SkinType,
  AnalysisResult,
  AnalysisStatus
} from '../types/beautyGenius';

const stepOrder: WorkflowStep[] = [
  WorkflowStep.WELCOME,
  WorkflowStep.IMAGE_UPLOAD,
  WorkflowStep.AGE_INPUT,
  WorkflowStep.SKIN_ANALYSIS,
  WorkflowStep.ANALYSIS_RESULT,
  WorkflowStep.SKINCARE_RECOMMENDATION,
];

export const useBeautyGeniusStore = create<BeautyGeniusStore>((set, get) => ({
  // Initial state
  currentStep: WorkflowStep.WELCOME,
  isOpen: true, // Always open since it's not a modal
  uploadedImage: null,
  userAge: 25,
  skinType: "normal",
  analysisResult: null,
  analysisStatus: "idle",
  uploadProgress: 0,

  // Actions
  setStep: (step: WorkflowStep) => set({ currentStep: step }),

  setIsOpen: (isOpen: boolean) => set({ isOpen }),

  setImage: (file: File) => set({ uploadedImage: file }),

  setAge: (age: number) => set({ userAge: age }),

  setSkinType: (type: SkinType) => set({ skinType: type }),

  setAnalysisResult: (result: AnalysisResult) => set({ analysisResult: result }),

  setAnalysisStatus: (status: AnalysisStatus) => set({ analysisStatus: status }),

  setUploadProgress: (progress: number) => set({ uploadProgress: progress }),

  nextStep: () => {
    const currentStep = get().currentStep;
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      set({ currentStep: stepOrder[currentIndex + 1] });
    }
  },

  previousStep: () => {
    const currentStep = get().currentStep;
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      let targetIndex = currentIndex - 1;
      if (
        stepOrder[targetIndex] === WorkflowStep.SKIN_ANALYSIS &&
        targetIndex > 0
      ) {
        targetIndex -= 1;
      }
      set({ currentStep: stepOrder[targetIndex] });
    }
  },

  reset: () => set({
    currentStep: WorkflowStep.WELCOME,
    uploadedImage: null,
    userAge: 25,
    skinType: "normal",
    analysisResult: null,
    analysisStatus: "idle",
    uploadProgress: 0,
  }),
}));
