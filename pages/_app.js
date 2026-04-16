import "./styles.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Head from "next/head"

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="keywords" content="title, meta, nextjs" />
        <title>MediLog</title>

        <link rel="icon" type="image/png" sizes="16x16" href="/static/images/android-icon-36x36.png" />
        <meta name="author" content="Syamlal CM" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </Head>
      <Component { ...pageProps } />
    </>
  )
}
