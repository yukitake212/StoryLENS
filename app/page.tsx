import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ThreeBackground from "@/components/three-background";

export default function Home() {
  return (
    <main className="min-h-screen bg-story-paper relative overflow-hidden">
      {/* Three.js Background */}
      <ThreeBackground />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-32 md:py-40 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <div className="inline-block mb-6">
              <span className="font-data text-signal-red text-sm md:text-base tracking-widest uppercase">
                SIGNAL DETECTED
              </span>
            </div>
            <h1 className="text-8xl md:text-9xl lg:text-[10rem] font-bold font-interface mb-6 text-story-ink leading-[0.9] tracking-tighter">
              テキストに宿る
            </h1>
            <h1 className="text-8xl md:text-9xl lg:text-[10rem] font-bold font-interface text-signal-red leading-[0.9] tracking-tighter mb-8">
              物語の魂を映像化しよう
            </h1>
          </div>
          <div className="max-w-3xl mx-auto mb-16">
            <p className="text-2xl md:text-3xl lg:text-4xl font-interface text-story-ink/90 mb-6 leading-relaxed font-light">
              StoryLENSは、小説の予告編・ショート映像をAIクリエイターに依頼できるプラットフォームです。
            </p>
            <p className="text-base md:text-lg font-data text-story-ink/50 tracking-wide">
              無数の物語から、感情の脈動を抽出する装置。
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/auth/signin" className="w-full sm:w-auto group">
              <Button size="lg" variant="accent" className="w-full sm:w-auto text-lg px-12 py-7 glow-red hover-lift font-interface tracking-wide">
                ANALYZE STRUCTURE
                <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </Link>
            <Link href="/gallery" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-12 py-7 hover-lift font-interface tracking-wide border-2">
                VIEW GALLERY
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Prism Wave Section - Emotion Arc Visualization */}
      <section className="relative z-10 py-24 md:py-32 bg-story-paper/98 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="font-data text-signal-red text-xs tracking-widest uppercase">
                QUANTITATIVE ANALYSIS
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold font-interface mb-6 text-story-ink tracking-tight">
              EMOTION ARC ANALYSIS
            </h2>
            <p className="text-xl font-interface text-story-ink/70 max-w-2xl mx-auto leading-relaxed">
              物語の感情を定量的なデータとして可視化
            </p>
          </div>
          <div className="prism-wave mx-auto max-w-5xl mb-12" />
          <div className="text-center">
            <p className="font-data text-story-ink/70 text-base tracking-wider">
              SIGNAL DETECTED: <span className="text-signal-red">不安</span> → <span className="text-signal-red">緊張</span> → <span className="text-signal-red">希望</span>
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-6 py-32 md:py-40 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="font-data text-signal-red text-xs tracking-widest uppercase">
              PROCESS
            </span>
          </div>
          <h2 className="text-6xl md:text-7xl font-bold font-interface mb-6 text-story-ink tracking-tight">
            3ステップで予告編を制作
          </h2>
          <div className="w-32 h-1 bg-signal-red mx-auto" />
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
      <section className="relative z-10 py-32 md:py-40 bg-story-ink text-story-paper overflow-hidden">
        <div className="container mx-auto px-6 text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block mb-6">
              <span className="font-data text-signal-red text-xs tracking-widest uppercase">
                INITIATE
              </span>
            </div>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold font-interface mb-8 tracking-tight">
              ORDER VISUALIZATION
            </h2>
            <p className="text-2xl md:text-3xl font-interface mb-12 max-w-3xl mx-auto text-story-paper/90 leading-relaxed font-light">
              あなたの物語に、映像という新しい次元を与える
            </p>
            <Link href="/auth/signin" className="inline-block group">
              <Button size="lg" variant="accent" className="text-xl px-16 py-8 glow-red hover-lift bg-signal-red hover:bg-[#b30000] font-interface tracking-wide">
                GET STARTED
                <span className="ml-3 inline-block group-hover:translate-x-2 transition-transform">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

