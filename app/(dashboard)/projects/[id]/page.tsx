import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold font-interface text-story-ink mb-6">案件詳細</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-interface">案件情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-interface text-story-ink/70">作品タイトル</p>
                <p className="font-medium font-interface text-story-ink">○○の予告編制作</p>
              </div>
              <div>
                <p className="text-sm font-interface text-story-ink/70">目的</p>
                <p className="font-medium font-interface text-story-ink">予告編</p>
              </div>
              <div>
                <p className="text-sm font-interface text-story-ink/70">尺</p>
                <p className="font-medium font-data text-story-ink">30秒</p>
              </div>
              <div>
                <p className="text-sm font-interface text-story-ink/70">予算</p>
                <p className="font-medium font-data text-story-ink">5,000〜10,000円</p>
              </div>
              <div>
                <p className="text-sm font-interface text-story-ink/70">納期</p>
                <p className="font-medium font-data text-story-ink">2024年3月15日</p>
              </div>
              <div>
                <p className="text-sm font-interface text-story-ink/70">希望イメージ</p>
                <p className="text-sm font-story text-story-ink">ダークな雰囲気で、緊張感のある予告編を希望します。</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-interface">作品情報</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-interface text-story-ink/70 mb-2">あらすじ</p>
              <p className="text-sm font-story text-story-ink mb-4">
                作品のあらすじがここに表示されます...
              </p>
              <Button variant="outline" size="sm" className="font-interface">
                作品詳細を見る
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-interface">提案を送る</CardTitle>
              <CardDescription>この案件に提案を送信</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium font-interface text-story-ink mb-2">見積もり金額</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 bg-story-paper border border-system-gray sharp-sm font-data text-story-ink focus:outline-none focus:border-signal-red snappy"
                  placeholder="8000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium font-interface text-story-ink mb-2">制作期間（日数）</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 bg-story-paper border border-system-gray sharp-sm font-data text-story-ink focus:outline-none focus:border-signal-red snappy"
                  placeholder="7"
                />
              </div>
              <div>
                <label className="block text-sm font-medium font-interface text-story-ink mb-2">コンセプト案</label>
                <textarea
                  className="w-full px-3 py-2 bg-story-paper border border-system-gray sharp-sm font-interface text-story-ink focus:outline-none focus:border-signal-red snappy min-h-[120px]"
                  placeholder="制作のコンセプトやアプローチを記入してください"
                />
              </div>
              <Button className="w-full font-interface" variant="accent">SUBMIT PROPOSAL</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

