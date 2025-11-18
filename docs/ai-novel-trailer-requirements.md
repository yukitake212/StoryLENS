# AIノベル・トレーラー｜要件定義・詳細アーキテクチャ設計（v1.0）

> 最終更新: 2025-10-25 (JST)  
> 対象: MVP〜v1.0 の実装チーム向け

---

## 0. 目的 / 背景

* 本ドキュメントは「作家×AIクリエイタープラットフォーム」(以下、本プロダクト)の**要件定義**と**システムアーキテクチャ**を統合的に定義する。
* 参照資料: プロジェクトまとめ/競合分析/MVP構想など。

---

## 1. スコープ定義

### 1.1 フェーズ別スコープ

**MVP (v0.1〜0.4)**

* 作家が「募集を作成」し、クリエイターが応募 → 作家が選定する **当事者同士のマッチング** 方式に変更
* AIディレクター（Difyワークフロー）をMVPから導入（シーン抽出・指示書生成）
* 作品・指示書の保存/閲覧/共有
* 案件募集・応募・選定フロー
* 決済は外部（Stripe Checkoutリンク）

**β (v0.5〜0.9)**

* クリエイタープロファイル/ポートフォリオ
* 見積り/依頼フロー（メッセージ、価格、納期）
* 内部エスクロー(Stripe Connect)の計画・サンドボックス試験
* 版権/同意フロー（原作者承諾）
* Difyワークフローの本格運用（AI監督v1）

**v1.0**

* 双方向検索/推薦（タグ/ジャンル/実績）
* 案件管理（マイルストーン、提出/差戻し、検収、支払）
* 品質評価・レビュー
* 通知/ログ/監査
* 基本モデレーション/著作物申立て対応

---

## 2. 役割 / 権限モデル（RBAC）

* **Author（作家）**: 作品アップロード、指示書生成、依頼作成、検収、レビュー
* **Creator（AIクリエイター/編集者）**: プロファイル作成、ポートフォリオ掲載、見積り/受注、納品
* **Operator（運営）**: モデレーション、料金/手数料設定、紛争対応
* **Viewer（ゲスト）**: 公開ポートフォリオ/デモ閲覧

権限は Supabase Auth + RLS (Row Level Security) で制御。将来的に**Project単位ACL**を導入。

---

## 3. ユースケース / ユーザーストーリー

1. **作家が作品を投入し、AI指示書を得る**
   * As an Author, テキストをアップロード→AIがシーン抽出→ストーリーボード/ショットリスト/ナレーション案を受け取る。
2. **作家が依頼を公開**
   * 指示書と予算/納期/スタイルを指定して案件を作成。クリエイターから提案が届く。
3. **クリエイターが受注/制作/納品**
   * プロファイル/実績で信頼獲得→案件提案→合意→納品(ラフ→最終)。
4. **運営が品質/権利/支払を統制**
   * 申立て対応、規約違反の停止、エスクロー解放。

---

## 4. 機能要件（FRD）

### 4.1 作者サイド

* テキスト入稿（.txt/.docx/.pdf）
* 作品メタデータ編集（タイトル/あらすじ/タグ）
* AI指示書生成（シーン抽出、感情アーク、ショット設計、BGM/SE/VO提案）
* 案件作成・公開（予算/納期/必要スキル/参考トーン）
* メッセージ/ファイル交換、検収/差戻し、レビュー投稿

### 4.2 クリエイターサイド

* プロファイル/スキル/料金表、ポートフォリオ管理
* 案件検索/フィルタ、提案/見積り
* 進行ボード（ToDo/提出/フィードバック）
* 納品（動画/サムネ/字幕/プロジェクトファイル）

### 4.3 運営/プラットフォーム

* ユーザー/作品/案件モデレーション
* 支払/手数料/税率設定（Stripe Connect）
* 通知（メール/アプリ内）
* 監査ログ/エクスポート

---

## 5. 非機能要件（NFR）

* 可用性: 99.5% (MVP), 99.9% (v1)
* 応答時間: P95 < 500ms（API、LLM呼出しは除外）
* スループット: 1,000 MAU想定→将来 50k MAUまで水平方向に拡張
* データ保護: RLS, KMS暗号化, 最小権限, 監査ログ
* コンプライアンス: 著作権/肖像権同意フロー、DMCAライク手続き
* 監視: 4つの黄金信号 + 合成監視/LLM健全性モニタ
* コスト: リクエストあたり単価上限を設定（AI推論コストキャップ）

---

## 6. 全体アーキテクチャ

```
[Client (Next.js)] ─┬─> [BFF/Edge (Next API Routes)] ─> [FastAPI Core]
                      │                                    │
                      │                                    ├─> [AI Orchestrator]
                      │                                    │       └─ Dify Workflow Apps
                      │                                    │            (Scene Extraction / Emotion Arc / Shotlist / VO Draft)
                      │                                    │
                      │                                    ├─> [Job Queue (RQ/Celery + Redis)]
                      │                                    ├─> [DB (Supabase/Postgres)]
                      │                                    ├─> [Object Storage (Supabase Storage)]
                      │                                    └─> [Payments (Stripe/Checkout→Connect)]
                      │
                      └─> [CDN (Vercel)]
```

**設計方針**

* APIは**BFF**と**Core API**を分離（Next.js Edgeで軽量、FastAPIで業務ロジック）。
* AI呼び出しは**Orchestrator**で抽象化（OpenAI, Claude, local等を差し替え）。
* 非同期タスクは**Queue**へ（長時間処理/AIジョブ/サムネ生成）。
* データはPostgres、バイナリはObject Storage。RLSでテナント分離。

---

## 7. データモデル（概略ERD）

```
User(id, role, email, handle, display_name, status, created_at)
Profile(user_id [FK], bio, skills[], rate_card_json, links[], avatar_url)
Work(text_id [FK], author_id [FK], title, synopsis, tags[], visibility, status)
TextAsset(id, work_id [FK], type(enum: txt, docx, pdf), url, checksum)
PromptPack(id, work_id [FK], version, scenes_json, emotion_arc_json, shotlist_json, voiceover_script, music_cues, status)
Project(id, work_id [FK], owner_id [FK], creator_id [FK nullable], prompt_pack_id [FK], budget_min, budget_max, deadline, state(enum: draft, open, negotiating, in_progress, delivered, accepted, canceled))
Bid(id, project_id [FK], bidder_id [FK], message, price, eta_days, state)
Message(id, thread_id, sender_id, body, attachments[])
Delivery(id, project_id [FK], version, files[], note, state(enum: draft, submitted, revisions, approved))
Review(id, project_id [FK], reviewer_id, score, comment)
Payment(id, project_id [FK], amount, fee, stripe_payment_intent, status)
AuditLog(id, actor_id, action, entity, entity_id, payload_json, created_at)
ModerationCase(id, target_type, target_id, reason, state)
```

**インデックス/検索**: `Work.tags`, `Profile.skills`, `Project.state`, `Bid.state` に複合索引。全文検索は Supabase pg_trgm / Elasticsearch(将来)。

---

## 8. API設計（要点）

### 8.1 認証/認可

* Supabase Auth (Email/Password, OAuth: X/Google) + JWT
* RLSポリシー例: `work.author_id = auth.uid()` or `project.owner_id = auth.uid()`

### 8.2 RESTエンドポイント（抜粋）

* `POST /works` 作成（メタ）
* `POST /works/{id}/assets` テキストアップロード
* `POST /works/{id}/prompt-packs` AI指示書生成開始 → 202受領、`job_id`返却
* `GET /jobs/{id}` ジョブ状態（queued|running|failed|done）
* `POST /projects` 案件作成/公開
* `POST /projects/{id}/bids` 提案
* `POST /projects/{id}/deliveries` 納品
* `POST /projects/{id}/accept` 検収/支払実行
* `POST /reports/claim` 著作権/規約違反の申立て

OpenAPIは FastAPI で自動生成。

---

## 9. AIパイプライン（AI監督 v1）

### 9.1 構成

**MVPからDifyワークフローを直接呼び出し**、指示書生成を外部アプリとして統合する。

1. Preprocess（FastAPI側で軽量処理）
2. Dify Workflow App 呼び出し（外部API）
   * Scene Extraction
   * Emotion Arc 推定
   * Storyboard / Shotlist
   * VO/BGM提案
3. 結果をプラットフォーム側DBに保存

### 9.2 呼び出し設計

* FastAPI → Dify API（Workflow App）にHTTPリクエストで実行指示
* Job Queueは非同期実行のみに利用
* 生成結果は `prompt_pack` として保存し再利用可

---

## 10. フロントエンド（Next.js）

* App Router, Server Actions
* ページ: Dashboard, Works, PromptPack Viewer, Projects, Creators, Messages
* エディタ: 指示書用**構造化ビュー**（シーン/ショットのドラッグ&ドロップ編集）
* アセットプレビュー: PDF/テキスト、動画/画像、字幕(SRT)表示
* アクセシビリティ: i18n/RTL準備、ダークモード

---

## 11. インフラ / デプロイ / CI

* **Vercel**: Next.js（CDN/画像最適化）
* **Render/Railway**: FastAPI + Worker（RQ/Celery）
* **Supabase**: Postgres + Storage + Auth
* **Redis**: Queue/キャッシュ
* **Stripe (Connect)**: 将来のエスクロー
* **CI/CD**: GitHub Actions（lint, test, build, migrate, deploy）

環境: dev / staging / prod。Feature flag で機能段階展開。

---

## 12. セキュリティ / 法務

* **RLS**徹底、最小権限IAM、顧客データ暗号化（at rest/in transit）
* 版権同意: 「原作者の承諾」チェックボックス + 署名ログ
* DMCAライク申立て: 迅速な一時停止/カウンタ通知/履歴管理
* 生成物ライセンス: 非独占/プロモーション転用可否の選択
* バックアップ/DR: DB日次スナップショット、Storageバージョニング

---

## 13. 観測性 / SRE

* ログ: 収集 (OpenTelemetry), 検索（Logflare/ELK）
* メトリクス: API P95、ジョブキュー滞留、LLM失敗率、原価/売上、CSAT
* アラート: SLA逸脱、決済失敗、モデレーションフラグ急増

---

## 14. コストモデル（初期想定）

* LLM: 1作あたり¥185〜（テキスト長に比例）
* Supabase: フリー枠→成長に応じ従量
* Vercel/Render: フリー枠 + ランタイム最適化
* 手数料: 取引の10〜20%（MVPは実績優先）

---

## 15. リスク/対策

* **API依存**: Provider抽象化/フォールバックモデル
* **AI品質ばらつき**: 指示書を**人手編集**できるUI、テンプレ/スタイル保存
* **プラットフォーム内製化の脅威**: ネットワーク効果（作家×クリエイター）/品質コミュニティ/レビュー資産
* **著作権紛争**: ログ/同意/申立てプロセス、迅速な停止

---

## 16. 画面フロー（主要）

1. 入稿 → AI生成開始 → 進捗トースト/ジョブ監視 → 指示書ビュー → 保存/編集  
2. 案件作成 → 公開 → 提案受領 → チャット → 合意 → 進行ボード → 納品 → 検収/レビュー

---

## 17. シーケンス（例: 指示書生成）

```
Client → BFF: POST /works/{id}/prompt-packs
BFF → Core: enqueue(job)
Core → Queue: job(scene_extraction)
Queue → LLM: prompts
LLM → Queue: results
Queue → Core: store(PromptPack)
Core → Client: Webhook/WS通知
```

---

## 18. テスト戦略

* Unit: ドメイン/パーサ/変換
* Contract: OpenAPI準拠（Dredd等）
* E2E: Playwright (重要フロー)
* 負荷: k6 (ジョブ滞留/スパイク)
* Red Team: 権限越境/注入/LLMプロンプトリーク

---

## 19. ロードマップ（要約）

* **MVP**: 指示書生成 + 手動マッチング + 公開プロフィール
* **β**: 案件/見積/納品/レビュー + Dify本格化
* **v1**: 決済/エスクロー + 推薦検索 + 監査/通知 + モデレーション強化

---

## 20. 付録: RLSポリシー例（擬似）

```sql
-- works: 作者のみ読書き、公開時はゲスト閲覧可
create policy select_works_public on works for select
  using (visibility='public' or author_id = auth.uid());
```

---

**以上** — 実装に向け、画面定義/コンポーネント設計、OpenAPIスキーマを別紙で展開予定。
