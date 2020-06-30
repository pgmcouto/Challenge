/* eslint-disable react/react-in-jsx-scope */

import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';


export default class DOM extends Document {
  render = () => (
    <html lang="pt">
      <Head />

      <body>
        <Main />

        <div id="portals" />

        <NextScript />
      </body>
    </html>
  );
}


DOM.getInitialProps = async (ctx) => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () => originalRenderPage({
      enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
    });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    throw e;
  } finally {
    sheet.seal();
  }
};
