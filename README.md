# StoryLENS

**文字列に、世界を与える。**

小説の予告編・ショート映像をAIクリエイターに依頼できるプラットフォーム

## 概要

StoryLENSは、作家が自作小説の予告編やショート映像をAIクリエイターに依頼できるマッチングプラットフォームです。AI監督機能により、テキストから自動的にシーン案や感情の流れを生成し、映像制作をサポートします。

## 技術スタック

### フロントエンド
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **NextAuth.js** (認証)
- **React Query** (データフェッチング)

### バックエンド
- **FastAPI** (Python)
- **Supabase** (PostgreSQL + Storage + Auth)
- **OpenAI API** (AI監督機能)

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# OAuth (Twitter/X)
TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret

# FastAPI Backend
NEXT_PUBLIC_API_URL=http://localhost:8000

# OpenAI (AI監督機能用)
OPENAI_API_KEY=your_openai_api_key
```

### 3. Supabaseのセットアップ

1. [Supabase](https://supabase.com)でプロジェクトを作成
2. `supabase/migrations/001_initial_schema.sql`を実行してデータベーススキーマを作成

### 4. バックエンドのセットアップ

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 5. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## プロジェクト構造

```
StoryLENS/
├── app/                    # Next.js App Router
│   ├── (dashboard)/        # ダッシュボード関連ページ
│   ├── api/                # API Routes
│   ├── auth/               # 認証ページ
│   └── gallery/            # ギャラリーページ
├── components/             # Reactコンポーネント
│   └── ui/                 # shadcn/uiコンポーネント
├── lib/                    # ユーティリティ関数
│   └── supabase/           # Supabaseクライアント
├── backend/                # FastAPIバックエンド
│   ├── main.py             # FastAPIアプリケーション
│   └── requirements.txt    # Python依存関係
└── supabase/               # Supabase関連
    └── migrations/          # データベースマイグレーション
```

## 主な機能

### MVP機能
- ✅ ユーザー認証（メール + X OAuth）
- ✅ 作品登録
- ✅ AI監督機能（シーン案・感情アーク生成）
- ✅ 案件作成・公開
- ✅ クリエイターからの提案
- ✅ チャット機能
- ✅ ギャラリー（公開ポートフォリオ）

### 今後の機能
- 決済連携（Stripe）
- 評価・レビュー機能
- 自動マッチング
- 読者アカウント
- ショートドラマ構造へのAI変換

## 開発

### データベースマイグレーション

SupabaseのSQL Editorで`supabase/migrations/001_initial_schema.sql`を実行してください。

### API開発

FastAPIの自動生成ドキュメントは `http://localhost:8000/docs` で確認できます。

## ライセンス

このプロジェクトはプライベートプロジェクトです。

