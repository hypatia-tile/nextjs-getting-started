# biome

## Organize imports

Biomeはどのようにimportを整理するか。

https://biomejs.dev/assist/actions/organize-imports/javascript/#description

> Sorts imports and exports in your JavaScript and TypeScript files.
> By default, imports and exports are sorted by “distance” from the current
> file:

デフォルトでは、遠い順にインポートの順番が並び換えられる。すなわちurl(https://...)などが上部に、
ローカルパスなどが下部に来る。`groups`などのオプション指定を`biome.json` に書き込むことでソート順
を制御できる。

