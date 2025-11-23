import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-story-paper">
      <nav className="border-b border-system-gray bg-story-paper">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold font-interface text-story-ink">
            StoryLENS
          </Link>
          <div className="flex gap-4 items-center">
            <Link href="/dashboard">
              <Button variant="ghost" className="font-interface">ダッシュボード</Button>
            </Link>
            <Link href="/works/new">
              <Button variant="ghost" className="font-interface">作品登録</Button>
            </Link>
            <Link href="/projects">
              <Button variant="ghost" className="font-interface">案件一覧</Button>
            </Link>
            <Button variant="outline" className="font-interface">ログアウト</Button>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}

