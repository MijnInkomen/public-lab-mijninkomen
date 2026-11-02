import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import { HomeIntroductie } from '../components/home/HomeIntroductie';
import './index.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>MijnInkomen – Gemeenten werken samen</title>
        <meta name="description" content="Gemeenten werken samen om inwoners met een laag inkomen beter te helpen." />
      </Head>
      <Layout>
        <main className="mijninkomen-home">
          <HomeIntroductie />
        </main>
      </Layout>
    </>
  );
}
