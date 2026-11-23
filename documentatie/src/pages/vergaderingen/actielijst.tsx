import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import { Heading, PreHeading } from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { Actielijst } from '../../components/actielijst/Actielijst';
import '../../components/home/home.css';

export default function ActielijstPagina() {
  return (
    <>
      <Head>
        <title>Actielijst – MijnInkomen</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Layout>
        <main className="mijninkomen-home">
          <div className="container mijninkomen-sectie mijninkomen-actielijst">
            <PreHeading>Vergaderondersteuning</PreHeading>
            <Heading level={1}>Actielijst</Heading>
            <Paragraph appearance="lead">
              Landelijke acties (voor de hele samenwerking) en lokale acties (voor één gemeente).
            </Paragraph>
            <Actielijst />
          </div>
        </main>
      </Layout>
    </>
  );
}
