from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="StoryLENS API", version="0.1.0")

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# データモデル
class WorkCreate(BaseModel):
    title: str
    summary: Optional[str] = None
    genre: Optional[str] = None
    external_url: Optional[str] = None
    sample_text: Optional[str] = None

class AIOutlineRequest(BaseModel):
    work_id: str
    sample_text: str

class AIOutlineResponse(BaseModel):
    emotion_arc: List[str]
    scenes: List[dict]
    atmosphere: str
    key_metaphors: List[str]

@app.get("/")
async def root():
    return {"message": "StoryLENS API", "version": "0.1.0"}

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/ai/outline", response_model=AIOutlineResponse)
async def generate_ai_outline(request: AIOutlineRequest):
    """
    AI監督機能：テキストからシーン案・感情アーク・雰囲気を生成
    MVP版では簡易的なLLM呼び出しを実装
    """
    try:
        # OpenAI APIを使用（環境変数から取得）
        import openai
        
        openai.api_key = os.getenv("OPENAI_API_KEY")
        
        if not openai.api_key:
            raise HTTPException(status_code=500, detail="OpenAI API key not configured")
        
        # プロンプト構築
        prompt = f"""
以下の小説の抜粋テキストを分析して、映像化のための構成案を生成してください。

テキスト:
{request.sample_text[:2000]}

以下の形式でJSONを返してください:
{{
  "emotion_arc": ["感情1", "感情2", "感情3"],
  "scenes": [
    {{"description": "シーン1の説明", "emotion": "感情", "camera_work": "カメラワーク提案"}},
    {{"description": "シーン2の説明", "emotion": "感情", "camera_work": "カメラワーク提案"}}
  ],
  "atmosphere": "ダーク / ポップ / 叙情的 など",
  "key_metaphors": ["メタファー1", "メタファー2"]
}}
"""
        
        # OpenAI API呼び出し（簡易版）
        # 実際の実装では、より詳細なプロンプトエンジニアリングが必要
        client = openai.OpenAI(api_key=openai.api_key)
        
        response = client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {"role": "system", "content": "あなたは映像制作の専門家です。小説のテキストを分析して、映像化のための構成案を提案してください。"},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=1500
        )
        
        # レスポンスをパース（簡易版）
        # 実際にはJSONパースとエラーハンドリングが必要
        import json
        content = response.choices[0].message.content
        
        # JSON部分を抽出（マークダウンコードブロックを除去）
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0].strip()
        elif "```" in content:
            content = content.split("```")[1].split("```")[0].strip()
        
        try:
            result = json.loads(content)
        except json.JSONDecodeError:
            # フォールバック：簡易的なレスポンスを返す
            result = {
                "emotion_arc": ["不安", "緊張", "希望"],
                "scenes": [
                    {"description": "導入シーン", "emotion": "不安", "camera_work": "クローズアップ"},
                    {"description": "展開シーン", "emotion": "緊張", "camera_work": "ワイドショット"}
                ],
                "atmosphere": "ダーク",
                "key_metaphors": ["光と影", "時間の流れ"]
            }
        
        return AIOutlineResponse(**result)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI outline generation failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

