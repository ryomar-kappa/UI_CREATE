import React, { useState } from 'react';

interface ScoreData {
  overallScore: number;
  categories: {
    symmetry: number;
    proportion: number;
    skinQuality: number;
    expression: number;
  };
  recommendations: string[];
  imageUrl: string;
}

interface BeautyScoringResultsProps {
  scoreData: ScoreData | null;
  onRetry: () => void;
}

interface TabData {
  id: string;
  label: string;
  icon?: string;
}

interface MetricData {
  label: string;
  value: string;
  icon: string;
}

const BeautyScoringResults: React.FC<BeautyScoringResultsProps> = ({ scoreData, onRetry }) => {
  const [activeTab, setActiveTab] = useState('score');

  if (!scoreData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="animate-spin w-20 h-20 border-4 border-pink-500 border-t-transparent rounded-full mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-pink-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-semibold text-pink-600">Analyzing...</p>
            <p className="text-gray-500">Facial analysis offers personalized styling tips.</p>
          </div>
        </div>
      </div>
    );
  }

  const tabs: TabData[] = [
    { id: 'shape', label: 'Shape' },
    { id: 'score', label: 'Score', icon: '⭐' },
    { id: 'others', label: 'Others' },
    { id: 'eyes', label: 'Eyes' },
    { id: 'brows', label: 'Brows' },
    { id: 'lips', label: 'Lips' },
    { id: 'nose', label: 'Nose' },
  ];

  // Convert score to emotion
  const getEmotionFromScore = (expressionScore: number) => {
    if (expressionScore >= 85) return '😄';
    if (expressionScore >= 75) return '😊';
    if (expressionScore >= 65) return '🙂';
    return '😐';
  };

  // Estimate age based on overall score (demo logic)
  const getEstimatedAge = (overallScore: number) => {
    return Math.floor(20 + (100 - overallScore) * 0.3);
  };

  const metrics: MetricData[] = [
    { label: 'Emotion', value: getEmotionFromScore(scoreData.categories.expression), icon: '😊' },
    { label: 'Age', value: getEstimatedAge(scoreData.overallScore).toString(), icon: '🎂' },
  ];

  const getScoreMessage = (score: number) => {
    if (score >= 90) return '🌟Perfect!';
    if (score >= 80) return '🌟Beautiful!';
    if (score >= 70) return '🌟Great!';
    if (score >= 60) return '🌟Good!';
    return '🌟Nice!';
  };

  return (
    <div className="min-h-screen bg-white">
    </div>
  );
};

export default BeautyScoringResults;