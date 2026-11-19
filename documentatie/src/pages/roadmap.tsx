import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import { Heading, PreHeading, Select, SelectOption, FormField, FormLabel, Table, TableBody, TableCaption, TableCell, TableContainer, TableHeader, TableHeaderCell, TableRow, UnorderedList, UnorderedListItem } from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { RoadmapBacklog } from '../components/roadmap/RoadmapBacklog';
import { Badge } from '../components/home/Badge';
import '../components/home/home.css';
import "../components/roadmap/roadmap.css";
import { useState } from 'react';

type statusTypes = "Trechter" | "PI Ready" | "In Behandeling" | "Refinement";
const STATUSSEN = [
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
];

function afrondingsPercentage(features: any) {
  return `
    ${features.filter((feature: any) => feature.voltooid).length}/${features.length}
  `;
}

export default function RoadmapPagina() {
  const [backlog, setBacklog] = useState<null>(null);
  const [filter, setFilter] = useState("ALLE");
  const gefilterde: typeof backlog["epics"] = filter === "ALLE" ? backlog.epics
    : backlog.epics.filter(({ status }) => status === filter);
  return (
    <>
      <Head>
        <title>Roadmap – MijnInkomen</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Layout>
        <main className="mijninkomen-home">
          <div className="container mijninkomen-sectie">
            <PreHeading>Voor communityleden</PreHeading>
            <Heading level={1}>Roadmap</Heading>
            <Paragraph appearance='lead'>
              Bekijk aan welke epics momenteel wordt gewerkt en hoe de voortgang ervoor staat
            </Paragraph>
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
            <section aria-labelledby='roadmap-epics' className="container mijninkomen-sectie">
              <Heading level={2} id="roadmap-epics">Epic Overzicht</Heading>
              <FormField type="select" label="Filter op status:" input={(
                <select
                  className="utrecht-select utrecht-select--html-select mijninkomen-roadmap__filter"
                  value={filter}
                  onChange={(event) => setFilter(event.target.value)}
                  itemType=''
                >
                  <option value={"ALLE"}>Alle statussen</option>
                  {STATUSSEN.map(({ naam }) => (
                    <option key={naam} value={naam}>
                      {naam}
                    </option>
                  ))}
                </select>
              )}>
              </FormField>
              <Table>
                <TableCaption>Overzicht van de Epics in de roadmap</TableCaption>
                <TableHeader>
                  <TableRow>
                    {["Naam", "Gemeente(n)", "Status", "Features Voltooid"].map((kop) => (
                      <TableHeaderCell key={kop} scope="col">
                        {kop}
                      </TableHeaderCell>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gefilterde.map(({ titel, gemeenten, status, features }) => (
                    <TableRow key={titel}>
                      <TableCell>{titel}</TableCell>
                      <TableCell>{gemeenten?.join() || "-"}</TableCell>
                      <TableCell><Badge soort="status">{status}</Badge></TableCell>
                      <TableCell>
                        {afrondingsPercentage(features)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {gefilterde.map(({ titel, omschrijving, gemeenten, status, features }) => (
                <article key={titel} className="mijninkomen-roadmap__epic">
                  <Heading level={3}>
                    {titel} <Badge soort="status">{status}</Badge>
                  </Heading>
                  <Paragraph>{omschrijving}</Paragraph>
                  <Paragraph>Gemeenten: {gemeenten?.join(", ") || "Alle gemeenten"}</Paragraph>
                  <TableContainer className="mijninkomen-roadmap__features">
                    <Heading level={4}>Features:</Heading>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHeaderCell>Naam</TableHeaderCell>
                          <TableHeaderCell>Omschrijving</TableHeaderCell>
                          <TableHeaderCell>Afgerond?</TableHeaderCell>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {features.map(({titel, omschrijving, voltooid}) => (
                          <TableRow>
                            <TableCell>{titel}</TableCell>
                            <TableCell>{omschrijving}</TableCell>
                            <TableCell>{voltooid ? "Ja" : "Nee"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </article>
              ))}
            </section>
            <RoadmapBacklog />
          </div>
        </main>
      </Layout>
    </>
  );
}
