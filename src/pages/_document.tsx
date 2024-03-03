import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <body className={`dark:bg-boxdark-2 dark:text-bodydark h-dvh`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
