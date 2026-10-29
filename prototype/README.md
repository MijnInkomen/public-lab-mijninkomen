# Prototype MijnInkomen

Dit is het **prototype** van de MijnInkomen-website. Het laat zien hoe de site eruit moet zien en hoe hij werkt.
Het is bedoeld als voorbeeld voor de echte bouw: de structuur, componenten en huisstijl kun je overnemen.

- **Ontwerp** (indeling, kleuren, logica): Isabella
- **Code**: gebouwd met hulp van AI (Claude), zie `AI-verantwoording.md`
- **Onderbouwing van de ontwerpkeuzes**: zie `onderbouwing.md`

Op dit moment staat **niveau 1** (informatief) erin, **versie 2**: Home, Ontwikkelingen, Aansluiten en Contact, plus een inlogpagina voor communityleden en een voorbeeld-privacyverklaring.
De indeling volgt het document "Paginastructuur website MijnInkomen – niveau 1" van Isabella.
**Niveau 2** (ingelogde communityleden) komt later.

---

## Opstarten

Je hebt [Node.js](https://nodejs.org) nodig (de LTS-versie).

Open een terminal in de map `prototype` en typ:

```
npm install
npm run dev
```

`npm install` hoef je maar één keer te doen. Daarna verschijnt er een link (meestal http://localhost:5173). Open die in je browser.

---

## Opbouw: net als NL Design System

De code is opgebouwd in drie lagen, zoals NL Design System dat ook doet:

```
prototype/
├── index.html                 ← de lege HTML-pagina waar React in komt
├── public/                    ← losse bestanden: groot logo en favicon (icoon in het browsertabblad)
├── src/
│   ├── main.tsx               ← startpunt: laadt de huisstijl en de App
│   ├── App.tsx                ← vaste opbouw: skiplink → kop → inhoud → voet, en welke pagina bij welk adres hoort
│   ├── navigatie.ts           ← eenvoudige navigatie tussen pagina's (alleen voor het prototype)
│   │
│   ├── assets/                ← afbeeldingen die in de code worden gebruikt (logo, logo's gemeenten, illustratie homepage)
│   │
│   ├── styles/
│   │   ├── tokens.css         ← LAAG 1: de huisstijl (design tokens)
│   │   ├── base.css           ← basisstijlen voor de hele pagina
│   │   └── paginas.css        ← opmaak die meerdere pagina's delen (intro, kaarten, lijstjes)
│   │
│   ├── components/            ← LAAG 2: eigen bouwstenen (de officiële NLDS-componenten komen uit node_modules)
│   │   ├── Badge/             ← labeltje "Voorbeeld" of een status
│   │   ├── Formulier/         ← één formuliercomponent voor alle formulieren
│   │   ├── Icon/
│   │   ├── Illustration/
│   │   ├── Logo/
│   │   ├── PageFooter/
│   │   └── PageHeader/
│   │
│   ├── pages/                 ← LAAG 3: pagina's, gebouwd uit componenten
│   │   ├── Home.tsx           ← adres: /
│   │   ├── Ontwikkelingen.tsx ← adres: /ontwikkelingen
│   │   ├── Aansluiten.tsx     ← adres: /aansluiten (webinar + aanmeldformulier)
│   │   ├── Contact.tsx        ← adres: /contact
│   │   ├── Inloggen.tsx       ← adres: /inloggen (alleen voor communityleden)
│   │   └── Privacy.tsx        ← adres: /privacy (voorbeeldtekst)
│   │
│   └── content/
│       ├── home.ts            ← teksten van de homepage
│       ├── inloggen.ts        ← teksten van de inlogpagina
│       ├── ontwikkelingen.ts  ← regelingen, lopende onderwerpen, plannen en updates
│       ├── aansluiten.ts      ← teksten van Aansluiten
│       ├── webinars.ts        ← data van de webinars (komende en geweeste worden automatisch gesplitst)
│       └── contact.ts         ← teksten van Contact (let op: voorbeeldgegevens)
```

**Regel:** componenten gebruiken nooit zelf een hex-code, maar altijd een token uit `tokens.css`.
Wil je de huisstijl aanpassen, dan doe je dat dus op één plek.

### Tokens

`tokens.css` heeft drie soorten tokens:

| Soort | Voorbeeld | Waarvoor |
|---|---|---|
| Merk-tokens | `--mijninkomen-color-groen` | De ruwe kleuren van de huisstijl |
| Algemene tokens | `--mijninkomen-document-color` | Betekenis: tekstkleur, achtergrond, focus |
| Component-tokens (NLDS) | `--nl-button-primary-background-color` | Thema voor de officiële NLDS-componenten |

### Officiële NL Design System-componenten

Waar NL Design System een officiële component heeft, gebruiken we die. Dit zijn de
**Candidate**-componenten van NLDS (`@nl-design-system-candidate/...`):

| Component | Pakket | Waar gebruikt |
|---|---|---|
| Button | `@nl-design-system-candidate/button-react` | Formulierknoppen, webinarknop, e-mailadres kopiëren. De link Inloggen in de kop gebruikt de NLDS-klassen van Button, omdat een link een `<a>` moet zijn |
| Heading | `@nl-design-system-candidate/heading-react` | Alle koppen |
| Paragraph | `@nl-design-system-candidate/paragraph-react` | Alle lopende tekst (`purpose="lead"` voor intro's) |
| Link | `@nl-design-system-candidate/link-react` | Menu, footer en alle links in de tekst |
| Skip Link | `@nl-design-system-candidate/skip-link-react` | "Direct naar de inhoud" |

We importeren ze via `.../css`, bijvoorbeeld
`import { Heading } from '@nl-design-system-candidate/heading-react/css'`. Dan wordt de NLDS-opmaak meteen mee geladen.

**Thema:** de NLDS-componenten lezen hun kleuren en maten uit tokens met vaste namen
(`--nl-button-primary-background-color`, `--nl-heading-level-1-color`, enz.). Die vullen we
in `src/styles/tokens.css` met de huisstijl van MijnInkomen. Welke tokens er zijn, staat per
component op [nldesignsystem.nl](https://nldesignsystem.nl).

### Eigen componenten

Voor onderdelen waarvoor NLDS (nog) geen officiële component heeft, hebben we zelf een
component gemaakt. Die gebruiken dezelfde tokens.

| Component | Wat het doet | Opmerking |
|---|---|---|
| `Formulier` | Formulier met controle, foutensamenvatting en bevestiging. Je geeft een lijst velden mee (tekst, e-mail, wachtwoord, tekstvak, keuzelijst, aanvinken), eventueel met een korte uitleg (`omschrijving`). Geen placeholders, volgens NLDS | NLDS heeft hier (nog) geen Candidate-componenten voor; gewone HTML-velden volgens de NLDS-richtlijnen voor formulieren |
| `Badge` | Labeltje "Voorbeeld" (stippellijn) of een status zoals "In test" | Markeert voorbeeldinhoud, zodat niemand denkt dat het echte informatie is |
| `PageHeader` | Logo, menu, Inloggen en het gemeentestreepje | Volgt het community-patroon "Page Header" |
| `PageFooter` | Voettekst met contact en menu | Volgt het community-patroon "Page Footer" |
| `Logo` | Logo van MijnInkomen (afbeelding), volledig of alleen de M | |
| `Icon` | Lijn-icoon in een lichtgroen rondje | |
| `OverIllustraties`, `SamenwerkenIllustraties`, `ContactIllustraties` | Decoratieve illustraties (SVG) | De namen komen nog uit versie 1, de illustraties worden op de nieuwe pagina's gebruikt |

Check op [nldesignsystem.nl](https://nldesignsystem.nl) of er inmiddels nieuwe officiële componenten zijn, want NLDS verandert regelmatig.

---

## Toegankelijkheid (WCAG 2.2 AA)

Waar al rekening mee is gehouden:

- **Contrast**: alle tekst haalt minstens 4,5:1. Geel wordt alleen als decoratie gebruikt (zie `onderbouwing.md`).
- **Toetsenbord**: alles werkt met Tab en Enter, en de focus is duidelijk zichtbaar.
- **Skiplink**: druk op Tab bovenaan de pagina om direct naar de inhoud te gaan.
- **Koppen**: één h1, en geen kopniveaus overgeslagen.
- **Landmarks**: `header`, `nav`, `main` en `footer`, zodat schermlezers de pagina kunnen indelen.
- **Kleur is nooit het enige signaal**: links zijn onderstreept en meldingen hebben een icoon.
- **Tikdoelen**: knoppen zijn minstens 44 px hoog.
- **Mobiel**: de pagina past zich aan op smalle schermen.
- **Minder beweging**: wie dat in zijn systeem heeft ingesteld, krijgt geen animaties.

Bij de echte bouw: test opnieuw, bijvoorbeeld met een schermlezer (NVDA) en met axe of Lighthouse.

---

## Wat er in het prototype nog niet echt is

| Onderdeel | In het prototype | Bij de echte bouw |
|---|---|---|
| Inloggen | Pagina met formulier; controleert alleen of de velden zijn ingevuld | Echte, veilige login (niveau 2), met "wachtwoord vergeten" |
| Navigatie | Zelfgemaakt in `navigatie.ts` | Een echte router (React Router of de routing van Docusaurus). Let op: de server moet bij elk adres `index.html` teruggeven |
| Formulieren (webinar, aanmelden) | Controleren de velden en tonen een bevestiging, maar versturen niets | Veilig versturen (bijv. naar een mailbox of zaaksysteem) |
| Webinardata | Vaste lijst in `content/webinars.ts`; welke al geweest zijn, rekent de code uit met de datum van vandaag | Uit een agenda of beheersysteem |
| Privacyverklaring | Korte voorbeeldtekst | De echte verklaring van de opdrachtgever (AVG) |
| Contactgegevens en LinkedIn | Voorbeeldgegevens | Echte gegevens, af te stemmen met de opdrachtgever |
| Ontwikkelingen, spelregels, termijnen | Voorbeeldteksten, gemarkeerd met "Voorbeeld" | Alleen informatie die de opdrachtgever heeft goedgekeurd |
| Gemeenten | Officiële logo's (van de huisstijlsites van de gemeenten) | Alleen gebruiken met toestemming van de gemeenten |
| Footerlinks | Menu, privacyverklaring en LinkedIn | Ook een toegankelijkheidsverklaring |
| Teksten | In de map `content/` | Afstemmen met de opdrachtgever |
| Logo | Conceptlogo als PNG (`public/logo-mijninkomen.png`) | Definitief logo als SVG, na akkoord van de opdrachtgever |
| Gegevens | Geen, alles staat vast in de code | Echte gegevens, met aandacht voor privacy (AVG) |
