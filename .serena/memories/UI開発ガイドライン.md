# UI開発ガイドライン

## ファイル命名規則
- mdファイルは日本語名で保存すること

## ディレクトリ構成
- src/components/ : 元のTailwind CSS版コンポーネント
- src/components/chakra/ : ChakraUI版コンポーネント

## 切り替え方式
- 元のコードを残しつつ、新しいUIライブラリ版を並行実装
- すぐに切り替えできるような構成を維持