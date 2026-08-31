function Foo(props: {
  foo: React.ReactNode;
  bar: React.ReactNode;
}): React.ReactElement {
  return <p className="x">hello {props.foo}</p>;
}

{
  const foo = "bar";
  const bar = foo;
  const a = <Foo foo={foo} bar={bar} />;
  console.log(a);
}
