import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import { Heading, PreHeading } from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { MijnGegevens } from '../../components/account/MijnGegevens';
import '../../components/home/home.css';

export default function MijnGegevensPagina() {
  return (
    <>
      <Head>
        <title>Mijn gegevens – MijnInkomen</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Layout>
        <main className="mijninkomen-home">
          <div className="container mijninkomen-sectie mijninkomen-account">
            <PreHeading>Account</PreHeading>
            <Heading level={1}>Mijn gegevens</Heading>
            <Paragraph appearance="lead">
              Dit zijn je gegevens in de communityomgeving. Je naam en e-mailadres wijzig je zelf met de knop Wijzigen.
            </Paragraph>
            <MijnGegevens />
          </div>
        </main>
      </Layout>
    </>
  );
}
