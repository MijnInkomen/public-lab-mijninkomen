/** ONTWIKKELINGEN › Wat MijnInkomen al kan – wat AF is en gebruikt wordt */
import { Badge } from '../../components/Badge/Badge';
import { alKan, projecten } from '../../content/ontwikkelingen';
import { OntwikkelingenPagina } from './OntwikkelingenPagina';
import { ProjectKaarten } from './ProjectKaarten';

export function AlKan() {
  return (
    <OntwikkelingenPagina
      titel={
        <>
          {alKan.titel} <Badge />
        </>
      }
      tekst={alKan.tekst}
    >
      <ProjectKaarten projecten={projecten.filter((p) => p.soort === 'beschikbaar')} />
    </OntwikkelingenPagina>
  );
}
