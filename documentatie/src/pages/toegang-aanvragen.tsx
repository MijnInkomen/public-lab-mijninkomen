import Head from '@docusaurus/Head';
import { IconInfoCircleFilled } from '@tabler/icons-react';
import Layout from '@theme/Layout';
import { Alert, Heading, PreHeading } from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { Badge } from '../components/home/Badge';
import { Link } from '../components/Link';
import { daarna, intro } from '../components/toegang/content';
import { ToegangFormulier } from '../components/toegang/ToegangFormulier';
import '../components/home/home.css';
import '../components/toegang/toegang.css';

export default function ToegangAanvragenPagina() {
  return (
    <>
      <Head>
        <title>Toegang aanvragen – MijnInkomen</title>
        <meta name="description" content={intro.tekst} />
      </Head>
      <Layout>
        <main className="mijninkomen-home">
          <div className="container mijninkomen-sectie">
            <div className="mijninkomen-smal">
              <PreHeading>{intro.bovenkop}</PreHeading>
              <Heading level={1}>{intro.titel}</Heading>
              <Paragraph appearance="lead">{intro.tekst}</Paragraph>
              <Alert type="warning" icon={<IconInfoCircleFilled aria-hidden="true" />}>
                <Paragraph>
                  <strong>{intro.letOp}</strong> <Link href="/meer-weten/communitylid">{intro.letOpLink}</Link>
                </Paragraph>
              </Alert>
              <ToegangFormulier />
              <Heading level={2}>
                {daarna.titel} <Badge />
              </Heading>
              {daarna.stappen.map((stap) => (
                <Paragraph key={stap}>{stap}</Paragraph>
              ))}
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
