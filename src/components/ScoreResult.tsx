import React from 'react';

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

interface ScoreResultProps {
  scoreData: ScoreData | null;
  onRetry: () => void;
}

const ScoreResult: React.FC<ScoreResultProps> = ({ scoreData, onRetry }) => {
  if (!scoreData) {
    return (
      <div className="min-h-dvh bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="animate-spin w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-semibold text-purple-600">AIが解析中...</p>
            <p className="text-gray-500">顔の特徴を詳細に分析しています</p>
          </div>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'from-emerald-400 to-green-500';
    if (score >= 80) return 'from-blue-400 to-blue-500';
    if (score >= 70) return 'from-yellow-400 to-orange-500';
    if (score >= 60) return 'from-orange-400 to-red-500';
    return 'from-red-400 to-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return '素晴らしい';
    if (score >= 80) return '良い';
    if (score >= 70) return '普通';
    if (score >= 60) return '改善の余地あり';
    return '要改善';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'symmetry':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'proportion':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        );
      case 'skinQuality':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'expression':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const categories = [
    { key: 'symmetry', name: '顔の対称性', description: '左右の顔のバランス' },
    { key: 'proportion', name: 'プロポーション', description: '黄金比との適合度' },
    { key: 'skinQuality', name: '肌の質感', description: 'なめらかさ・透明感' },
    { key: 'expression', name: '表情', description: '魅力的な表情かどうか' }
  ];

  return (
    <div className="min-h-dvh bg-white" data-testid="score-result">
    </div>
  );
};

export default ScoreResult;