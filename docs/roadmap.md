# 学習ロードマップ

## このリポジトリの目的

Next.js と Docker を使う部署への配属希望に向けた入門プロジェクト。React などのフロントエンド経験がほぼない状態から、**学習メモアプリを1本、開発環境から本番コンテナまで通しで完成させる**。

## 進め方の契約

コードもコマンドも**全て自分で手で書き、自分で打つ**。Claude の役割は次の4つに限る。

1. 各ステップの目的・仕様・背景の解説
2. 参照すべき公式ドキュメントの箇所の提示
3. 書けたもののレビュー（指摘のみ。修正するのは自分）
4. 詰まったときの段階的なヒント → それでもダメなら答え

例外として、**`docs/` 配下は Claude が書く**（合意の記録であり、転記しても学習にならないため）。`notes/` 配下の学習ログは自分で書く（学習そのものであり、アプリが表示するコンテンツでもある）。同じ理由で、**`gh` による issue 操作と `git` の commit / push も Claude が実行する**（学習速度を優先する判断。git はこのプロジェクトの学習対象ではない）。コミットメッセージと分け方は Claude が決めるが、異論があれば言えばよい。

**自分で打つのは `pnpm` と `docker` のコマンド**。この2つは配属先で手が覚えている必要があるため、代行しない。

## 学習方針

**動くものに最短で到達することは目的ではない。**

- **型注釈は省略せず明示的に書く。** どの型が使われているかを常に意識する
- **パーサと実行モデルの理解を、UI を組み立てることより優先する**
- **edge case を積極的に踏む。** 意図的に型を間違え、コンパイラとリンタのエラーメッセージを読む。JavaScript は変な例を多く踏むことが後の成長に効く
- **詰まっている時間は無駄ではない。** 安易に答えを出さない

この方針により、Claude は仕様を「動かす手順」ではなく「型と評価順序」を軸に書き、**エラーを踏ませる実験課題を添える**。

## 1ステップの回し方

1. **課題の発行** — Claude がこのロードマップの未完了ステップから issue を1つ立てる。仕様は issue 本文に入る（`step-start` スキル）
2. **実装** — 自分でコードを書き、動作を確認する
3. **コミットと push** — レビュー前に必ずコミットして push する。**レビューはコミット hash に対して行うため、未コミットの状態ではレビューを始めない**
4. **レビュー** — Claude が対象 hash を明記した上で、issue にコメントとして指摘を記録する（`step-review` スキル）
5. **修正** — 指摘を新しいコミットで直す。**amend はしない**（レビューが参照している hash が孤児になるため）
6. **クローズ** — 要修正が全て解消したら issue を閉じ、このロードマップにチェックを入れる

ブランチは切らず `main` に直接積む。修正が別コミットになるので「1ステップ = 1コミット」ではなく「**1ステップ = 1 issue**」が単位になる。

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
| 進行 | 1ステップ = 1 issue。issue 発行 → 自分で書く → 動作確認 → コミット・push → hash を指定してレビュー → 修正コミット → クローズ |
| スコープ外 | テスト・CI（完成後の発展課題として末尾に置くのみ） |

## ステップ

### Phase 0 — 環境

- [x] 1. `flake.nix` / `.envrc` / `.gitignore`。devShell に入るだけで `node` と `pnpm` が使え、バージョンが `flake.lock` で固定されている
- [x] 2. `pnpm init` から Next.js を導入。`package.json` / `tsconfig.json` / `next.config.ts` / `app/layout.tsx` / `app/page.tsx` の最小構成で `pnpm dev` が起動する（**依存導入と scripts まで完了。残りは Phase 0.5 の後に再開**）
- [ ] 3. ESLint + Prettier を導入する

### Phase 0.5 — ターミナルで React を掴む

Next.js もブラウザも使わない。**React は「HTML 文字列を作る関数」であり、ターミナルで完結する**という事実の上に立ち直す回。

Step 2 の途中で「React が分からないまま Next.js の設定と格闘している」状態になったため、土台として挿入した。あわせて、本人が Web アプリ自体より処理系・型・ターミナルに関心があることが判明したため、そちらに寄せた教材にしている。

- [x] 2a. `createElement` だけで HTML 文字列を作り、標準出力に出す。コンポーネントがただの関数であることを入出力で確かめる
- [x] 2b. 同じものを JSX で書き直す。`node` が `SyntaxError` を出すのを踏み、変換を通して同じ出力に戻す。**JSX の正体が関数呼び出しであること**を実証する
- [x] 2c. `children` を型付きで受け取る。props 一般は 2b で踏んだので、タグの中身が `children` プロパティに入る仕組みに絞る。ここまでやると `app/layout.tsx` は小さな練習問題になる

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

### clone した直後にやること

**`.envrc` はリポジトリに含めない**方針を採っている。direnv の設定は個人の環境の問題であり、`.env*` を1つの無視パターンにまとめておく方が単純だという判断による。

そのため clone 直後は direnv が自動で効かない。次のどちらかを行う。

- `.envrc` に `use flake` と書いて `direnv allow` する（以後は `cd` するだけで環境に入る）
- または、その都度 `nix develop` で devShell に入る
