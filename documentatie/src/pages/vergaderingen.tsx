import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import { Heading } from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { useEffect, useState } from 'react';
import { AgendaKaart } from '../components/vergaderingen/AgendaKaart';
import { VergaderingenNavigatie } from '../components/vergaderingen/VergaderingenNavigatie';
import type { Vergaderingen } from '../components/vergaderingen/types';
import '../components/home/home.css';
import '../components/vergaderingen/vergaderingen.css';

// De inhoud staat bewust niet in de build: alles in de build is openbaar. Nginx geeft dit bestand alleen na inloggen vrij.
const haalVergaderingenOp = async (): Promise<Vergaderingen> => {
  const antwoord = await fetch('/community/vergaderingen.json');
  if (!antwoord.ok) throw new Error('Niet ingelogd');
  return antwoord.json();
};

export default function VergaderingenPagina() {
  const [vergaderingen, setVergaderingen] = useState<Vergaderingen>();

  useEffect(() => {
    haalVergaderingenOp().then(setVergaderingen, () => window.location.assign('/inloggen/'));
  }, []);

  return (
    <>
      <Head>
        <title>Vergaderingen – MijnInkomen</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Layout>
        <div className="mijninkomen-home mijninkomen-vergaderingen">
          <VergaderingenNavigatie />
          <main className="mijninkomen-vergaderingen__inhoud">
            <Heading level={1}>Vergaderingen</Heading>
            <Paragraph appearance="lead">
              De vaste overleggen met hun agenda, alle besluiten en de openstaande acties op één plek.
            </Paragraph>

            <section aria-labelledby="agendas-titel" className="mijninkomen-vergaderingen__sectie" id="agendas">
              <Heading level={2} id="agendas-titel">
                Agenda&apos;s
              </Heading>
              <Paragraph>Elk overleg heeft een vaste agenda. Zo bereidt iedereen zich op dezelfde manier voor.</Paragraph>
              {vergaderingen ? (
                <div className="mijninkomen-agenda-kaarten">
                  {vergaderingen.overleggen.map((overleg) => (
                    <AgendaKaart key={overleg.id} {...overleg} />
                  ))}
                </div>
              ) : (
                <Paragraph>De agenda&apos;s worden geladen…</Paragraph>
              )}
            </section>
          </main>
        </div>
      </Layout>
    </>
  );
}
