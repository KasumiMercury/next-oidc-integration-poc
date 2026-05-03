# 開発環境オンボーディング

## 依存関係インストール
### miseによる依存関係のインストール

プロジェクトの`mise.toml`を信用
```bash
mise trust
```

mise経由で依存関係をインストール
```bash
mise install
```

### frontの依存関係インストール

```bash
cd front
pnpm install
```

## 開発サーバの起動/停止

### 全体起動/停止

OIDC Providerを含む全てのサービスを起動する際はDocker Composeを使用する
最終的な一連の動作確認時等に使用

```bash
docker compose up --watch --build
```

`--build`オプションはDockerfileを元にイメージをビルドするオプション
-> 変更が適用されなかった場合はまずこのオプションを付けて起動を試してみる

`--watch`オプションはファイルの変更を監視して自動で再起動するオプション
-> frontの変更をホットリロードさせるために使用，基本つけておく
なお`docker compose watch`でも起動できるが，ログの出力が見づらくなるため`--watch`オプションがオススメ

起動状況の確認は
```bash
docker compose ps
```

停止は
```bash
docker compose down
```

### frontのみ起動/停止

```bash
cd front
pnpm dev
```
でfrontで開発サーバを起動できる
この際起動するのはNext.jsの開発サーバ
OIDC Providerは起動しないので，Previewモードに入り，画面の確認のみ可能になる

停止は Ctrl + C
