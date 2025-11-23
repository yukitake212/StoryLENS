import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import VideoWall from "@/components/video-wall";

export default function Home() {
  return (
    <main className="min-h-screen bg-story-paper relative overflow-hidden">
      {/* Video Wall Background */}
      <VideoWall />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-7xl md:text-8xl font-bold font-interface mb-8 text-story-ink leading-tight">
            文字列に、<br />
            <span className="text-signal-red">世界を与える。</span>
          </h1>
          <p className="text-2xl md:text-3xl font-interface text-story-ink/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            StoryLENSは、小説の予告編・ショート映像をAIクリエイターに依頼できるプラットフォームです。
            <br />
            <span className="text-lg text-story-ink/60 mt-4 block">
              無数の物語から、感情の脈動を抽出する装置。
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/signin" className="w-full sm:w-auto">
              <Button size="lg" variant="accent" className="w-full sm:w-auto text-lg px-8 py-6 glow-red hover-lift">
                ANALYZE STRUCTURE
              </Button>
            </Link>
            <Link href="/gallery" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 hover-lift">
                VIEW GALLERY
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Prism Wave Section - Emotion Arc Visualization */}
      <section className="relative z-10 py-16 bg-story-paper/95 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold font-interface text-center mb-4 text-story-ink">
            EMOTION ARC ANALYSIS
          </h2>
          <p className="text-center font-interface text-story-ink/70 mb-12 max-w-2xl mx-auto">
            物語の感情を定量的なデータとして可視化
          </p>
          <div className="prism-wave mx-auto max-w-4xl" />
          <div className="mt-8 text-center">
            <p className="font-data text-story-ink/60 text-sm">
              SIGNAL DETECTED: 不安 → 緊張 → 希望
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-6 py-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold font-interface mb-4 text-story-ink">
            3ステップで予告編を制作
          </h2>
          <div className="w-24 h-1 bg-signal-red mx-auto" />
        </div>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <Card className="snappy hover-lift hover:border-signal-red bg-story-paper/95 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-signal-red flex items-center justify-center mb-4 sharp-sm">
                <span className="font-data text-story-paper text-xl font-bold">01</span>
              </div>
              <CardTitle className="font-interface text-2xl">小説を登録</CardTitle>
              <CardDescription className="font-interface">
                作品のタイトル、あらすじ、抜粋テキストを登録
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-story text-story-ink/70 leading-relaxed">
                AI監督機能で自動的にシーン案や感情の流れを生成することもできます。
              </p>
            </CardContent>
          </Card>

          <Card className="snappy hover-lift hover:border-signal-red bg-story-paper/95 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-signal-red flex items-center justify-center mb-4 sharp-sm">
                <span className="font-data text-story-paper text-xl font-bold">02</span>
              </div>
              <CardTitle className="font-interface text-2xl">クリエイターに依頼</CardTitle>
              <CardDescription className="font-interface">
                希望イメージ、尺、予算を指定して案件を公開
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-story text-story-ink/70 leading-relaxed">
                複数のクリエイターから提案を受け取り、最適な方を選べます。
              </p>
            </CardContent>
          </Card>

          <Card className="snappy hover-lift hover:border-signal-red bg-story-paper/95 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-signal-red flex items-center justify-center mb-4 sharp-sm">
                <span className="font-data text-story-paper text-xl font-bold">03</span>
              </div>
              <CardTitle className="font-interface text-2xl">予告編が届く</CardTitle>
              <CardDescription className="font-interface">
                制作チャットでやりとりしながら完成
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-story text-story-ink/70 leading-relaxed">
                納品物を確認して承認。完了後はレビューを書くことができます。
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 bg-story-ink text-story-paper">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold font-interface mb-6">
            ORDER VISUALIZATION
          </h2>
          <p className="text-xl font-interface mb-8 max-w-2xl mx-auto text-story-paper/90">
            あなたの物語に、映像という新しい次元を与える
          </p>
          <Link href="/auth/signin">
            <Button size="lg" variant="accent" className="text-lg px-12 py-6 glow-red hover-lift bg-signal-red hover:bg-[#b30000]">
              GET STARTED
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

