/**
 * ProjectKaarten – tegels met een project, elk met een "Lees meer"-link
 *
 * Feedback opdrachtgever: bezoekers moeten bij een tegel meer informatie kunnen
 * bekijken. Elke tegel linkt naar /ontwikkelingen/project/<slug>.
 * Zichtbaar staat er "Lees meer"; voor schermlezers staat de naam van het project
 * erachter ("Lees meer over Stadspas"), zodat de link ook los duidelijk is (WCAG 2.4.4).
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Link } from '@nl-design-system-candidate/link-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import { Badge } from '../../components/Badge/Badge';
import { projectDetail, type Project } from '../../content/ontwikkelingen';

export function ProjectKaarten({ projecten, toonStatus = false }: { projecten: Project[]; toonStatus?: boolean }) {
  return (
    <ul className="mijninkomen-kaarten">
      {projecten.map((p) => (
        <li key={p.slug} className="mijninkomen-kaart mijninkomen-kaart--link">
          {toonStatus && (
            <p className="mijninkomen-kaart__status">
              <span className="mijninkomen-visually-hidden">Status: </span>
              <Badge soort="status">{p.status}</Badge>
            </p>
          )}
          <Heading level={2} appearance="level-3">
            {p.naam}
          </Heading>
          <Paragraph>{p.samenvatting}</Paragraph>
          <p className="mijninkomen-kaart__extra">Gemeenten: {p.gemeenten}</p>
          <p className="mijninkomen-kaart__meer">
            <Link href={`/ontwikkelingen/project/${p.slug}`}>
              {/* Zichtbaar: "Lees meer". Schermlezers horen ook de naam van het project */}
              {projectDetail.leesMeer}
              <span className="mijninkomen-visually-hidden"> over {p.naam}</span> <span aria-hidden="true">→</span>
            </Link>
          </p>
        </li>
      ))}
    </ul>
  );
}
