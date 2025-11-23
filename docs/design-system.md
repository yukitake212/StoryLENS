# StoryLENS デザインシステム

> **Design Language**: Editorial Tech / Architectural Minimal  
> 最終更新: 2025-01-XX

## コンセプト

StoryLENSのデザインシステムは、**「Editorial Tech（エディトリアル・テック）」あるいは「Architectural Minimal（建築的ミニマリズム）」**と定義されます。

物語という「有機的な感情」を、システムという「無機質な枠組み」で解析・再構築する美学を持っています。

### コア・コンセプト: "The Signal in the Noise"

無数の物語（ノイズ）の中から、感情の脈動（シグナル）を抽出する装置。

**キーワード**: 潔癖、鋭利、解析、構造美

**メタファー**: 現代美術館のキャプション、建築図面、ファッション誌のエディトリアルデザイン

---

## カラーパレット: "Ink & Paper & Pulse"

従来の「ダークモード×ネオン」のサイバーパンクとは一線を画す、印刷媒体（紙とインク）を意識した高コントラストな配色。

### Story Paper (#f8f9fa)

**役割**: 背景全体

完全な白（#FFFFFF）ではなく、わずかに温かみや厚みを感じさせるオフホワイト。高級な画用紙やキャンバスを表現。

**使用箇所**:
- ページ背景
- カード背景
- フォーム背景

### Story Ink (#1a1a1a)

**役割**: プライマリテキスト、ボタン、強固な構造物

完全な黒ではなく、深い墨色。視認性と重厚感を担保する。

**使用箇所**:
- メインテキスト
- プライマリボタン
- ナビゲーション
- 見出し

### Signal Red (#cc0000)

**役割**: アクセント、感情の波形、インタラクションの要点

**意味**: 「心拍」「警告」「録画中（REC）」「情熱」。静寂な白の世界に走る、生々しい血のようなライン。

**使用箇所**:
- アクセントボタン
- 感情波形グラフ
- 重要な通知
- ホバー時のアクセント

### System Gray (#e9ecef)

**役割**: 境界線、グリッド、無効状態

感情を持たない冷徹なシステムの枠組み。

**使用箇所**:
- ボーダー
- 区切り線
- 無効状態の背景
- グリッドライン

---

## タイポグラフィ: "Logic vs. Emotion"

フォントの使い分けによって、情報の「質」を視覚的に区別しています。

### Serif (Georgia, Cambria) - "The Story"

**使用箇所**:
- ユーザーが入力した物語
- シーンの要約
- 作品の抜粋テキスト
- 引用文

**意図**: 文学的な格調高さ、人間味、歴史、アナログな質感を表現。

**CSSクラス**: `.font-story`

### Sans-Serif (Helvetica Neue, Arial, system-ui) - "The Interface"

**使用箇所**:
- 見出し（H1-H6）
- ボタン
- システムメッセージ
- ナビゲーション
- UIラベル

**意図**: 機能性、現代的、ニュートラルな情報の伝達。スイススタイルのような客観性。

**CSSクラス**: `.font-interface` (デフォルト)

### Monospace (SFMono, Menlo, 'Courier New') - "The Data"

**使用箇所**:
- 数値（感情スコア）
- メタデータ
- ID、ハッシュ
- タグ
- コードスニペット

**意図**: コンピュータによる解析、計測機器、裏側のロジックを示唆。

**CSSクラス**: `.font-data`

---

## グラフィック & レイアウト要素

### A. The Video Wall (ランディング背景)

**構成**: 無数のスクリーン（画像）が上下に無限スクロール（Marquee Animation）する。

**意図**: 世界中に溢れる物語のデータベース。最初は「彩度を落とした（Grayscale）」状態で背景に徹し、カーソルを合わせると「色（Color）」が戻るインタラクションは、**「観測することで物語に命が宿る」**というUX体験を表しています。

**実装**:
- CSS Grid または Flexbox
- `filter: grayscale(100%)` → `filter: grayscale(0%)` トランジション
- 無限スクロールアニメーション

### B. The Prism Wave (感情波形)

**形状**: 白背景に引かれた赤い線グラフ。背景には薄いグリッドライン。

**意図**: 医療機器（心電図）や音響機器のモニター。物語の感情を「定量的なデータ」として扱う冷徹さと、そこから読み取れる感情の激しさを対比。

**実装**:
- SVG または Canvas
- Signal Red (#cc0000) の線
- System Gray (#e9ecef) のグリッド背景

### C. Glassmorphism & Borders

**Glass**: ランディングのフォーム部分には、すりガラス効果（backdrop-blur）を使用。背景の情報の流れを感じさせつつ、手前の作業に集中させる。

**Sharp Borders**: 角丸を極力排除（または小さく、最大4px）し、直線的なボーダーラインを多用。可愛らしさを排除し、プロフェッショナルなツールとしての信頼感を演出。

**実装**:
- `backdrop-blur-md` または `backdrop-blur-lg`
- `border-radius: 0` または `border-radius: 2px` / `border-radius: 4px`
- シャープな `border: 1px solid`

---

## UI/UX フィロソフィー

### Interaction

**Hover Effects**: ボタンや画像は、ホバー時に明確なフィードバック（色変化、移動）を返す。システムがユーザーの意志に即座に応答する感覚（Snappy）。

**実装例**:
- ボタン: `transition-all duration-150` + 色変化 + わずかな移動
- カード: `hover:shadow-lg` + `hover:-translate-y-1`

### Information Density

**High Density**: 画面を分割し、左に波形、右に詳細といった「コックピット」のような情報密度の高さを維持。プロ向けツールであることを示唆。

**レイアウト原則**:
- グリッドシステムの活用
- 余白を最小限に（ただし可読性は保つ）
- 情報の階層を明確に

### Terminology

単なる「分析」ではなく「ANALYZE STRUCTURE」、「注文」ではなく「ORDER VISUALIZATION」など、専門用語のような硬質な言葉選び。

**例**:
- ❌ "分析する" → ✅ "ANALYZE STRUCTURE"
- ❌ "注文する" → ✅ "ORDER VISUALIZATION"
- ❌ "作成する" → ✅ "GENERATE OUTLINE"
- ❌ "送信" → ✅ "SUBMIT PROPOSAL"

---

## コンポーネント仕様

### Button

**スタイル**:
- 角丸: 最小限（2px または 0px）
- ボーダー: シャープな1px
- ホバー: Signal Red への変化、または明確なフィードバック

**バリアント**:
- `default`: Story Ink背景、白テキスト
- `outline`: 透明背景、Story Inkボーダー、Story Inkテキスト
- `accent`: Signal Red背景、白テキスト
- `ghost`: 透明背景、ホバー時にSystem Gray背景

### Card

**スタイル**:
- 背景: Story Paper (#f8f9fa)
- ボーダー: System Gray (#e9ecef), 1px solid
- 角丸: 2px または 0px
- シャドウ: 最小限（またはなし）

### Input / Form

**スタイル**:
- 背景: Story Paper (#f8f9fa)
- ボーダー: System Gray (#e9ecef), 1px solid
- フォーカス: Signal Red (#cc0000) ボーダー
- 角丸: 2px または 0px

### Typography Scale

- **H1**: 48px / 3rem (font-interface, font-bold)
- **H2**: 36px / 2.25rem (font-interface, font-bold)
- **H3**: 30px / 1.875rem (font-interface, font-semibold)
- **H4**: 24px / 1.5rem (font-interface, font-semibold)
- **Body**: 16px / 1rem (font-interface, font-normal)
- **Small**: 14px / 0.875rem (font-interface, font-normal)
- **Caption**: 12px / 0.75rem (font-interface, font-normal)

---

## アニメーション

### 原則

- **Snappy**: 150ms - 200ms の短いトランジション
- **Purposeful**: 装飾的ではなく、機能的なフィードバック
- **Minimal**: 過度なアニメーションは避ける

### 標準トランジション

```css
transition-all duration-150 ease-out
```

### 使用例

- ボタンホバー: 色変化 + わずかな移動
- カードホバー: シャドウの変化 + わずかな上移動
- モーダル: フェードイン + スライドアップ
- ローディング: シンプルなスピナー（Signal Red）

---

## レスポンシブデザイン

### ブレークポイント

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### 原則

- モバイルファースト
- 情報密度を維持（ただし可読性を優先）
- タッチターゲットは最小44px × 44px

---

## アクセシビリティ

### コントラスト比

- テキスト: WCAG AA準拠（4.5:1以上）
- 大テキスト: WCAG AA準拠（3:1以上）

### フォーカスインジケーター

- Signal Red (#cc0000) のアウトライン
- 明確な視認性

### キーボードナビゲーション

- すべてのインタラクティブ要素がキーボードで操作可能
- フォーカス順序が論理的

---

## 総評

現在のデザインは、**「真っ白な実験室で、赤い液体（感情）を分析している」**ような情景を想起させます。

SF的でありながら、未来的すぎず、むしろ現代的な洗練された雑誌や建築事務所のような佇まいを持っています。

---

## 参考資料

- [Swiss Style (International Typographic Style)](https://en.wikipedia.org/wiki/International_Typographic_Style)
- [Editorial Design Principles](https://www.interaction-design.org/literature/topics/editorial-design)
- [Minimalist Architecture](https://en.wikipedia.org/wiki/Minimalism)

