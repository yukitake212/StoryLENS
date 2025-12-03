# StoryLENS API仕様書

> 最終更新: 2025-01-XX  
> MVP版 API仕様

## 概要

StoryLENSのAPIは、Next.js API Routes（BFF）とFastAPI（Core API）の2層構成です。

- **BFF (Backend for Frontend)**: Next.js API Routes
- **Core API**: FastAPI（Python）

## 認証

### NextAuth.js (Next.js側)

- エンドポイント: `/api/auth/[...nextauth]`
- 認証方式: JWT + Supabase Auth
- プロバイダー:
  - Email/Password
  - X (Twitter) OAuth

### Supabase Auth

- 認証はSupabase Authを使用
- RLS (Row Level Security) でデータアクセスを制御

## FastAPI Core API

### ベースURL

```
http://localhost:8000
```

### エンドポイント

#### 1. ヘルスチェック

```http
GET /health
```

**レスポンス:**
```json
{
  "status": "ok"
}
```

#### 2. AI監督機能 - アウトライン生成

```http
POST /ai/outline
Content-Type: application/json
```

**リクエストボディ:**
```json
{
  "work_id": "uuid",
  "sample_text": "小説の抜粋テキスト（最大2000文字）"
}
```

**レスポンス:**
```json
{
  "emotion_arc": ["不安", "緊張", "希望"],
  "scenes": [
    {
      "description": "シーン1の説明",
      "emotion": "不安",
      "camera_work": "クローズアップ"
    },
    {
      "description": "シーン2の説明",
      "emotion": "緊張",
      "camera_work": "ワイドショット"
    }
  ],
  "atmosphere": "ダーク",
  "key_metaphors": ["光と影", "時間の流れ"]
}
```

**エラーレスポンス:**
```json
{
  "detail": "AI outline generation failed: [エラー詳細]"
}
```

**ステータスコード:**
- `200`: 成功
- `500`: サーバーエラー

## Next.js API Routes (BFF)

### 認証関連

#### ログイン

```http
POST /api/auth/signin
```

#### ログアウト

```http
POST /api/auth/signout
```

#### セッション取得

```http
GET /api/auth/session
```

## Supabase データベースAPI

### テーブル一覧

#### profiles
- `GET /rest/v1/profiles` - プロファイル一覧取得
- `GET /rest/v1/profiles?id=eq.{id}` - プロファイル取得
- `POST /rest/v1/profiles` - プロファイル作成
- `PATCH /rest/v1/profiles?id=eq.{id}` - プロファイル更新

#### works
- `GET /rest/v1/works` - 作品一覧取得
- `GET /rest/v1/works?id=eq.{id}` - 作品取得
- `POST /rest/v1/works` - 作品作成
- `PATCH /rest/v1/works?id=eq.{id}` - 作品更新

#### projects
- `GET /rest/v1/projects` - 案件一覧取得
- `GET /rest/v1/projects?id=eq.{id}` - 案件取得
- `POST /rest/v1/projects` - 案件作成
- `PATCH /rest/v1/projects?id=eq.{id}` - 案件更新

#### proposals
- `GET /rest/v1/proposals` - 提案一覧取得
- `POST /rest/v1/proposals` - 提案作成
- `PATCH /rest/v1/proposals?id=eq.{id}` - 提案更新

#### messages
- `GET /rest/v1/messages?project_id=eq.{project_id}` - メッセージ一覧取得
- `POST /rest/v1/messages` - メッセージ送信

#### gallery_items
- `GET /rest/v1/gallery_items?is_published=eq.true` - 公開ギャラリー取得

## 認証ヘッダー

Supabase APIを使用する場合、認証トークンをヘッダーに含める必要があります：

```http
Authorization: Bearer {access_token}
apikey: {anon_key}
```

## エラーハンドリング

### 標準エラーレスポンス

```json
{
  "error": "エラーメッセージ",
  "code": "ERROR_CODE",
  "details": {}
}
```

### ステータスコード

- `200`: 成功
- `201`: 作成成功
- `400`: バリデーションエラー
- `401`: 認証エラー
- `403`: 権限エラー
- `404`: リソースが見つからない
- `500`: サーバーエラー

## レート制限

現在、レート制限は実装されていません。将来的に実装予定。

## バージョニング

現在はv0.1（MVP版）です。APIのバージョニングは将来実装予定。








