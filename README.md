# taotao-kaigo-hikaku-lp

taotao社 介護比較LP（看護師広告キラ）。2026年版・看護師求人比較サイトのランディングページ。

**技術スタック：** 単一 HTML (`index.html`) ／ CSS・JS インライン＋共通アセット同梱 ／ Vercel ホスティング

## 構成

```text
taotao-kaigo-hikaku-lp/
├── index.html          ← 本体（Playwright 複製済 rendered DOM）
├── assets/             ← LP固有アセット（Contentful画像キャッシュ等、約33MB）
├── shared/             ← 共通アセット（CSS/JS/フォント/共通画像、約11MB）
├── package.json
└── .gitignore
```

`vercel.json` は不要（静的HTMLをそのまま配信）。

## デプロイ

| 項目 | 内容 |
| ---- | ---- |
| ホスティング | Vercel team `taotaos-projects-e9f8423e` |
| ビルド | 不要（HTML をそのまま配信） |
| 反映時間 | `git push origin main` 後 約1分 |
| SSL/TLS | Vercel が自動付与 |

```bash
# 通常運用：mainブランチにpushするだけで自動デプロイ
git push origin main
```

## ローカル確認

```bash
python3 -m http.server 8000
# → http://localhost:8000/
```

## 出典

- `kaigo_LP_copy/lps/nurse-ad-kira/` を Playwright で複製済み
- 共通アセットは `kaigo_LP_copy/shared/` を同梱

## よくある修正パターン

| 依頼 | 変更箇所 |
| ---- | ------- |
| ヒーロー画像を変える | `index.html` 内 `keyvisual_kango_2026_*` 参照箇所 |
| ランキングを更新 | `index.html` 内 `ranking_medal0[1-5]` セクション |
| 比較表を変更 | `index.html` 内 `compare/` 関連の `url()` 箇所 |
| 共通フォント差替 | `shared/css/zen-maru-gothic.css` |
