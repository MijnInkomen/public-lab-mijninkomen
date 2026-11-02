import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import { Heading } from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { useEffect, useState } from 'react';
import '../components/home/home.css';

interface Roadmap {
  tekst: string;
}

// De inhoud staat bewust niet in de build: alles in de build is openbaar. Nginx geeft dit bestand alleen na inloggen vrij.
const haalRoadmapOp = async (): Promise<Roadmap> => {
  const antwoord = await fetch('/community/roadmap.json');
  if (!antwoord.ok) throw new Error('Niet ingelogd');
  return antwoord.json();
};

export default function RoadmapPagina() {
  const [roadmap, setRoadmap] = useState<Roadmap>();

  useEffect(() => {
    haalRoadmapOp().then(setRoadmap, () => window.location.assign('/inloggen/'));
  }, []);

  return (
    <>
      <Head>
        <title>Roadmap – MijnInkomen</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Layout>
        <main className="mijninkomen-home">
          <div className="container mijninkomen-sectie">
            <Heading level={1}>Roadmap</Heading>
            {roadmap && <Paragraph>{roadmap.tekst}</Paragraph>}
          </div>
        </main>
      </Layout>
    </>
  );
}
