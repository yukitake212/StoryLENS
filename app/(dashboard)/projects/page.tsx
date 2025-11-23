import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-interface text-story-ink">案件一覧</h1>
        <div className="flex gap-2">
          <select className="px-3 py-2 bg-story-paper border border-system-gray sharp-sm font-interface text-story-ink focus:outline-none focus:border-signal-red snappy">
            <option>すべてのジャンル</option>
            <option>ファンタジー</option>
            <option>恋愛</option>
            <option>ミステリー</option>
          </select>
          <select className="px-3 py-2 bg-story-paper border border-system-gray sharp-sm font-interface text-story-ink focus:outline-none focus:border-signal-red snappy">
            <option>すべての予算</option>
            <option>3,000〜5,000円</option>
            <option>5,000〜10,000円</option>
            <option>10,000円以上</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="snappy hover:-translate-y-1 hover:border-signal-red">
          <CardHeader>
            <CardTitle className="font-interface">案件タイトル</CardTitle>
            <CardDescription>作品名：○○の予告編制作</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-interface text-story-ink/70">ジャンル</p>
              <p className="font-medium font-interface text-story-ink">ファンタジー</p>
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
              <p className="text-sm font-interface text-story-ink/70">尺</p>
              <p className="font-medium font-data text-story-ink">30秒</p>
            </div>
            <Button className="w-full font-interface" variant="outline">
              詳細を見る
            </Button>
          </CardContent>
        </Card>

        {/* 追加の案件カードは動的に生成 */}
      </div>

      <div className="mt-8 text-center">
        <p className="font-interface text-story-ink/70">案件がまだありません</p>
      </div>
    </div>
  );
}

