# UIライブラリ切り替えガイド

## 概要
FaceScore AIアプリケーションにChakraUIとTailwindCSSの両方のUIライブラリを実装し、リアルタイムで切り替え可能な仕組みを構築しました。

## ディレクトリ構成

```
src/
├── components/
│   ├── BeautyScoringResults.tsx     # TailwindCSS版
│   ├── ImageUpload.tsx              # 共通（TailwindCSS）
│   ├── ScoreResult.tsx              # 既存ファイル
│   └── chakra/
│       └── BeautyScoringResultsChakra.tsx  # ChakraUI版
├── App.tsx                          # UIライブラリ切り替え機能付き
└── main.tsx
```

## 実装した機能

### 1. ChakraUI版Result画面
- **ファイル**: `src/components/chakra/BeautyScoringResultsChakra.tsx`
- **特徴**:
  - ChakraUIのコンポーネントシステムを活用
  - `Tabs`, `Progress`, `Stat`などの高機能コンポーネント使用
  - ダークモード対応（`useColorModeValue`）
  - よりリッチなアニメーションとインタラクション

### 2. UI切り替え機能
- **実装場所**: `App.tsx`
- **機能**:
  - 右上の切り替えボタンでリアルタイム切り替え
  - 現在のUIライブラリ表示
  - ChakraUI使用時のみ`ChakraProvider`でラップ

### 3. 切り替えボタン
- **位置**: 画面右上固定
- **表示**:
  - TailwindCSS使用時: 灰色背景「TailwindCSS」
  - ChakraUI使用時: 紫色背景「ChakraUI」
  - Current状態表示

## 使用方法

### 開発中の切り替え
1. 画面右上の切り替えボタンをクリック
2. リアルタイムでUIライブラリが切り替わる
3. 各画面で動作確認が可能

### コード内での制御
```typescript
// App.tsx内
const [useChakraUI, setUseChakraUI] = useState(false);

// 切り替え関数
const toggleUI = () => {
  setUseChakraUI(!useChakraUI);
};

// コンポーネント選択
useChakraUI ? (
  <BeautyScoringResultsChakra />
) : (
  <BeautyScoringResults />
)
```

## ChakraUI版の特徴

### 利点
1. **豊富なコンポーネント**: `Progress`, `Tabs`, `Stat`など高機能
2. **アクセシビリティ**: WAI-ARIA準拠の自動対応
3. **ダークモード**: 簡単なダークモード対応
4. **一貫性**: デザインシステムの一貫性が保証

### TailwindCSS版との比較
| 項目 | TailwindCSS | ChakraUI |
|------|-------------|----------|
| カスタマイズ性 | 高 | 中 |
| 開発速度 | 中 | 高 |
| バンドルサイズ | 小 | 中 |
| アクセシビリティ | 手動実装 | 自動対応 |
| 学習コスト | 高 | 低 |

## 今後の拡張

### 他画面への展開
1. `ImageUpload`コンポーネントのChakraUI版実装
2. 共通コンポーネントの作成
3. 設定画面でのUI選択機能

### パフォーマンス最適化
1. 使用しないUIライブラリの動的インポート
2. ChakraProvider の条件付きラップ
3. バンドルサイズの最適化

## メンテナンス

### ファイル管理
- 元のTailwindCSS版は`components/`直下
- ChakraUI版は`components/chakra/`下
- 両方のファイルを維持し、並行開発可能

### 命名規則
- ChakraUI版ファイル名: `{ComponentName}Chakra.tsx`
- インポート時の区別を明確化
- 型定義は共通利用