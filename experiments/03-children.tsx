import { renderToStaticMarkup } from "react-dom/server";

function Foo(props: { children: React.ReactNode }): React.ReactElement {
  return <p>{props.children}</p>;
}

const foo = "bar";
const a = <Foo>{foo}</Foo>;
console.log(renderToStaticMarkup(a));
