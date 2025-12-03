# StoryLENS Backend API

FastAPIベースのバックエンドAPIサーバー

## セットアップ

```bash
# 仮想環境を作成
python -m venv venv

# 仮想環境を有効化
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# 依存関係をインストール
pip install -r requirements.txt
```

## 環境変数

`.env`ファイルを作成して以下を設定：

```
OPENAI_API_KEY=your_openai_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

## 実行

```bash
uvicorn main:app --reload
```

APIドキュメントは `http://localhost:8000/docs` で確認できます。








