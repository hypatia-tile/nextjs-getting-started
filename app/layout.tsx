export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html>
      <body>{props.children}</body>
    </html>
  );
}
