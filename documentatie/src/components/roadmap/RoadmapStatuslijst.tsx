import { Heading, UnorderedList, UnorderedListItem } from '@utrecht/component-library-react';
import { Badge } from '../home/Badge';

export type statusTypes = typeof STATUSSEN[number]["naam"];
export const STATUSSEN = [
  {
    naam: "Trechter",
    uitleg: "Deze Epics zijn nog in overleg"
  },
  {
    naam: "PI Ready",
    uitleg: "Deze Epics zijn klaar voor de PI Planning"
  },
  {
    naam: "In Behandeling",
    uitleg: "Aan deze Epics wordt momenteel gewerkt"
  },
  {
    naam: "Refinement",
    uitleg: "Aan deze Epics wordth nog het laatste werk gedaan om ze af te maken"
  },
] as const;

export function RoadmapStatuslijst() {
    return (
        <section aria-labelledby='roadmap-statussen' className="container mijninkomen-sectie">
            <Heading level={2} id="roadmap-statussen">Statussen</Heading>
            <UnorderedList>
            {STATUSSEN.map(({ naam, uitleg }) => (
                <UnorderedListItem>
                <Badge soort="status">{ naam }</Badge> <span>{uitleg}</span>
                </UnorderedListItem>
            ))}
            </UnorderedList>
        </section>
    );
}