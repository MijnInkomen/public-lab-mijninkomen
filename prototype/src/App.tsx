/**
 * APP – de opbouw van elke pagina:
 * skiplink → kop (PageHeader) → kruimelpad → inhoud (main) → voet (PageFooter)
 *
 * Kop en voet blijven op elke pagina hetzelfde. Alleen het deel in <main>
 * wisselt, afhankelijk van het adres (zie navigatie.ts).
 */
import { SkipLink } from '@nl-design-system-candidate/skip-link-react/css';
import { useEffect, useMemo, useRef, type ComponentType } from 'react';
import { CommunityKop, CommunityVoet } from './components/CommunityKop/CommunityKop';
import { Kruimelpad } from './components/Kruimelpad/Kruimelpad';
import { PageFooter } from './components/PageFooter/PageFooter';
import { PageHeader } from './components/PageHeader/PageHeader';
import { projecten } from './content/ontwikkelingen';
import { useHuidigPad } from './navigatie';
import { AccountAanvragen, AccountBeveiliging, AccountGegevens } from './pages/community/Account';
import { CommunityHome } from './pages/community/CommunityHome';
import {
  InitiatievenBeoordeling,
  InitiatievenBijwerken,
  InitiatievenIndienen,
  InitiatievenOverzicht,
} from './pages/community/Initiatieven';
import { RoadmapKoppeling, RoadmapTijdlijn } from './pages/community/Roadmap';
import { StedenRegelingen, StedenRollen } from './pages/community/Steden';
import { VergaderingenActies, VergaderingenAgendas, VergaderingenBesluiten } from './pages/community/Vergaderingen';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { InitiatiefMelden } from './pages/InitiatiefMelden';
import { Inloggen } from './pages/Inloggen';
import { Communitylid } from './pages/meer-weten/Communitylid';
import { Kennismaking } from './pages/meer-weten/Kennismaking';
import { Samenwerken } from './pages/meer-weten/Samenwerken';
import { Webinar } from './pages/meer-weten/Webinar';
import { AlKan } from './pages/ontwikkelingen/AlKan';
import { NuBezig } from './pages/ontwikkelingen/NuBezig';
import { ProjectDetail } from './pages/ontwikkelingen/ProjectDetail';
import { Privacy } from './pages/Privacy';
import { ToegangAanvragen } from './pages/ToegangAanvragen';

type Pagina = { titel: string; inhoud: ComponentType };

/**
 * Alle pagina's van het prototype: adres → titel en inhoud.
 * De opbouw (sitemap) staat ook in sitemap.md.
 */
const paginas: Record<string, Pagina> = {
  '/': { titel: 'MijnInkomen – Gemeenten werken samen', inhoud: Home },
  // Ontwikkelingen (met zijmenu)
  '/ontwikkelingen': { titel: 'Wat MijnInkomen al kan – Ontwikkelingen – MijnInkomen', inhoud: AlKan },
  '/ontwikkelingen/nu': { titel: 'Waar we nu aan werken – Ontwikkelingen – MijnInkomen', inhoud: NuBezig },
  // Meer weten (met zijmenu)
  '/meer-weten': { titel: 'Hoe werken we samen? – Meer weten – MijnInkomen', inhoud: Samenwerken },
  '/meer-weten/webinar': { titel: 'Webinar – Meer weten – MijnInkomen', inhoud: Webinar },
  '/meer-weten/kennismaking': { titel: 'Kennismakingsgesprek – Meer weten – MijnInkomen', inhoud: Kennismaking },
  '/meer-weten/communitylid': { titel: 'Communitylid worden – Meer weten – MijnInkomen', inhoud: Communitylid },
  // Losse pagina's
  '/initiatief-melden': { titel: 'Initiatief melden – MijnInkomen', inhoud: InitiatiefMelden },
  '/contact': { titel: 'Contact – MijnInkomen', inhoud: Contact },
  '/inloggen': { titel: 'Inloggen – MijnInkomen', inhoud: Inloggen },
  '/toegang-aanvragen': { titel: 'Toegang aanvragen – MijnInkomen', inhoud: ToegangAanvragen },
  '/privacy': { titel: 'Privacyverklaring – MijnInkomen', inhoud: Privacy },
  // NIVEAU 2: de communityomgeving (na inloggen). Eigen kop, voet en zijmenu.
  '/community': { titel: 'Home – Communityomgeving – MijnInkomen', inhoud: CommunityHome },
  // Elk onderdeel heeft eigen subpagina's (keuze Isabella)
  '/community/vergaderingen': { titel: "Agenda's – Vergaderondersteuning – Communityomgeving – MijnInkomen", inhoud: VergaderingenAgendas },
  '/community/vergaderingen/besluitenlogboek': { titel: 'Besluitenlogboek – Vergaderondersteuning – Communityomgeving – MijnInkomen', inhoud: VergaderingenBesluiten },
  '/community/vergaderingen/actielijst': { titel: 'Actielijst – Vergaderondersteuning – Communityomgeving – MijnInkomen', inhoud: VergaderingenActies },
  '/community/steden': { titel: 'Rollen en contactpersonen – Stand van zaken steden – Communityomgeving – MijnInkomen', inhoud: StedenRollen },
  '/community/steden/regelingen': { titel: 'Status per regeling – Stand van zaken steden – Communityomgeving – MijnInkomen', inhoud: StedenRegelingen },
  '/community/roadmap': { titel: 'Tijdlijn – Roadmap & backlog – Communityomgeving – MijnInkomen', inhoud: RoadmapTijdlijn },
  '/community/roadmap/koppeling': { titel: 'Koppeling met Jira en GitHub – Roadmap & backlog – Communityomgeving – MijnInkomen', inhoud: RoadmapKoppeling },
  '/community/initiatieven': { titel: 'Ingediende initiatieven – Initiatieven & innovaties – Communityomgeving – MijnInkomen', inhoud: InitiatievenOverzicht },
  '/community/initiatieven/beoordeling': { titel: 'Zo beoordelen we – Initiatieven & innovaties – Communityomgeving – MijnInkomen', inhoud: InitiatievenBeoordeling },
  '/community/initiatieven/indienen': { titel: 'Initiatief indienen – Initiatieven & innovaties – Communityomgeving – MijnInkomen', inhoud: InitiatievenIndienen },
  '/community/initiatieven/bijwerken': { titel: 'Initiatief bijwerken – Initiatieven & innovaties – Communityomgeving – MijnInkomen', inhoud: InitiatievenBijwerken },
  '/community/account': { titel: 'Mijn gegevens – Account – Communityomgeving – MijnInkomen', inhoud: AccountGegevens },
  '/community/account/aanvragen': { titel: 'Wijziging aanvragen – Account – Communityomgeving – MijnInkomen', inhoud: AccountAanvragen },
  '/community/account/beveiliging': { titel: 'Inloggen en beveiliging – Account – Communityomgeving – MijnInkomen', inhoud: AccountBeveiliging },
};

/** Zoek de pagina bij een adres. Projectpagina's hebben een adres met een "slug". */
function zoekPagina(pad: string): Pagina {
  if (paginas[pad]) return paginas[pad];
  const project = pad.match(/^\/ontwikkelingen\/project\/([a-z0-9-]+)$/);
  if (project) {
    const slug = project[1];
    const naam = projecten.find((p) => p.slug === slug)?.naam ?? 'Project';
    return { titel: `${naam} – Ontwikkelingen – MijnInkomen`, inhoud: () => <ProjectDetail slug={slug} /> };
  }
  return paginas['/'];
}

export function App() {
  const pad = useHuidigPad();
  const pagina = useMemo(() => zoekPagina(pad), [pad]);
  const Inhoud = pagina.inhoud;
  // Niveau 2 (de communityomgeving) heeft een eigen kop en voet
  const isCommunity = pad === '/community' || pad.startsWith('/community/');
  // Pagina's met een zijmenu tonen het kruimelpad zelf, naast het zijmenu
  const metZijmenu = pad.startsWith('/ontwikkelingen') || pad.startsWith('/meer-weten');
  const mainRef = useRef<HTMLElement>(null);
  const eersteKeer = useRef(true);

  useEffect(() => {
    // Titel in het tabblad aanpassen (WCAG 2.4.2: elke pagina een eigen titel)
    document.title = pagina.titel;

    const hash = window.location.hash;
    if (hash) {
      // Spring naar het stuk van de pagina achter de # (bijv. #samenwerken)
      document.querySelector(hash)?.scrollIntoView();
    } else if (!eersteKeer.current) {
      // Nieuwe pagina: naar boven, en de focus naar de inhoud zodat
      // schermlezers en toetsenbordgebruikers op de nieuwe pagina beginnen
      // preventScroll: de focus gaat naar de inhoud, maar de pagina blijft
      // bovenaan staan (anders schuift de browser een stukje naar beneden)
      // 'instant': meteen bovenaan, zonder het zachte scrollen uit base.css
      window.scrollTo({ top: 0, behavior: 'instant' });
      mainRef.current?.focus({ preventScroll: true });
    }
    eersteKeer.current = false;
  }, [pad, pagina.titel]);

  return (
    <div id="top">
      {/* NLDS Skip Link: onzichtbaar tot je op Tab drukt (WCAG 2.4.1) */}
      <SkipLink href="#inhoud">Direct naar de inhoud</SkipLink>
      {isCommunity ? <CommunityKop /> : <PageHeader huidigPad={pad} metZijmenu={metZijmenu} />}
      {/* Kruimelpad: waar ben je in de site? Alleen niveau 1, niet op de homepage.
          Het staat boven <main>, zodat de skiplink er direct overheen springt. */}
      {!isCommunity && !metZijmenu && <Kruimelpad pad={pad} />}
      <main id="inhoud" tabIndex={-1} ref={mainRef}>
        <Inhoud />
      </main>
      {isCommunity ? <CommunityVoet /> : <PageFooter metZijmenu={metZijmenu} />}
    </div>
  );
}
