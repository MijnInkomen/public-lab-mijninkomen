import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import { Heading, PreHeading } from '@utrecht/component-library-react';
import { RegelingDetail } from '../../components/regelingen/RegelingDetail';
import '../../components/home/home.css';

export default function StadspasPagina() {
  return (
    <>
      <Head>
        <title>Stadspas – MijnInkomen</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Layout>
        <main className="mijninkomen-home">
          <div className="container mijninkomen-sectie mijninkomen-regelingen">
            <PreHeading>Voor communityleden</PreHeading>
            <Heading level={1}>Stadspas</Heading>
            <RegelingDetail id="stadspas" />
          </div>
        </main>
      </Layout>
    </>
  );
}
