# StoryLENS セットアップガイド

## 前提条件

- Node.js 18以上
- Python 3.10以上
- Supabaseアカウント
- OpenAI APIキー（AI監督機能を使用する場合）

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com)にアクセスしてアカウントを作成
2. 新しいプロジェクトを作成
3. プロジェクトの「Settings」→「API」から以下を取得：
   - Project URL
   - anon/public key
   - service_role key

### 3. データベーススキーマの適用

1. Supabaseのダッシュボードで「SQL Editor」を開く
2. `supabase/migrations/001_initial_schema.sql`の内容をコピー＆ペースト
3. 「Run」をクリックして実行

### 4. 環境変数の設定

プロジェクトルートに`.env.local`ファイルを作成：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=任意のランダムな文字列（openssl rand -base64 32で生成可能）

# OAuth (Twitter/X) - オプション
TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret

# FastAPI Backend
NEXT_PUBLIC_API_URL=http://localhost:8000

# OpenAI (AI監督機能用)
OPENAI_API_KEY=your_openai_api_key
```

### 5. バックエンドのセットアップ

```bash
cd backend

# 仮想環境を作成（Windows）
python -m venv venv
venv\Scripts\activate

# 仮想環境を作成（macOS/Linux）
python3 -m venv venv
source venv/bin/activate

# 依存関係をインストール
pip install -r requirements.txt

# バックエンドサーバーを起動
uvicorn main:app --reload
```

### 6. フロントエンドの起動

新しいターミナルで：

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## トラブルシューティング

### NextAuthのエラー

- `NEXTAUTH_SECRET`が設定されているか確認
- `NEXTAUTH_URL`が正しく設定されているか確認

### Supabase接続エラー

- 環境変数が正しく設定されているか確認
- Supabaseプロジェクトがアクティブか確認
- RLS（Row Level Security）ポリシーが正しく設定されているか確認

### FastAPI接続エラー

- バックエンドサーバーが起動しているか確認
- `NEXT_PUBLIC_API_URL`が正しく設定されているか確認
- CORS設定を確認（`backend/main.py`）

## 次のステップ

1. ユーザー登録・ログイン機能のテスト
2. 作品登録機能のテスト
3. AI監督機能のテスト
4. 案件作成・提案機能のテスト

