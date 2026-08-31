function Foo(props: {foo: React.ReactNode, bar: React.ReactNode}): React.ReactElement {
  return <p className="x">hello {props.foo}</p>;
}
{
  const foo = "bar";
  const a = <Foo foo={foo} bar={foo} />
  console.log(a);
}
