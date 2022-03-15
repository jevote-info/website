import { ColorModeScript } from '@chakra-ui/react';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import theme from '../theme';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="fr">
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
          <link rel="manifest" href="/site.webmanifest"></link>
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#4c4fb6"></link>
          <meta name="msapplication-TileColor" content="#da532c"></meta>
          <meta name="theme-color" content="#ffffff"></meta>

          <meta
            name="keywords"
            content="présidentielle, vote, 2022, candidats, élections, élection, présidentielles, voter, choisir son candidat, questionnaire, élection 2022, présidentielle 2022, élections 2022, présidentielles 2022"
          ></meta>
          <meta
            name="description"
            content="Découvrez quel candidat(e) de l'élection présidentielle de 2022 est le plus proche de vos convictions grace à un questionnaire sur les programmes des candidats"
          />

          <meta property="og:title" content="jevote.info" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://jevote.info" />
          <meta property="og:image" content="https://jevote.info/sharingCover.png" />

          <meta name="twitter:title" content="jevote.info" />
          <meta
            name="twitter:description"
            content="Découvrez quel candidat(e) de l'élection présidentielle de 2022 est le plus proche de vos convictions grace à un questionnaire sur les programmes des candidats"
          />
          <meta name="twitter:image" content="https://jevote.info/sharingCover.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@jevote_info" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
