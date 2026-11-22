import { Badge } from "@site/packages/mijninkomen/components/Badge";
import { FormField, Heading, Paragraph, Table, TableBody, TableCaption, TableCell, TableContainer, TableHeader, TableHeaderCell, TableRow } from "@utrecht/component-library-react";
import { useState, useCallback, useEffect } from "react";
import { STATUSSEN, type statusTypes } from "./RoadmapStatuslijst";


type epicType = {
  titel: string,
  omschrijving: string,
  gemeenten: null | string[],
  status: statusTypes,
  features: featureType[],
};

type featureType = {
  title: string,
  description: string,
  isOpen: boolean
};

type APIresponseType = {
  roadmap: epicType[],
};

function afrondingsPercentage(features: any) {
  return `
    ${features.filter((feature: any) => feature.voltooid).length}/${features.length}
  `;
}

// Statisch adres voor testing
// const ADRES = "/community/roadmap.json";

// Dynamische adres connectie aan github API
const ADRES = "/api/roadmap/privaat/roadmap";

export function RoadmapBacklog() {
  const [backlog, setBacklog] = useState<null | false | APIresponseType>(null);
  const [filter, setFilter] = useState("ALLE");
  const haalOp = useCallback(async () => {
      try {
          const response = await fetch(ADRES);
          if (response.status === 401) {
            window.location.assign("/inloggen/");
            return;
          }

          if (response.status === 403) {
            window.location.assign("/geen-toegang/");
            return;
          }

          if (!response.ok) {
              throw new Error(`Status ${response.status}`);
          }

          setBacklog(await response.json());
      } catch(e) {
          console.error(e);
          setBacklog(false);
      }
  }, []);
  useEffect(() => {
      haalOp();
  }, [haalOp]);

  if (backlog === null) {
    return <>De roadmap is aan het laden...</>;
  }
  
  if (backlog === false) {
    return <>Er ging iets mis met het laden, probeer later opnieuw</>;
  }
  
  if (backlog.roadmap.length === 0) {
    return <>De roadmap is momenteel leeg, kijk later opnieuw voor nieuwe items</>;
  }
  
  const gefilterde: typeof backlog["roadmap"] = filter === "ALLE" ? backlog.roadmap
  : backlog.roadmap.filter(({ status }) => status === filter);
  
  return (
    <>
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
                  {features.map(({title, description, isOpen}) => (
                    <TableRow>
                      <TableCell>{title}</TableCell>
                      <TableCell>{description}</TableCell>
                      <TableCell>{isOpen ? "Ja" : "Nee"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </article>
        ))}
      </section>
    </>
  );
}