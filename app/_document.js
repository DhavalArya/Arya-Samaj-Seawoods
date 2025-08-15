import { Html, Head, Main, NextScript } from "next/document";

export default function Document({ lang }) {
  const baseUrl = "https://yourwebsite.com"; // 🔹 Change this to your site URL

  return (
    <Html lang={lang || "en"}>
      <Head>
        {/* Basic multilingual meta tags */}
        <meta name="language" content={lang || "en"} />
        <meta httpEquiv="Content-Language" content={lang || "en"} />

        {/* hreflang for SEO */}
        <link rel="alternate" hrefLang="en" href={`${baseUrl}/en`} />
        <link rel="alternate" hrefLang="hi" href={`${baseUrl}/hi`} />
        <link rel="alternate" hrefLang="x-default" href={baseUrl} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx) => {
  const initialProps = await ctx.defaultGetInitialProps(ctx);

  let lang = "en";
  const req = ctx.req;
  if (req && req.headers.cookie) {
    const match = req.headers.cookie.match(/language=(en|hi)/);
    if (match) lang = match[1];
  }

  return { ...initialProps, lang };
};
