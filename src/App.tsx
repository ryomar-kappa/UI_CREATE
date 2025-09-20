import React, { useState } from 'react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import ImageUpload from './components/ImageUpload';
import BeautyScoringResults from './components/BeautyScoringResults';
import BeautyScoringResultsChakra from './components/chakra/BeautyScoringResultsChakra';

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

  // UI切り替え用のstate（ChakraUI使用フラグ）
  const [useChakraUI, setUseChakraUI] = useState(false);

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

  // UIライブラリ切り替え関数
  const toggleUI = () => {
    setUseChakraUI(!useChakraUI);
  };

  // UI切り替えボタンコンポーネント
  const UIToggleButton = () => (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <button
        onClick={toggleUI}
        style={{
          padding: '8px 16px',
          backgroundColor: useChakraUI ? '#805AD5' : '#374151',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: '500'
        }}
      >
        {useChakraUI ? 'ChakraUI' : 'TailwindCSS'}
      </button>
      <div style={{
        fontSize: '10px',
        color: '#666',
        textAlign: 'center'
      }}>
        Current: {useChakraUI ? 'Chakra' : 'Tailwind'}
      </div>
    </div>
  );

  // ChakraUI使用時はChakraProviderでラップ
  if (useChakraUI) {
    return (
      <ChakraProvider value={defaultSystem}>
        <div className="app">
          <UIToggleButton />
          {currentView === 'upload' ? (
            <ImageUpload
              onImageUpload={handleImageUpload}
              isLoading={isLoading}
            />
          ) : (
            <BeautyScoringResultsChakra
              scoreData={scoreData}
              onRetry={handleRetry}
            />
          )}
        </div>
      </ChakraProvider>
    );
  }

  // TailwindCSS使用時は通常のReactレンダリング
  return (
    <div className="app">
      <UIToggleButton />
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