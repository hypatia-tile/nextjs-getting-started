# React最小構成

## JSX

JSXファイルを書くために`tsconfig.json`, 及びそれを拡張した`tsconfig.emit.json`を用意した.

```sh
pnpm exec tsc -p tsconfig.emit.json
```

とすることで, コンパイルオプションを手で打つ手間を省くことができる.
`tsconfig.json` は`next dev` により書き換えられてしまうため, `outDir`や`rootDir` などのオプション
は`tsconfig.emit.json`に退避してある.
React16以降は
```ts
import {jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
```

のようにpreprocessorのようなものがimport文を自動挿入してくれるので, `tsx`ファイルを無駄が少なく書くことができる.

## Function Component

```ts
function Foo(props : { foo: React.ReactNode }): React.ReactElement {
  return <p className="x">{props.foo}</p>;
}

const foo = "bar";
const a = <Foo foo={foo} />
```

とする. ここで`Foo()`は関数コンポーネントであり, `props`という一つのオブジェクトを引数に持つ. `<Foo>` の属性と
`Foo()`の引数の`props`のプロパティは対応していて, `React.ReactNode`になれる型なら
`<Foo foo={foo}>`のように属性を通じて受け渡すことができる. `props.children`だけは特別で, `<Foo>`
タグの要素として渡すことができる.

