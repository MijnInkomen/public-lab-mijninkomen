/**
 * PAGINA "TOEGANG AANVRAGEN" (versie 2.1)
 *
 * Feedback opdrachtgever: je wordt pas communitylid NA een kennismakingsgesprek.
 * Daarna vraag je hier toegang aan tot de communityomgeving (niveau 2).
 * Je komt hier via de pagina Inloggen of via "Communitylid worden".
 * Teksten: content/inloggen.ts
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Link } from '@nl-design-system-candidate/link-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import { Badge } from '../components/Badge/Badge';
import { Formulier, PrivacyRegel, type Veld } from '../components/Formulier/Formulier';
import { toegang } from '../content/inloggen';

const velden: Veld[] = [
  { naam: 'naam', label: 'Naam', soort: 'tekst', autoComplete: 'name', fout: 'Vul je naam in.' },
  { naam: 'organisatie', label: 'Gemeente of organisatie', soort: 'tekst', autoComplete: 'organization', fout: 'Vul je gemeente of organisatie in.' },
  { naam: 'functie', label: 'Functie', soort: 'tekst', autoComplete: 'organization-title', fout: 'Vul je functie in.' },
  { naam: 'email', label: 'E-mailadres van je werk', soort: 'email', autoComplete: 'email', omschrijving: 'Bijvoorbeeld: naam@gemeente.nl', fout: 'Vul het e-mailadres van je werk in.' },
  { naam: 'gesprek', label: 'Wanneer had je het kennismakingsgesprek?', soort: 'tekst', omschrijving: 'Bijvoorbeeld: 12 november 2026', fout: 'Vul in wanneer je het kennismakingsgesprek had.' },
];

export function ToegangAanvragen() {
  return (
    <section className="mijninkomen-section" aria-labelledby="toegang-titel">
      <div className="mijninkomen-container">
        <div className="mijninkomen-smalle-inhoud">
          <p className="mijninkomen-bovenkop mijninkomen-bovenkop--groen">{toegang.bovenkop}</p>
          <Heading level={1} id="toegang-titel">{toegang.titel}</Heading>
          <Paragraph purpose="lead">{toegang.tekst}</Paragraph>

          <div className="mijninkomen-let-op" role="note">
            <span className="mijninkomen-let-op__icoon" aria-hidden="true">
              i
            </span>
            <p>
              {toegang.letOp} <Link href="/meer-weten/communitylid">{toegang.letOpLink}</Link>
            </p>
          </div>

          <div className="mijninkomen-kaart mijninkomen-formulierkaart mijninkomen-blok-ruimte">
            <PrivacyRegel />
            <Formulier velden={velden} knop={toegang.knop} bevestiging={toegang.bevestiging} />
          </div>

          <Heading level={2}>
            {toegang.daarnaTitel} <Badge />
          </Heading>
          {toegang.daarna.map((t) => (
            <Paragraph key={t}>{t}</Paragraph>
          ))}
        </div>
      </div>
    </section>
  );
}
