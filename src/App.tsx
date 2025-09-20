import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import BeautyScoringResults from './components/BeautyScoringResults';

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

function App() {
  const [currentView, setCurrentView] = useState<'upload' | 'result'>('upload');
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (file: File) => {
    setIsLoading(true);

    // ダミーデータでデモ（実際のAI処理の代わり）
    setTimeout(() => {
      const imageUrl = URL.createObjectURL(file);
      const mockScoreData: ScoreData = {
        overallScore: Math.floor(Math.random() * 30) + 70, // 70-100のランダムスコア
        categories: {
          symmetry: Math.floor(Math.random() * 30) + 70,
          proportion: Math.floor(Math.random() * 30) + 65,
          skinQuality: Math.floor(Math.random() * 25) + 75,
          expression: Math.floor(Math.random() * 35) + 65,
        },
        recommendations: [
          'より自然な笑顔を心がけることで表情スコアが向上します',
          '正面から撮影すると対称性がより正確に評価されます',
          '十分な光量のある環境での撮影をお勧めします'
        ],
        imageUrl
      };

      setScoreData(mockScoreData);
      setIsLoading(false);
      setCurrentView('result');
    }, 3000); // 3秒の解析時間をシミュレート
  };

  const handleRetry = () => {
    setCurrentView('upload');
    setScoreData(null);
    setIsLoading(false);
  };

  return (
    <div className="app">
      {currentView === 'upload' ? (
        <ImageUpload
          onImageUpload={handleImageUpload}
          isLoading={isLoading}
        />
      ) : (
        <BeautyScoringResults
          scoreData={scoreData}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}

export default App;