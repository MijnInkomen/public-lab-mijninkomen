/**
 * MEER WETEN › Communitylid worden
 * Feedback opdrachtgever: je wordt niet direct lid via de website. Eerst een
 * webinar, dan een kennismakingsgesprek, daarna toegang aanvragen, en dan
 * inloggen. Deze pagina laat die volgorde zien in vier genummerde stappen.
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Link } from '@nl-design-system-candidate/link-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import { communitylid } from '../../content/meer-weten';
import { MeerWetenPagina } from './MeerWetenPagina';

export function Communitylid() {
  return (
    <MeerWetenPagina titel={communitylid.titel} tekst={communitylid.tekst}>
      <section className="mijninkomen-blok-ruimte" aria-labelledby="cl-wat">
        <Heading level={2} id="cl-wat">
          {communitylid.watTitel}
        </Heading>
        <Paragraph>{communitylid.wat}</Paragraph>
        <div className="mijninkomen-twee-kolommen">
          {[communitylid.oplevert, communitylid.vraagt].map((blok) => (
            <div key={blok.titel} className="mijninkomen-kaart">
              <Heading level={3}>{blok.titel}</Heading>
              <ul className="mijninkomen-lijst">
                {blok.lijst.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="cl-stappen">
        <Heading level={2} id="cl-stappen">
          {communitylid.stappenTitel}
        </Heading>
        {/* Genummerde lijst: de volgorde is hier echt belangrijk */}
        <ol className="mijninkomen-stappen mijninkomen-stappen--twee">
          {communitylid.stappen.map((s) => (
            <li key={s.titel} className="mijninkomen-stappen__stap">
              <Heading level={3}>{s.titel}</Heading>
              <Paragraph>{s.tekst}</Paragraph>
              <Link href={s.link.href}>
                {s.link.label} <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </MeerWetenPagina>
  );
}
