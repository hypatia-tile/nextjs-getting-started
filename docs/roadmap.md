# 学習ロードマップ

## このリポジトリの目的

Next.js と Docker を使う部署への配属希望に向けた入門プロジェクト。React などのフロントエンド経験がほぼない状態から、**学習メモアプリを1本、開発環境から本番コンテナまで通しで完成させる**。

## 進め方の契約

コードもコマンドも**全て自分で手で書き、自分で打つ**。Claude の役割は次の4つに限る。

1. 各ステップの目的・仕様・背景の解説
2. 参照すべき公式ドキュメントの箇所の提示
3. 書けたもののレビュー（指摘のみ。修正するのは自分）
4. 詰まったときの段階的なヒント → それでもダメなら答え

例外として、**`docs/` 配下は Claude が書く**（合意の記録であり、転記しても学習にならないため）。`notes/` 配下の学習ログは自分で書く（学習そのものであり、アプリが表示するコンテンツでもある）。

## 決定事項

| 項目 | 決定 |
| --- | --- |
| ゴール | 学習メモアプリを1本、devShell → Next.js → Docker まで通しで完成させる |
| 題材 | 学習メモ。前半は `notes/*.md` を読むだけ、後半で DB への書き込みに拡張 |
| 環境 | flake.nix（devShell のみ）+ direnv。`nodejs_24` + `pnpm` |
| 言語 | TypeScript（strict）、Next.js 16 系 / React 19 系 / App Router |
| 初期化 | `create-next-app` を使わず `pnpm init` から手書き |
| CSS | 最小限の `globals.css` から始め、終盤で Tailwind を導入 |
| Lint | 最初から ESLint + Prettier |
| Docker | デーモンは既存の Docker Desktop。本番イメージ（multi-stage + standalone）を先に作り、後半で compose（app + Postgres）へ |
| DB | PostgreSQL。アクセスは生 SQL（`pg` ドライバ）。テーブル定義は init SQL |
| コンテンツ | 各ステップの学習ログを `notes/` に自分で書き、それをアプリが表示する（ドッグフーディング） |
| 進行 | 1ステップ = 1コミット。仕様提示 → 自分で書く → 動作確認 → レビュー → メモ → コミット |
| スコープ外 | テスト・CI（完成後の発展課題として末尾に置くのみ） |

## ステップ

### Phase 0 — 環境

- [ ] 1. `flake.nix` / `.envrc` / `.gitignore`。devShell に入るだけで `node` と `pnpm` が使え、バージョンが `flake.lock` で固定されている
- [ ] 2. `pnpm init` から Next.js を導入。`package.json` / `tsconfig.json` / `next.config.ts` / `app/layout.tsx` / `app/page.tsx` の最小構成で `pnpm dev` が起動する
- [ ] 3. ESLint + Prettier を導入する

### Phase 1 — 読み取り専用アプリ（React / Next.js の本体）

- [ ] 4. `notes/` を作り、Server Component から `fs` でファイル一覧を読んで表示する
- [ ] 5. 動的ルート `app/notes/[slug]/page.tsx` で個別表示。存在しない slug は `notFound()`
- [ ] 6. Markdown を HTML にレンダリングする
- [ ] 7. `next/link` による遷移、メタデータ、`loading.tsx` / `error.tsx`
- [ ] 8. `'use client'` と `useState` で絞り込み。Server Component と Client Component の境界を理解する

### Phase 2 — Docker（本番の届け方）

- [ ] 9. Docker Desktop を起動し `docker run hello-world` で疎通確認（クライアントとデーモンの関係）。`.dockerignore` と素朴な1ステージ `Dockerfile` を書き、動くが巨大なイメージを作る
- [ ] 10. `output: 'standalone'` と multi-stage 化。イメージサイズを before / after で比較する
- [ ] 11. 非 root 実行、環境変数、ポート、レイヤーキャッシュの効かせ方

### Phase 3 — DB と書き込み

- [ ] 12. compose で PostgreSQL を起動する（init SQL + named volume）
- [ ] 13. `pg` で DB から読むようデータ層を差し替え、`notes/*.md` を DB に投入する seed を書く
- [ ] 14. Server Actions でメモの作成・編集。`revalidatePath` でキャッシュを更新する
- [ ] 15. compose に app サービスを載せ、app + db の両方をコンテナで起動する

### Phase 4 — 仕上げ

- [ ] 16. Tailwind CSS を導入する
- [ ] 17. README を整備し、発展課題を明記して完了

## 発展課題（完成後）

- Vitest でデータ層にテストを書く
- GitHub Actions で lint / build / docker build を回す
- `colima` に差し替え、同じ `Dockerfile` がデーモンを変えても動くことを確認する
- flake で `packages.default` を作り、Nix でアプリ本体をビルドする（さらに `dockerTools` でイメージまで）

## 環境メモ

- macOS (aarch64-darwin)、Nix flakes 有効、direnv 導入済み
- Docker Desktop インストール済み（Phase 2 の開始時に起動が必要）
