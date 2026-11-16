import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import { Heading, PreHeading } from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { InnovatieBacklog } from '../components/innovatie/InnovatieBacklog';
import '../components/home/home.css';

export default function InnovatieBacklogPagina() {
  return (
    <>
      <Head>
        <title>Innovatie-backlog – MijnInkomen</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Layout>
        <main className="mijninkomen-home">
          <div className="container mijninkomen-sectie mijninkomen-innovatie">
            <PreHeading>Voor communityleden</PreHeading>
            <Heading level={1}>Innovatie-backlog</Heading>
            <Paragraph appearance="lead">
              Bekijk welke initiatieven zijn ingediend, hoe de stuurgroep ze beoordeelt en of ze doorstromen naar de
              kern-backlog.
            </Paragraph>
            <InnovatieBacklog />
          </div>
        </main>
      </Layout>
    </>
  );
}
