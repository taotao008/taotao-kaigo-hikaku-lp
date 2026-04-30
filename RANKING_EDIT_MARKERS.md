# Ranking Edit Markers

ランキング編集を安全に行うため、JSで以下の `data-codex-*` 属性を自動付与しています。

## コア編集項目（必須5項目）

1. エージェント名
- Selector: `.ranking__cardTitle .cta-title`
- Marker: `data-codex-field="agent-name"`

2. 写真
- Selector: `.ranking__cardBnr img`
- Marker: `data-codex-field="photo"`

3. 特徴
- Selector: `.ranking__cardPointTitle h3`
- Marker: `data-codex-field="feature-title"`
- Selector: `.ranking__cardPointDetail li p`
- Marker: `data-codex-field="feature-item"` + `data-codex-index`

4. コンテンツ（タブ内）
- Selector: `.ranking__cardTabContent`
- Marker: `data-codex-field="content-tab"` + `data-codex-tab-index`
- Selector: `.ranking__cardTabContent dt`
- Marker: `data-codex-field="content-label"`
- Selector: `.ranking__cardTabContent dd`
- Marker: `data-codex-field="content-value"`

5. 口コミ
- Selector: `.review__content`
- Marker: `data-codex-field="review-item"` + `data-codex-index`
- Selector: `.review__title`
- Marker: `data-codex-field="review-title"`
- Selector: `.review__text`
- Marker: `data-codex-field="review-text"`
- Selector: `.review__ratingBox span`
- Marker: `data-codex-field="review-score"`

## 追加で運用上よく触る項目（実装済み）

- キャッチコピー: `data-codex-field="catch-copy"`
- 総合スコア: `data-codex-field="score"`
- CTAリンク: `data-codex-field="cta-link"`
- CTA主文言: `data-codex-field="cta-main-text"`
- CTA補助文言: `data-codex-field="cta-sub-text"`
- 注意書き: `data-codex-field="notice-item"`

## 共通メタ

- 各ランキングカード: `data-codex-rank="1..5"`
- 各対象要素にも `data-codex-rank` を付与
- 繰り返し要素には `data-codex-index`
- タブ要素には `data-codex-tab-index`

## 使い方例

- rank2 のエージェント名
  - `[data-codex-rank="2"][data-codex-field="agent-name"]`
- rank3 の特徴2つ目
  - `[data-codex-rank="3"][data-codex-field="feature-item"][data-codex-index="2"]`
- rank1 の口コミ1件目本文
  - `[data-codex-rank="1"][data-codex-field="review-text"][data-codex-index="1"]`
- rank4 の CTA2つ目のリンク先
  - `[data-codex-rank="4"][data-codex-field="cta-link"][data-codex-index="2"]`
