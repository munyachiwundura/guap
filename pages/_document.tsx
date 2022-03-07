import Document, { Html, Head, Main, NextScript } from 'next/document';
// import SEO from "../components/seo";

const MyDocument = () => {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon.png" />
        <meta name="theme-color" content="#fff" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />

        <meta
          name="description"
          content="The only to-do app you will ever need"
        />
        <link rel="icon" href="/icon.png" />
      </Head>
      {/* <SEO
        url={`https://overkilltodoapp.vercel.app`}
        openGraphType="website"
        schemaType="article"
        title="Overkill To-Do App"
        description="The only to-do app you will ever need"
        image={"https://overkilltodoapp.vercel.app/Todoappcover.png"}
      /> */}
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
