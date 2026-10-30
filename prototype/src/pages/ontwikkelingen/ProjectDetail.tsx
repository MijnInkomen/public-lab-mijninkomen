/**
 * ONTWIKKELINGEN › detailpagina van één project (adres /ontwikkelingen/project/<slug>)
 *
 * Eén sjabloon voor alle projecten. Feedback opdrachtgever: niet elke pagina
 * hoeft al gevuld te zijn; het prototype laat zien hoe het werkt.
 * - Stadspas en Basisproces bijzondere bijstand zijn helemaal uitgewerkt.
 * - Bij de andere projecten staat dat de pagina later wordt aangevuld.
 * Bij de echte bouw komt de inhoud uit GitHub of het CMS (zie componenten.md).
 */
import { Heading } from '@nl-design-system-candidate/heading-react/css';
import { Link } from '@nl-design-system-candidate/link-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react/css';
import { Badge } from '../../components/Badge/Badge';
import { projectDetail, projecten } from '../../content/ontwikkelingen';
import { datumKort } from '../../content/webinars';
import { OntwikkelingenPagina } from './OntwikkelingenPagina';

export function ProjectDetail({ slug }: { slug: string }) {
  const project = projecten.find((p) => p.slug === slug);

  if (!project) {
    return (
      <OntwikkelingenPagina titel="Project niet gevonden" tekst="Dit project bestaat niet (meer). Kies een onderdeel in het menu.">
        {null}
      </OntwikkelingenPagina>
    );
  }

  const ouder = project.soort === 'beschikbaar' ? '/ontwikkelingen' : '/ontwikkelingen/nu';

  return (
    <OntwikkelingenPagina
      titel={
        <>
          {project.naam} <Badge />
        </>
      }
      tekst={project.samenvatting}
      actiefItem={ouder}
      boven={
        <p className="mijninkomen-terug">
          <Link href={ouder}>
            <span aria-hidden="true">← </span>
            {projectDetail.terug[project.soort]}
          </Link>
        </p>
      }
    >
      {/* Kerngegevens van het project */}
      <dl className="mijninkomen-project-gegevens">
        <div>
          <dt>{projectDetail.status}</dt>
          <dd>
            <Badge soort="status">{project.status}</Badge>
          </dd>
        </div>
        <div>
          <dt>{projectDetail.gemeenten}</dt>
          <dd>{project.gemeenten}</dd>
        </div>
        <div>
          <dt>{projectDetail.bijgewerkt}</dt>
          <dd>
            <time dateTime={project.bijgewerkt}>{datumKort(project.bijgewerkt)}</time>
          </dd>
        </div>
      </dl>

      {project.detail ? (
        project.detail.blokken.map((b) => (
          <section key={b.titel} className="mijninkomen-project-blok">
            <Heading level={2} appearance="level-3">
              {b.titel}
            </Heading>
            {b.tekst && <Paragraph>{b.tekst}</Paragraph>}
            {b.lijst && (
              <ul className="mijninkomen-lijst">
                {b.lijst.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            )}
          </section>
        ))
      ) : (
        <p className="mijninkomen-project-leeg">{projectDetail.nogNiet}</p>
      )}
    </OntwikkelingenPagina>
  );
}
