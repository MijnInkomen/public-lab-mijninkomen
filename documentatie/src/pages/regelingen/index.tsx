import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import { Heading, PreHeading } from '@utrecht/component-library-react';
import { RegelingenOverzicht } from '../../components/regelingen/RegelingenOverzicht';
import '../../components/home/home.css';

export default function RegelingenPagina() {
  return (
    <>
      <Head>
        <title>Regelingen – MijnInkomen</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Layout>
        <main className="mijninkomen-home">
          <div className="container mijninkomen-sectie mijninkomen-regelingen">
            <PreHeading>Voor communityleden</PreHeading>
            <Heading level={1}>Regelingen binnen MijnInkomen</Heading>
            <RegelingenOverzicht />
          </div>
        </main>
      </Layout>
    </>
  );
}
