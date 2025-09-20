// Beauty Genius workflow main component

import React, { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBeautyGeniusStore } from '../../store/beautyGeniusStore';
import { WorkflowStep, BeautyGeniusWorkflowProps } from '../../types/beautyGenius';
import { analyzeImage } from '../../utils/imageUtils';
import { fadeInVariants } from '../../constants/animations';
import { colors } from '../../constants/designTokens';

// Import step components
import { WelcomeStep } from './steps/WelcomeStep';
import { ImageUploadStep } from './steps/ImageUploadStep';
import { AgeInputStep } from './steps/AgeInputStep';
import { AnalysisResultStep } from './steps/AnalysisResultStep';

// Import common components
import { StepTransition } from './components/StepTransition';
import { ProgressIndicator } from './components/ProgressIndicator';

export const BeautyGeniusWorkflow: React.FC<BeautyGeniusWorkflowProps> = ({
  className = '',
  onClose,
}) => {
  const {
    currentStep,
    uploadedImage,
    userAge,
    analysisResult,
    analysisStatus,
    uploadProgress,
    setImage,
    setAge,
    setAnalysisResult,
    setAnalysisStatus,
    setUploadProgress,
    nextStep,
    previousStep,
    reset,
  } = useBeautyGeniusStore();

  // Handle image upload and analysis
  const handleImageUpload = useCallback(async (file: File) => {
    try {
      setImage(file);
      setAnalysisStatus('uploading');

      // Simulate upload progress
      let progress = 0;
      const uploadInterval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(uploadInterval);
          setAnalysisStatus('analyzing');
        }
      }, 100);

      // Analyze image
      const result = await analyzeImage(file);

      // Create analysis result
      const analysisResult = {
        skinType: result.skinType as any,
        confidenceScore: result.confidenceScore,
        ageEstimate: result.ageEstimate,
        skinConcerns: [
          'Fine lines around eyes',
          'Uneven skin tone',
          'Enlarged pores on nose',
        ],
        recommendations: [
          {
            id: '1',
            name: 'Hydrating Serum',
            description: 'Boost skin moisture',
            imageUrl: '/placeholder-product.jpg',
            price: 45,
            category: 'Serum',
            benefits: ['Hydration', 'Plumping', 'Anti-aging'],
          },
          {
            id: '2',
            name: 'Gentle Cleanser',
            description: 'Daily cleansing foam',
            imageUrl: '/placeholder-product.jpg',
            price: 25,
            category: 'Cleanser',
            benefits: ['Gentle', 'Effective', 'Non-drying'],
          },
        ],
      };

      setAnalysisResult(analysisResult);
      setAnalysisStatus('complete');

      // Auto-advance to next step after analysis completion
      setTimeout(() => {
        nextStep();
      }, 2000); // 2秒後に自動的に次のステップに進む
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysisStatus('error');
    }
  }, [setImage, setAnalysisStatus, setUploadProgress, setAnalysisResult, nextStep]);

  // Handle step navigation
  const handleNext = useCallback(() => {
    nextStep();
  }, [nextStep]);

  const handleBack = useCallback(() => {
    previousStep();
  }, [previousStep]);

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      reset();
    }
  }, [onClose, reset]);

  // Render current step
  const renderCurrentStep = () => {
    const commonProps = {
      onNext: handleNext,
      onBack: currentStep !== WorkflowStep.WELCOME ? handleBack : undefined,
      onClose: handleClose,
    };

    switch (currentStep) {
      case WorkflowStep.WELCOME:
        return <WelcomeStep {...commonProps} />;

      case WorkflowStep.IMAGE_UPLOAD:
        return (
          <ImageUploadStep
            {...commonProps}
            onImageUpload={handleImageUpload}
            uploadProgress={uploadProgress}
            analysisStatus={analysisStatus}
          />
        );

      case WorkflowStep.AGE_INPUT:
        return (
          <AgeInputStep
            {...commonProps}
            age={userAge}
            onAgeChange={setAge}
          />
        );

      case WorkflowStep.ANALYSIS_RESULT:
        return (
          <AnalysisResultStep
            {...commonProps}
            analysisResult={analysisResult}
            isAnalyzing={analysisStatus === 'analyzing'}
          />
        );

      case WorkflowStep.SKINCARE_RECOMMENDATION:
        return (
          <motion.div
            variants={fadeInVariants}
            initial="initial"
            animate="animate"
            className="text-center space-y-6 max-w-md mx-auto"
          >
            <h2 className="text-2xl font-bold text-gray-900">
              Product Recommendations
            </h2>
            <p className="text-gray-600">
              Based on your skin analysis, here are our personalized recommendations.
            </p>

            {analysisResult?.recommendations && (
              <div className="space-y-4">
                {analysisResult.recommendations.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
                  >
                    <h3 className="font-bold text-gray-900">{product.name}</h3>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-lg font-bold" style={{ color: colors.accent.main }}>
                        ${product.price}
                      </span>
                      <button
                        className="px-4 py-2 rounded-lg font-medium text-white text-sm"
                        style={{ backgroundColor: colors.accent.main }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col space-y-3">
              <button
                onClick={handleClose}
                className="w-full py-3 px-6 rounded-lg font-medium text-white"
                style={{ backgroundColor: colors.accent.main }}
              >
                Complete Analysis
              </button>
              <button
                onClick={handleBack}
                className="w-full py-3 px-6 rounded-lg font-medium text-gray-600 border border-gray-300 hover:bg-gray-50"
              >
                Back to Results
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 py-8 px-4 ${className}`}>
      <div className="max-w-2xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <ProgressIndicator currentStep={currentStep} />
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[600px]">
          <StepTransition stepKey={currentStep}>
            {renderCurrentStep()}
          </StepTransition>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Powered by L'Oréal Beauty Genius AI
          </p>
        </div>
      </div>
    </div>
  );
};