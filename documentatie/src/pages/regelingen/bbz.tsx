import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import { Heading, PreHeading } from '@utrecht/component-library-react';
import { RegelingDetail } from '../../components/regelingen/RegelingDetail';
import '../../components/home/home.css';

export default function BbzPagina() {
  return (
    <>
      <Head>
        <title>Bbz – MijnInkomen</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Layout>
        <main className="mijninkomen-home">
          <div className="container mijninkomen-sectie mijninkomen-regelingen">
            <PreHeading>Voor communityleden</PreHeading>
            <Heading level={1}>Bbz</Heading>
            <RegelingDetail id="bbz" />
          </div>
        </main>
      </Layout>
    </>
  );
}
