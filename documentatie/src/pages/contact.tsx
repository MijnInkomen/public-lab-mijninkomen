import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import { ContactAansluiten } from '../components/contact/ContactAansluiten';
import { ContactGegevens } from '../components/contact/ContactGegevens';
import { ContactIntroductie } from '../components/contact/ContactIntroductie';
import '../components/home/home.css';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact – MijnInkomen</title>
        <meta name="description" content="Waar je terechtkunt met een vraag over MijnInkomen." />
      </Head>
      <Layout>
        <main className="mijninkomen-home mijninkomen-contact">
          <ContactIntroductie />
          <ContactGegevens />
          <ContactAansluiten />
        </main>
      </Layout>
    </>
  );
}
