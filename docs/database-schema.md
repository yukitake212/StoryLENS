# StoryLENS データベーススキーマ

> 最終更新: 2025-01-XX  
> Supabase PostgreSQL スキーマ

## 概要

StoryLENSはSupabase（PostgreSQL）を使用してデータを管理します。Row Level Security (RLS) により、ユーザーごとにデータアクセスを制御しています。

## テーブル一覧

### 1. profiles

ユーザープロファイル情報を格納します。Supabase Authの`auth.users`テーブルと1対1の関係です。

| カラム名 | 型 | 制約 | 説明 |
|---------|-----|------|------|
| id | UUID | PK, FK → auth.users | ユーザーID |
| role | TEXT | NOT NULL, CHECK | ロール（author/creator/admin） |
| handle | TEXT | UNIQUE | ハンドル名 |
| display_name | TEXT | | 表示名 |
| bio | TEXT | | 自己紹介 |
| avatar_url | TEXT | | アバター画像URL |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | 作成日時 |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | 更新日時 |

**RLSポリシー:**
- ユーザーは自分のプロファイルのみ閲覧・更新可能
- ユーザーは自分のプロファイルを作成可能

### 2. works

小説作品の情報を格納します。

| カラム名 | 型 | 制約 | 説明 |
|---------|-----|------|------|
| id | UUID | PK | 作品ID |
| author_id | UUID | FK → profiles.id | 作者ID |
| title | TEXT | NOT NULL | タイトル |
| summary | TEXT | | あらすじ |
| genre | TEXT | | ジャンル |
| external_url | TEXT | | 外部URL（なろう等） |
| sample_text | TEXT | | 抜粋テキスト |
| ai_outline_json | JSONB | | AI監督の結果（JSON） |
| is_public | BOOLEAN | DEFAULT false | 公開フラグ |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | 作成日時 |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | 更新日時 |

**RLSポリシー:**
- 作者は自分の作品のみ閲覧・作成・更新可能
- 公開作品（is_public=true）は全員が閲覧可能

**インデックス:**
- `idx_works_author_id` on `author_id`

### 3. creator_profiles

クリエイターのプロファイル情報を格納します。

| カラム名 | 型 | 制約 | 説明 |
|---------|-----|------|------|
| user_id | UUID | PK, FK → profiles.id | ユーザーID |
| specialties | TEXT[] | | 得意ジャンル配列 |
| tools | TEXT[] | | 使用ツール配列 |
| price_min | INTEGER | | 最低単価 |
| price_max | INTEGER | | 最高単価 |
| portfolio_url | TEXT | | ポートフォリオURL |
| skill_tags | TEXT[] | | スキルタグ配列 |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | 作成日時 |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | 更新日時 |

### 4. projects

依頼案件の情報を格納します。

| カラム名 | 型 | 制約 | 説明 |
|---------|-----|------|------|
| id | UUID | PK | 案件ID |
| work_id | UUID | FK → works.id | 作品ID |
| author_id | UUID | FK → profiles.id | 依頼者ID |
| creator_id | UUID | FK → profiles.id, NULL可 | 受注クリエイターID |
| title | TEXT | NOT NULL | 案件タイトル |
| purpose | TEXT | | 目的（予告編/X投稿用等） |
| duration_seconds | INTEGER | | 尺（秒） |
| budget_min | INTEGER | | 最低予算 |
| budget_max | INTEGER | | 最高予算 |
| deadline | TIMESTAMPTZ | | 納期 |
| status | TEXT | NOT NULL, CHECK | ステータス |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | 作成日時 |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | 更新日時 |

**ステータス値:**
- `open`: 公開中
- `in_negotiation`: 交渉中
- `contracted`: 契約済み
- `in_progress`: 制作中
- `delivered`: 納品済み
- `completed`: 完了
- `cancelled`: キャンセル

**RLSポリシー:**
- 案件に関与するユーザー（作者・クリエイター）のみ閲覧可能
- 公開中の案件（status='open'）は全員が閲覧可能
- 作者のみ案件を作成可能

**インデックス:**
- `idx_projects_work_id` on `work_id`
- `idx_projects_author_id` on `author_id`
- `idx_projects_creator_id` on `creator_id`
- `idx_projects_status` on `status`

### 5. proposals

クリエイターからの提案を格納します。

| カラム名 | 型 | 制約 | 説明 |
|---------|-----|------|------|
| id | UUID | PK | 提案ID |
| project_id | UUID | FK → projects.id | 案件ID |
| creator_id | UUID | FK → profiles.id | 提案者ID |
| message | TEXT | | メッセージ |
| price | INTEGER | | 見積もり金額 |
| estimated_days | INTEGER | | 見積もり日数 |
| status | TEXT | NOT NULL, CHECK | ステータス |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | 作成日時 |

**ステータス値:**
- `pending`: 保留中
- `accepted`: 採用
- `rejected`: 却下

**RLSポリシー:**
- 案件の作者と提案者のみ閲覧可能
- クリエイターのみ提案を作成可能

**インデックス:**
- `idx_proposals_project_id` on `project_id`
- `idx_proposals_creator_id` on `creator_id`

### 6. messages

チャットメッセージを格納します。

| カラム名 | 型 | 制約 | 説明 |
|---------|-----|------|------|
| id | UUID | PK | メッセージID |
| project_id | UUID | FK → projects.id | 案件ID |
| sender_id | UUID | FK → profiles.id | 送信者ID |
| message_text | TEXT | NOT NULL | メッセージ本文 |
| file_url | TEXT | | ファイルURL |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | 送信日時 |

**RLSポリシー:**
- 案件に関与するユーザーのみ閲覧・送信可能

**インデックス:**
- `idx_messages_project_id` on `project_id`

### 7. gallery_items

ギャラリーに公開する作品を格納します。

| カラム名 | 型 | 制約 | 説明 |
|---------|-----|------|------|
| id | UUID | PK | ギャラリーアイテムID |
| project_id | UUID | FK → projects.id | 案件ID |
| video_url | TEXT | NOT NULL | 動画URL |
| thumbnail_url | TEXT | | サムネイルURL |
| is_published | BOOLEAN | DEFAULT false | 公開フラグ |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | 作成日時 |

**RLSポリシー:**
- 公開済み（is_published=true）のアイテムは全員が閲覧可能

**インデックス:**
- `idx_gallery_items_project_id` on `project_id`

## リレーションシップ

```
profiles (1) ──< (N) works
profiles (1) ──< (1) creator_profiles
works (1) ──< (N) projects
profiles (1) ──< (N) projects (author)
profiles (1) ──< (N) projects (creator)
projects (1) ──< (N) proposals
projects (1) ──< (N) messages
projects (1) ──< (1) gallery_items
```

## 拡張機能

### 将来追加予定のテーブル

- `reviews`: レビュー・評価
- `payments`: 決済情報
- `notifications`: 通知
- `audit_logs`: 監査ログ
- `moderation_cases`: モデレーション案件

## マイグレーション

マイグレーションファイルは `supabase/migrations/001_initial_schema.sql` にあります。

SupabaseのSQL Editorで実行するか、Supabase CLIを使用して適用してください。

