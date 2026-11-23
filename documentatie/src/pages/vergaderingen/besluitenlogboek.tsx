import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import { Heading, PreHeading } from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { Besluitenlogboek } from '../../components/besluitenlogboek/Besluitenlogboek';
import '../../components/home/home.css';

export default function BesluitenlogboekPagina() {
  return (
    <>
      <Head>
        <title>Besluitenlogboek – MijnInkomen</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Layout>
        <main className="mijninkomen-home">
          <div className="container mijninkomen-sectie mijninkomen-besluiten">
            <PreHeading>Vergaderondersteuning</PreHeading>
            <Heading level={1}>Besluitenlogboek</Heading>
            <Paragraph appearance="lead">
              Alle besluiten uit de overleggen. Zoek op een woord, of filter op datum, status en gemeente.
            </Paragraph>
            <Besluitenlogboek />
          </div>
        </main>
      </Layout>
    </>
  );
}
