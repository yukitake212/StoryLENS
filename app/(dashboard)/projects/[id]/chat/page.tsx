import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ChatPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="grid gap-6 md:grid-cols-4">
        {/* 左サイドバー：案件情報 */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-interface">案件情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <p className="font-interface text-story-ink/70">ステータス</p>
                <p className="font-medium font-interface text-story-ink">制作中</p>
              </div>
              <div>
                <p className="font-interface text-story-ink/70">クリエイター</p>
                <p className="font-medium font-interface text-story-ink">クリエイター名</p>
              </div>
              <div>
                <p className="font-interface text-story-ink/70">納期</p>
                <p className="font-medium font-data text-story-ink">2024年3月15日</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 中央：チャット */}
        <div className="md:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b border-system-gray">
              <CardTitle className="text-lg font-interface">メッセージ</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-end">
                  <div className="bg-signal-red sharp-sm p-3 max-w-[70%]">
                    <p className="text-sm font-interface text-story-paper">こんにちは。制作を開始しました。</p>
                    <p className="text-xs font-data text-story-paper/70 mt-1">10:30</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-system-gray sharp-sm p-3 max-w-[70%]">
                    <p className="text-sm font-interface text-story-ink">了解しました。よろしくお願いします。</p>
                    <p className="text-xs font-data text-story-ink/70 mt-1">10:32</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="p-4 border-t border-system-gray">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 bg-story-paper border border-system-gray sharp-sm font-interface text-story-ink focus:outline-none focus:border-signal-red snappy"
                  placeholder="メッセージを入力..."
                />
                <Button variant="accent" className="font-interface">送信</Button>
              </div>
            </div>
          </Card>
        </div>

        {/* 右サイドバー：作品情報・AI監督 */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-interface">作品情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="font-interface text-story-ink/70 mb-2">タイトル</p>
                <p className="font-medium font-interface text-story-ink">作品タイトル</p>
              </div>
              <div>
                <p className="font-interface text-story-ink/70 mb-2">AI監督の構成案</p>
                <div className="bg-system-gray sharp-sm p-3 text-xs">
                  <p className="font-medium font-interface mb-2 text-story-ink">感情の流れ</p>
                  <ul className="list-disc list-inside space-y-1 font-interface text-story-ink/80">
                    <li>不安</li>
                    <li>緊張</li>
                    <li>希望</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

