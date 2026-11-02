import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import { Heading, PreHeading } from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { AanvragenTabel } from '../../components/beheer/AanvragenTabel';
import '../../components/home/home.css';

export default function BeheerPagina() {
  return (
    <>
      <Head>
        <title>Beheer – MijnInkomen</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Layout>
        <main className="mijninkomen-home">
          <div className="container mijninkomen-sectie mijninkomen-beheer">
            <PreHeading>Alleen voor beheerders</PreHeading>
            <Heading level={1}>Toegangsaanvragen</Heading>
            <Paragraph appearance="lead">Bekijk de aanvragen en bepaal wie communitylid wordt.</Paragraph>
            <AanvragenTabel />
          </div>
        </main>
      </Layout>
    </>
  );
}
