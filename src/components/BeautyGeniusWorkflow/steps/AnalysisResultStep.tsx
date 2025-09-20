// Analysis result step component

import React from "react";
import { motion } from "framer-motion";
import {
  buttonVariants,
  staggerContainer,
  staggerItem,
} from "../../../constants/animations";
import { colors } from "../../../constants/designTokens";
import { AnalysisResultProps, SkinType } from "../../../types/beautyGenius";

const skinTypeDescriptions: Record<
  SkinType,
  { title: string; description: string; icon: string; tips: string[] }
> = {
  normal: {
    title: "普通肌",
    description: "肌の水分と油分がバランス良く、なめらかで健康的な状態です。",
    icon: "✨",
    tips: [
      "毎日のやさしい洗顔でコンディションを保ちましょう",
      "軽めの保湿剤を使いましょう",
      "毎日日焼け止めを塗りましょう",
    ],
  },
  dry: {
    title: "乾燥肌",
    description: "肌がつっぱりやすく、十分な保湿が必要な状態です。",
    icon: "💧",
    tips: [
      "クリームタイプの洗顔料を使いましょう",
      "朝晩2回、こっくりした保湿クリームでケアしましょう",
      "保湿力の高い美容液を取り入れましょう",
    ],
  },
  oily: {
    title: "脂性肌",
    description:
      "皮脂が多く分泌され、テカりや毛穴の目立ちにつながりやすい肌質です。",
    icon: "🌟",
    tips: [
      "ジェルタイプの洗顔料でさっぱり洗いましょう",
      "オイルフリーの保湿剤を使いましょう",
      "サリチル酸配合のアイテムを検討しましょう",
    ],
  },
  combination: {
    title: "混合肌",
    description: "Tゾーンは脂っぽく、頬は普通〜乾燥傾向の肌質です。",
    icon: "🎭",
    tips: [
      "部位に合わせてアイテムを使い分けましょう",
      "全体は刺激の少ない洗顔料でやさしく洗いましょう",
      "Tゾーンは軽め、頬はしっかりめの保湿で調整しましょう",
    ],
  },
  sensitive: {
    title: "敏感肌",
    description:
      "刺激に反応しやすく、特定の成分で赤みや違和感が出やすい肌質です。",
    icon: "🌸",
    tips: [
      "無香料でシンプルな処方を選びましょう",
      "新しいアイテムはパッチテストを行いましょう",
      "低刺激で低アレルギー処方の製品を選びましょう",
    ],
  },
};

export const AnalysisResultStep: React.FC<AnalysisResultProps> = ({
  analysisResult,
  isAnalyzing,
  onNext,
  onBack,
  onClose,
}) => {
  if (isAnalyzing || !analysisResult) {
    return null;
  }

  const skinInfo = skinTypeDescriptions[analysisResult.skinType];

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="max-w-lg mx-auto space-y-8"
    >
      {/* Header */}
      <motion.div variants={staggerItem} className="text-center space-y-4">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-3xl">{skinInfo.icon}</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">肌分析の結果</h2>
      </motion.div>

      {/* Main Result */}
      <motion.div
        variants={staggerItem}
        className="bg-white rounded-xl shadow-lg p-6 space-y-4"
      >
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-gray-900">{skinInfo.title}</h3>
          <p className="text-gray-600">{skinInfo.description}</p>
        </div>

        <div className="flex items-center justify-center space-x-6 py-4">
          <div className="text-center">
            <div
              className="text-2xl font-bold"
              style={{ color: colors.accent.main }}
            >
              {Math.round(analysisResult.confidenceScore * 100)}%
            </div>
            <div className="text-sm text-gray-500">信頼度</div>
          </div>

          {analysisResult.ageEstimate && (
            <div className="text-center">
              <div
                className="text-2xl font-bold"
                style={{ color: colors.accent.main }}
              >
                {analysisResult.ageEstimate}
              </div>
              <div className="text-sm text-gray-500">推定年齢</div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Skincare Tips */}
      <motion.div
        variants={staggerItem}
        className="bg-blue-50 rounded-lg p-6 space-y-4"
      >
        <h3 className="font-bold text-blue-900">💡 おすすめのケア方法</h3>
        <ul className="space-y-2">
          {skinInfo.tips.map((tip, index) => (
            <li
              key={index}
              className="flex items-start space-x-2 text-blue-800"
            >
              <span className="text-blue-600 mt-1">•</span>
              <span className="text-sm">{tip}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Skin Concerns */}
      {analysisResult.skinConcerns.length > 0 && (
        <motion.div
          variants={staggerItem}
          className="bg-yellow-50 rounded-lg p-6 space-y-4"
        >
          <h3 className="font-bold text-yellow-900">
            ⚠️ 特にケアしたいポイント
          </h3>
          <ul className="space-y-2">
            {analysisResult.skinConcerns.map((concern, index) => (
              <li
                key={index}
                className="flex items-start space-x-2 text-yellow-800"
              >
                <span className="text-yellow-600 mt-1">•</span>
                <span className="text-sm">{concern}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <motion.div variants={staggerItem} className="flex flex-col space-y-3">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onNext}
          className="w-full py-3 px-6 rounded-lg font-medium text-white shadow-md"
          style={{ backgroundColor: colors.accent.main }}
        >
          おすすめ製品を見る
        </motion.button>

        <div className="flex space-x-3">
          {onBack && (
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={onBack}
              className="flex-1 py-3 px-6 rounded-lg font-medium text-gray-600 border border-gray-300 hover:bg-gray-50"
            >
              戻る
            </motion.button>
          )}

          {onClose && (
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={onClose}
              className="flex-1 py-3 px-6 rounded-lg font-medium text-gray-600 border border-gray-300 hover:bg-gray-50"
            >
              閉じる
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
