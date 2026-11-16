import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import { Heading, PreHeading } from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { LedenTabel } from '../../components/beheer/LedenTabel';
import '../../components/home/home.css';

export default function LedenPagina() {
  return (
    <>
      <Head>
        <title>Leden en rollen – MijnInkomen</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Layout>
        <main className="mijninkomen-home">
          <div className="container mijninkomen-sectie mijninkomen-beheer">
            <PreHeading>Alleen voor de hoofdbeheerder</PreHeading>
            <Heading level={1}>Leden en rollen</Heading>
            <Paragraph appearance="lead">
              Bekijk alle communityleden. Maak een lid beheerder of andersom, en pas het soort communitylid aan.
            </Paragraph>
            <LedenTabel />
          </div>
        </main>
      </Layout>
    </>
  );
}
