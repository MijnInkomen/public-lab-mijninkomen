import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import { Heading, PreHeading } from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { AgendaOverzicht } from '../../components/agenda/AgendaOverzicht';
import '../../components/home/home.css';

export default function AgendaPagina() {
  return (
    <>
      <Head>
        <title>Agenda – MijnInkomen</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Layout>
        <main className="mijninkomen-home">
          <div className="container mijninkomen-sectie mijninkomen-agenda">
            <PreHeading>Voor communityleden</PreHeading>
            <Heading level={1}>Agenda</Heading>
            <Paragraph appearance="lead">
              Alle webinars, werksessies en kennissessies van de community, in hetzelfde format.
            </Paragraph>
            <AgendaOverzicht />
          </div>
        </main>
      </Layout>
    </>
  );
}
