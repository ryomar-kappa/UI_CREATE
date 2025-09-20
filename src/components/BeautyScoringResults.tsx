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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 sm:px-8 py-6 sm:py-8">
        {/* リザルト文言 */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3 sm:mb-4">
            {getScoreMessage(scoreData.overallScore)}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            AIによる顔分析が完了しました
          </p>
        </div>

        {/* 顔画像 */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="relative">
            <img
              src={scoreData.imageUrl}
              alt="分析画像"
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-cover rounded-xl sm:rounded-2xl shadow-lg border-4 border-white"
            />
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-lg">
              {scoreData.overallScore}
            </div>
          </div>
        </div>

        {/* タブView */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* タブヘッダー */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('score')}
                className={`flex-1 py-4 px-6 text-center font-medium transition-all ${
                  activeTab === 'score'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                Score
              </button>
              <button
                onClick={() => setActiveTab('shape')}
                className={`flex-1 py-4 px-6 text-center font-medium transition-all ${
                  activeTab === 'shape'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                Shape
              </button>
            </div>

            {/* タブコンテンツ */}
            <div className="p-6 sm:p-8">
              {activeTab === 'score' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      {scoreData.overallScore}
                    </div>
                    <p className="text-gray-600">総合スコア</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">対称性</span>
                      <span className="font-semibold text-purple-600">{scoreData.categories.symmetry}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">比例</span>
                      <span className="font-semibold text-purple-600">{scoreData.categories.proportion}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">肌質</span>
                      <span className="font-semibold text-purple-600">{scoreData.categories.skinQuality}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">表情</span>
                      <span className="font-semibold text-purple-600">{scoreData.categories.expression}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'shape' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">顔の形状分析</h3>
                  </div>

                  <div className="space-y-4">
                    {metrics.map((metric, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-700 flex items-center">
                          <span className="mr-2">{metric.icon}</span>
                          {metric.label}
                        </span>
                        <span className="font-semibold text-purple-600">{metric.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center text-gray-600 text-sm">
                    <p>顔の形状と特徴を分析した結果です</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* やり直しボタン */}
          <div className="text-center mt-8">
            <button
              onClick={onRetry}
              className="px-8 py-3 bg-white text-purple-600 border-2 border-purple-300 rounded-full font-medium hover:bg-purple-50 hover:border-purple-400 transition-all shadow-lg"
            >
              もう一度解析する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeautyScoringResults;