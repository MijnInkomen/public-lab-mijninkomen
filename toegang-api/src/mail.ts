import nodemailer from 'nodemailer';
import type { OpgeslagenAanvraag } from './opslag.ts';

export interface Mail {
  stuurWeigering: (aanvraag: OpgeslagenAanvraag, reden: string) => Promise<void>;
}

interface Instellingen {
  host: string;
  port: number;
  van: string;
}

const ONDERWERP = 'Je aanvraag voor MijnInkomen';

const escape = (tekst: string) =>
  tekst.replace(/[&<>"']/g, (teken) => `&#${teken.charCodeAt(0)};`).replace(/\r?\n/g, '<br>');

/** De acceptatiemail stuurt Keycloak, want die bevat de link om het account in te stellen. */
export const maakWeigeringsmail = ({ naam }: OpgeslagenAanvraag, reden: string) => {
  const voornaam = naam.split(/\s+/)[0] || naam;
  const tekst = [
    `Beste ${voornaam},`,
    'Je hebt toegang aangevraagd tot de communityomgeving van MijnInkomen. Helaas kunnen we je aanvraag niet goedkeuren.',
    `Reden:\n${reden}`,
    'Heb je vragen? Neem dan contact met ons op via de contactpagina op de website.',
    'Met vriendelijke groet,\nHet programmateam van MijnInkomen',
  ];

  return {
    subject: ONDERWERP,
    text: tekst.join('\n\n'),
    html: tekst.map((alinea) => `<p>${escape(alinea)}</p>`).join(''),
  };
};

export const maakMail = ({ host, port, van }: Instellingen): Mail => {
  const verzender = nodemailer.createTransport({ host, port, secure: false });

  return {
    stuurWeigering: async (aanvraag, reden) => {
      await verzender.sendMail({ from: van, to: aanvraag.email, ...maakWeigeringsmail(aanvraag, reden) });
    },
  };
};
