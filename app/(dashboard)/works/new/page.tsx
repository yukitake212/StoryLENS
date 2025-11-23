import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NewWorkPage() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold font-interface text-story-ink mb-6">作品を登録</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-interface">作品情報</CardTitle>
            <CardDescription>小説の基本情報を入力してください</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium font-interface text-story-ink mb-2">タイトル</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-story-paper border border-system-gray sharp-sm font-interface text-story-ink focus:outline-none focus:border-signal-red snappy"
                placeholder="作品タイトル"
              />
            </div>
            <div>
              <label className="block text-sm font-medium font-interface text-story-ink mb-2">ジャンル</label>
              <select className="w-full px-3 py-2 bg-story-paper border border-system-gray sharp-sm font-interface text-story-ink focus:outline-none focus:border-signal-red snappy">
                <option>ファンタジー</option>
                <option>恋愛</option>
                <option>ミステリー</option>
                <option>ホラー</option>
                <option>SF</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium font-interface text-story-ink mb-2">あらすじ</label>
              <textarea
                className="w-full px-3 py-2 bg-story-paper border border-system-gray sharp-sm font-story text-story-ink focus:outline-none focus:border-signal-red snappy min-h-[120px]"
                placeholder="200〜800字で入力してください"
              />
            </div>
            <div>
              <label className="block text-sm font-medium font-interface text-story-ink mb-2">公開URL（任意）</label>
              <input
                type="url"
                className="w-full px-3 py-2 bg-story-paper border border-system-gray sharp-sm font-interface text-story-ink focus:outline-none focus:border-signal-red snappy"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium font-interface text-story-ink mb-2">代表シーン抜粋</label>
              <textarea
                className="w-full px-3 py-2 bg-story-paper border border-system-gray sharp-sm font-story text-story-ink focus:outline-none focus:border-signal-red snappy min-h-[200px]"
                placeholder="500〜2,000字程度で入力してください"
              />
            </div>
            <Button className="w-full font-interface" variant="accent">作品を登録</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-interface">AI監督</CardTitle>
            <CardDescription>テキストから映像構成案を生成</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-interface text-story-ink/70 mb-4">
              作品を登録後、AI監督機能でシーン案や感情の流れを生成できます。
            </p>
            <Button variant="outline" disabled className="font-interface">
              ANALYZE STRUCTURE
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

