import { renderToStaticMarkup } from "react-dom/server";

function Foo(props: {foo: React.ReactNode, children: React.ReactNode}): React.ReactElement {
  return <div><p className="x">{props.children}</p><p>{props.foo}</p></div>;
}

const foo = "bar";
const bar = "foo";
const a = <Foo foo={foo}>{bar}</Foo>;
console.log(renderToStaticMarkup(a));
