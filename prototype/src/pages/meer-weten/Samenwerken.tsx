/**
 * MEER WETEN › Hoe werken we samen?
 * De rollen van de gemeenten en hoe de samenwerking is georganiseerd
 * (stuurgroep, programmateam, werkgroepen, community). Alleen openbare
 * informatie; de uitgebreide afspraken staan achter de inlog (niveau 2).
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import { Badge } from '../../components/Badge/Badge';
import { Icon } from '../../components/Icon/Icon';
import { gemeenten } from '../../content/gemeenten';
import { samenwerken } from '../../content/meer-weten';
import { MeerWetenPagina } from './MeerWetenPagina';

export function Samenwerken() {
  return (
    <MeerWetenPagina titel={samenwerken.titel} tekst={samenwerken.tekst}>
      <section className="mijninkomen-blok-ruimte" aria-labelledby="sw-gemeenten">
        <Heading level={2} id="sw-gemeenten">
          {samenwerken.gemeentenTitel}
        </Heading>
        {/* Logo met daaronder de rol. Het logo heeft de naam als tekstalternatief. */}
        <ul className="mijninkomen-deelnemers mijninkomen-deelnemers--rand">
          {gemeenten.map((g) => (
            <li key={g.naam} className="mijninkomen-deelnemer">
              <div className="mijninkomen-deelnemer__logo">
                <img src={g.logo} alt={g.naam} />
              </div>
              <p className="mijninkomen-deelnemer__rol">{g.rol}</p>
            </li>
          ))}
        </ul>
        <Paragraph className="mijninkomen-sw-rollen">{samenwerken.rollenIntro}</Paragraph>
        <dl className="mijninkomen-gegevens">
          {samenwerken.rollenUitleg.map((r) => (
            <div key={r.rol}>
              <dt>{r.rol}</dt>
              <dd>{r.uitleg}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mijninkomen-blok-ruimte" aria-labelledby="sw-organisatie">
        <Heading level={2} id="sw-organisatie">
          {samenwerken.organisatieTitel} <Badge />
        </Heading>
        <ul className="mijninkomen-kaarten">
          {samenwerken.organisatie.map((o) => (
            <li key={o.naam} className="mijninkomen-kaart">
              <Icon naam={o.icoon} />
              <Heading level={3}>{o.naam}</Heading>
              <Paragraph>{o.tekst}</Paragraph>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="sw-afspraken">
        <Heading level={2} id="sw-afspraken">
          {samenwerken.afsprakenTitel} <Badge />
        </Heading>
        <ul className="mijninkomen-lijst">
          {samenwerken.afspraken.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
        <p className="mijninkomen-kaart__extra">{samenwerken.afsprakenBesloten}</p>
      </section>
    </MeerWetenPagina>
  );
}
