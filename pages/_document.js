// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, viewport-fit=cover' />
        {/* --- FIX: Add a theme-color meta tag --- */}
        {/* This color should match the background in your globals.css */}
        <meta name="theme-color" content="#f4f4f9" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}