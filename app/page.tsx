import { promises as fs, type PathLike } from "node:fs";

export default async function Home(): Promise<React.ReactElement> {
  const filePath: PathLike = `${process.cwd()}/notes/01-minimal-example.md`;
  const content = await fs.readFile(filePath, "utf-8");

  return <p>{content}</p>;
}
