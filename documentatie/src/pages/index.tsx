import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import { HomeDeelnemers } from '../components/home/HomeDeelnemers';
import { HomeIntroductie } from '../components/home/HomeIntroductie';
import { HomeWaaromSamen } from '../components/home/HomeWaaromSamen';
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
          <HomeWaaromSamen />
          <HomeDeelnemers />
        </main>
      </Layout>
    </>
  );
}
