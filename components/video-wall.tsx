"use client";

import Image from "next/image";

interface VideoWallProps {
  images?: string[];
}

// デフォルトのプレースホルダー画像（実際のプロジェクトでは実際の画像URLに置き換える）
const defaultImages = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop",
];

export default function VideoWall({ images = defaultImages }: VideoWallProps) {
  // 画像を複製して無限スクロールを実現
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* 上方向にスクロールする列 */}
      <div className="absolute inset-0 flex gap-2 animate-marquee-up pointer-events-auto">
        {duplicatedImages.map((img, idx) => (
          <div
            key={`up-${idx}`}
            className="flex-shrink-0 w-32 md:w-48 lg:w-64 h-full grayscale hover:grayscale-0 transition-all duration-700 snappy group cursor-pointer"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={img}
                alt=""
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 128px, (max-width: 1024px) 192px, 256px"
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>

      {/* 下方向にスクロールする列（遅延させて配置） */}
      <div className="absolute inset-0 flex gap-2 animate-marquee-down mt-32 pointer-events-auto">
        {duplicatedImages.map((img, idx) => (
          <div
            key={`down-${idx}`}
            className="flex-shrink-0 w-32 md:w-48 lg:w-64 h-full grayscale hover:grayscale-0 transition-all duration-700 snappy group cursor-pointer"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={img}
                alt=""
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 128px, (max-width: 1024px) 192px, 256px"
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>

      {/* オーバーレイ（グラデーション） */}
      <div className="absolute inset-0 bg-gradient-to-b from-story-paper via-story-paper/70 to-story-paper pointer-events-none" />
    </div>
  );
}

