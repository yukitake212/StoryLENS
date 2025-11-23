import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-interface text-story-ink">ダッシュボード</h1>
        <Button variant="accent" className="font-interface">新しい予告編を依頼</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="snappy hover:-translate-y-1 hover:border-signal-red">
          <CardHeader>
            <CardTitle className="font-interface">作品一覧</CardTitle>
            <CardDescription>登録済みの作品</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-interface text-story-ink/70">作品がまだ登録されていません</p>
          </CardContent>
        </Card>

        <Card className="snappy hover:-translate-y-1 hover:border-signal-red">
          <CardHeader>
            <CardTitle className="font-interface">進行中の案件</CardTitle>
            <CardDescription>制作中の予告編</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-interface text-story-ink/70">進行中の案件はありません</p>
          </CardContent>
        </Card>

        <Card className="snappy hover:-translate-y-1 hover:border-signal-red">
          <CardHeader>
            <CardTitle className="font-interface">完了した案件</CardTitle>
            <CardDescription>納品済みの予告編</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-interface text-story-ink/70">完了した案件はありません</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

