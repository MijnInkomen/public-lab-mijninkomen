import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import { Heading, PreHeading } from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { RoadmapBacklog } from '../components/roadmap/RoadmapBacklog';
import '../components/home/home.css';
import "../components/roadmap/roadmap.css";
import { RoadmapStatuslijst } from '../components/roadmap/RoadmapStatuslijst';

export default function RoadmapPagina() {
  return (
    <>
      <Head>
        <title>Roadmap – MijnInkomen</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Layout>
        <main className="mijninkomen-home">
          <div className="container mijninkomen-sectie">
            <PreHeading>Voor communityleden</PreHeading>
            <Heading level={1}>Roadmap</Heading>
            <Paragraph appearance='lead'>
              Bekijk aan welke epics momenteel wordt gewerkt en hoe de voortgang ervoor staat
            </Paragraph>
            <RoadmapStatuslijst />
            <RoadmapBacklog />
          </div>
        </main>
      </Layout>
    </>
  );
}
