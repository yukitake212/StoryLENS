import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function GalleryPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-interface text-story-ink mb-4">ギャラリー</h1>
        <p className="font-interface text-story-ink/70">
          過去に制作された予告編・ショート映像の一覧です
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="overflow-hidden snappy hover:-translate-y-1 hover:border-signal-red cursor-pointer">
          <div className="aspect-video bg-system-gray flex items-center justify-center grayscale hover:grayscale-0 snappy">
            <span className="font-interface text-story-ink/50">動画プレビュー</span>
          </div>
          <CardHeader>
            <CardTitle className="text-lg font-interface">作品タイトル</CardTitle>
            <CardDescription>
              作家：ペンネーム | クリエイター：クリエイター名
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 text-xs font-data text-story-ink/70">
              <span>ファンタジー</span>
              <span>•</span>
              <span>30秒</span>
            </div>
          </CardContent>
        </Card>

        {/* 追加のギャラリーアイテムは動的に生成 */}
      </div>

      <div className="mt-8 text-center">
        <p className="font-interface text-story-ink/70">まだギャラリーに作品がありません</p>
      </div>
    </div>
  );
}

