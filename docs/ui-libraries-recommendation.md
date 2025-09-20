# 少ない設定で利用可能なUIライブラリ提案

## 概要
最小限の設定で導入でき、すぐに使えるReact UIライブラリを3つ選定しました。

## 1. Chakra UI

### 特徴
- **ゼロコンフィグ**: 基本的なセットアップのみで豊富なコンポーネントが利用可能
- **テーマカスタマイズ**: シンプルなオブジェクト記法でデザインシステムを構築
- **アクセシビリティ**: WAI-ARIAに準拠したコンポーネント

### インストール
```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

### 基本設定
```jsx
// main.tsx
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <YourApp />
    </ChakraProvider>
  )
}
```

### 利点
- TypeScript完全対応
- 豊富なコンポーネント（100+）
- レスポンシブデザインが簡単
- ダークモード対応

### 使用例
```jsx
import { Button, Box, Text } from '@chakra-ui/react'

function Example() {
  return (
    <Box p={4} bg="blue.50" borderRadius="md">
      <Text fontSize="lg" mb={4}>Hello Chakra UI</Text>
      <Button colorScheme="blue" size="md">
        Click me
      </Button>
    </Box>
  )
}
```

## 2. Ant Design (antd)

### 特徴
- **企業グレード**: 大規模なWebアプリケーション向けの成熟したライブラリ
- **国際化対応**: 多言語サポート内蔵
- **デザイン言語**: 一貫性のある洗練されたデザイン

### インストール
```bash
npm install antd
```

### 基本設定
```jsx
// main.tsx
import 'antd/dist/reset.css'; // Ant Design のスタイルをリセット

// コンポーネント内で直接import
import { Button, Card, Typography } from 'antd';
```

### 利点
- 設定不要で即座に利用開始
- 60+ の高品質コンポーネント
- フォーム処理が強力
- アイコンライブラリ内蔵

### 使用例
```jsx
import { Button, Card, Typography } from 'antd';

const { Title, Text } = Typography;

function Example() {
  return (
    <Card style={{ width: 300 }}>
      <Title level={4}>Ant Design Card</Title>
      <Text>This is a simple card example.</Text>
      <Button type="primary" style={{ marginTop: 16 }}>
        Primary Button
      </Button>
    </Card>
  )
}
```

## 3. Mantine

### 特徴
- **現代的なデザイン**: モダンで美しいデフォルトデザイン
- **フック重視**: カスタムフックで状態管理を簡素化
- **軽量**: 必要なコンポーネントのみインポート可能

### インストール
```bash
npm install @mantine/core @mantine/hooks @emotion/react
```

### 基本設定
```jsx
// main.tsx
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

function App() {
  return (
    <MantineProvider>
      <YourApp />
    </MantineProvider>
  )
}
```

### 利点
- Tree-shaking対応で軽量
- 優秀なフォームライブラリ
- 豊富なフック提供
- カスタマイゼーションが柔軟

### 使用例
```jsx
import { Button, Paper, Text } from '@mantine/core';

function Example() {
  return (
    <Paper shadow="md" p="lg" radius="md">
      <Text size="lg" mb="md">Mantine Example</Text>
      <Button variant="filled" color="blue">
        Filled Button
      </Button>
    </Paper>
  )
}
```

## 比較表

| 項目 | Chakra UI | Ant Design | Mantine |
|------|-----------|------------|---------|
| 設定の簡単さ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| コンポーネント数 | 100+ | 60+ | 40+ |
| バンドルサイズ | 中 | 大 | 小 |
| カスタマイズ性 | 高 | 中 | 高 |
| TypeScript対応 | 完全 | 完全 | 完全 |
| 学習コスト | 低 | 中 | 低 |

## 推奨

### プロジェクト特性に応じた選択
- **プロトタイプ・小規模**: **Chakra UI** - 最小設定で豊富な機能
- **企業アプリ・大規模**: **Ant Design** - 成熟した企業グレードコンポーネント
- **モダン・軽量重視**: **Mantine** - 最新のReactパターンと軽量性

### 現在のプロジェクト(FaceScore AI)には
**Chakra UI**を推奨します：
- TailwindCSSと併用可能
- グラデーションやアニメーションが簡単
- 美容分析アプリに適したモダンなコンポーネント