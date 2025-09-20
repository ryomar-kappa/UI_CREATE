import React, { useState, useCallback } from 'react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  isLoading?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        handleFile(file);
      }
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onImageUpload(file);
  };

  return (
    <div className="min-h-dvh bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 sm:px-8 py-6 sm:py-8">
        {/* ヘッダー */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-4 sm:mb-6 shadow-lg">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l6-6v13h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h4z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3 sm:mb-4">
            FaceScore AI
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            AI技術で顔の美しさを科学的に分析。あなたの魅力を数値化してお見せします。
          </p>
        </div>

        {/* メインアップロードエリア */}
        <div className="max-w-2xl mx-auto px-2 sm:px-0">
          <div
            className={`
              relative border-2 border-dashed rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center transition-all duration-300 ease-in-out
              ${dragActive
                ? 'border-purple-400 bg-purple-50 scale-105 shadow-xl'
                : 'border-gray-300 bg-white hover:border-purple-300 hover:shadow-lg'
              }
              ${isLoading ? 'pointer-events-none opacity-75' : 'cursor-pointer'}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            data-testid="upload-area"
          >
            {previewUrl ? (
              <div className="space-y-6">
                <div className="relative inline-block">
                  <img
                    src={previewUrl}
                    alt="アップロード画像プレビュー"
                    className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-cover rounded-xl sm:rounded-2xl shadow-lg mx-auto border-4 border-white"
                  />
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2">
                    <button
                      className="w-7 h-7 sm:w-8 sm:h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md transition-colors text-sm sm:text-base"
                      onClick={() => {
                        setPreviewUrl('');
                        URL.revokeObjectURL(previewUrl);
                      }}
                      data-testid="change-image-btn"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-green-600 font-medium">画像をアップロードしました</p>
                  <button
                    className="px-6 py-3 sm:px-8 sm:py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-full font-medium hover:from-purple-600 hover:to-blue-700 transform hover:scale-105 transition-all shadow-lg text-sm sm:text-base min-h-[44px]"
                    onClick={() => {
                      // 採点処理のトリガー
                    }}
                    data-testid="analyze-button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>解析中...</span>
                      </div>
                    ) : (
                      'AIで採点開始'
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-lg sm:text-xl font-semibold text-gray-700">
                    {isLoading ? 'AIが解析中...' : '顔画像をここにドロップ'}
                  </p>
                  <p className="text-sm sm:text-base text-gray-500">または下のボタンからファイルを選択</p>
                </div>

                <div className="space-y-4">
                  <label className="inline-block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileInput}
                      className="hidden"
                      data-testid="file-input"
                    />
                    <span className="px-6 py-3 sm:px-8 sm:py-3 bg-white border-2 border-purple-300 text-purple-600 rounded-full font-medium hover:bg-purple-50 hover:border-purple-400 transition-all cursor-pointer inline-block text-sm sm:text-base min-h-[44px] flex items-center">
                      📁 ファイルを選択
                    </span>
                  </label>

                  <div className="text-sm text-gray-400 space-y-1">
                    <p>対応形式: JPG, PNG, WEBP</p>
                    <p>推奨サイズ: 1MB以下</p>
                  </div>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-90 rounded-3xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
                  <p className="text-purple-600 font-medium">AIが画像を解析しています...</p>
                </div>
              </div>
            )}
          </div>

          {/* 特徴説明 */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-sm">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">高精度AI解析</h3>
              <p className="text-xs sm:text-sm text-gray-600">最新のAI技術で顔の特徴を詳細分析</p>
            </div>

            <div className="text-center p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-sm">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">プライバシー保護</h3>
              <p className="text-xs sm:text-sm text-gray-600">画像はローカルで処理、安全に保護</p>
            </div>

            <div className="text-center p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-sm">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">瞬間解析</h3>
              <p className="text-xs sm:text-sm text-gray-600">数秒で詳細な採点結果を表示</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;