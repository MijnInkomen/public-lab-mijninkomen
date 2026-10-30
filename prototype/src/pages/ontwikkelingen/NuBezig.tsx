/** ONTWIKKELINGEN › Waar we nu aan werken – wat NU loopt, met een status */
import { Badge } from '../../components/Badge/Badge';
import { nuBezig, projecten } from '../../content/ontwikkelingen';
import { OntwikkelingenPagina } from './OntwikkelingenPagina';
import { ProjectKaarten } from './ProjectKaarten';

export function NuBezig() {
  return (
    <OntwikkelingenPagina
      titel={
        <>
          {nuBezig.titel} <Badge />
        </>
      }
      tekst={nuBezig.tekst}
    >
      <ProjectKaarten projecten={projecten.filter((p) => p.soort === 'bezig')} toonStatus />
    </OntwikkelingenPagina>
  );
}
