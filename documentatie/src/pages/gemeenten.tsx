import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import { Heading, PreHeading } from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { GemeenteMatrix } from '../components/gemeenten/GemeenteMatrix';
import '../components/home/home.css';

export default function GemeentenPagina() {
  return (
    <>
      <Head>
        <title>Gemeenten – MijnInkomen</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Layout>
        <main className="mijninkomen-home">
          <div className="container mijninkomen-sectie mijninkomen-gemeenten">
            <PreHeading>Voor communityleden</PreHeading>
            <Heading level={1}>Gemeenten in MijnInkomen</Heading>
            <Paragraph appearance="lead">
              Zie per gemeente de bestuurlijke rol, welke regelingen daar actief zijn en met wie je kunt afstemmen.
            </Paragraph>
            <GemeenteMatrix />
          </div>
        </main>
      </Layout>
    </>
  );
}
