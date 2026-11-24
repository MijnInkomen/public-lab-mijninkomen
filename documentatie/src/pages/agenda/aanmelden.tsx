import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import { Heading, PreHeading } from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { AgendaFormulier } from '../../components/agenda/AgendaFormulier';
import { Link } from '../../components/Link';
import '../../components/home/home.css';
import '../../components/toegang/toegang.css';

export default function AgendaAanmeldenPagina() {
  return (
    <>
      <Head>
        <title>Bijeenkomst aanmelden – MijnInkomen</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Layout>
        <main className="mijninkomen-home">
          <div className="container mijninkomen-sectie mijninkomen-smal mijninkomen-agenda">
            <PreHeading>Voor communityleden</PreHeading>
            <Heading level={1}>Bijeenkomst aanmelden</Heading>
            <Paragraph appearance="lead">
              Vul dit formulier in, dan krijg je je bijeenkomst terug in het vaste format van de agenda.
            </Paragraph>
            <AgendaFormulier />
            <Paragraph>
              <Link href="/agenda/">Terug naar de agenda</Link>
            </Paragraph>
          </div>
        </main>
      </Layout>
    </>
  );
}
