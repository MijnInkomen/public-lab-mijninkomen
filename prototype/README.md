# Prototype MijnInkomen

Dit is het **prototype** van de MijnInkomen-website. Het laat zien hoe de site eruit moet zien en hoe hij werkt.
Het is bedoeld als voorbeeld voor de echte bouw: de structuur, componenten en huisstijl kun je overnemen.

- **Ontwerp** (indeling, kleuren, logica): Isabella
- **Code**: gebouwd met hulp van AI (Claude), zie `AI-verantwoording.md`
- **Onderbouwing van de ontwerpkeuzes**: zie `onderbouwing.md`

Op dit moment staat **niveau 1** (informatief) erin: de homepage en de pagina's Over MijnInkomen, Samenwerken en Contact.
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
│   │   └── base.css           ← basisstijlen voor de hele pagina
│   │
│   ├── components/            ← LAAG 2: eigen bouwstenen (de officiële NLDS-componenten komen uit node_modules)
│   │   ├── ButtonLink/
│   │   ├── ContactFormulier/
│   │   ├── Icon/
│   │   ├── Illustration/
│   │   ├── Logo/
│   │   ├── PageFooter/
│   │   └── PageHeader/
│   │
│   ├── pages/                 ← LAAG 3: pagina's, gebouwd uit componenten
│   │   ├── Home.tsx           ← adres: /
│   │   ├── OverMijnInkomen.tsx ← adres: /over-mijninkomen
│   │   ├── Samenwerken.tsx    ← adres: /samenwerken
│   │   └── Contact.tsx        ← adres: /contact
│   │
│   └── content/
│       ├── home.ts            ← teksten van de homepage
│       ├── over.ts            ← teksten van Over MijnInkomen
│       ├── samenwerken.ts     ← teksten van Samenwerken
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
| Button | `@nl-design-system-candidate/button-react` | Knop Inloggen; ook de opmaak van `ButtonLink` |
| Heading | `@nl-design-system-candidate/heading-react` | Alle koppen |
| Paragraph | `@nl-design-system-candidate/paragraph-react` | Alle lopende tekst (`purpose="lead"` voor intro's) |
| Link | `@nl-design-system-candidate/link-react` | Menu en footer |
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
| `ButtonLink` | Link die eruitziet als NLDS-knop | De NLDS Button is altijd een `<button>`; voor navigeren hoort een `<a>`. Gebruikt de officiële NLDS-klassen. |
| `ContactFormulier` | Contactformulier met foutmeldingen | NLDS heeft hier (nog) geen Candidate-componenten voor; gewone HTML-velden volgens de NLDS-richtlijnen voor formulieren |
| `PageHeader` | Logo, menu, Inloggen en het gemeentestreepje | Volgt het community-patroon "Page Header" |
| `PageFooter` | Voettekst met contact en menu | Volgt het community-patroon "Page Footer" |
| `Logo` | Logo van MijnInkomen (afbeelding), volledig of alleen de M | |
| `Icon` | Lijn-icoon in een lichtgroen rondje | |
| `SignpostIllustration`, `OverIllustraties`, `SamenwerkenIllustraties`, `ContactIllustraties` | Decoratieve illustraties (SVG) | |

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
| Inloggen | Knop toont een melding | Echte, veilige login (niveau 2) |
| Navigatie | Zelfgemaakt in `navigatie.ts` | Een echte router (React Router of de routing van Docusaurus). Let op: de server moet bij elk adres `index.html` teruggeven |
| Contactformulier | Controleert de velden en toont een bevestiging, maar verstuurt niets | Veilig versturen (bijv. naar een mailbox of zaaksysteem), met een privacyverklaring (AVG) |
| Contactgegevens | Voorbeeldgegevens | Echte gegevens, af te stemmen met de opdrachtgever |
| Veelgestelde vragen | Alleen een tekst, nog geen pagina | Pagina met vragen en antwoorden |
| Gemeenten | Officiële logo's (van de huisstijlsites van de gemeenten) | Alleen gebruiken met toestemming van de gemeenten |
| Footerlinks | Alleen het menu | Ook Privacy en Toegankelijkheid (staan in het ontwerp) |
| Teksten | Uit het ontwerp, in `content/home.ts` | Afstemmen met de opdrachtgever |
| Logo | Conceptlogo als PNG (`public/logo-mijninkomen.png`) | Definitief logo als SVG, na akkoord van de opdrachtgever |
| Gegevens | Geen, alles staat vast in de code | Echte gegevens, met aandacht voor privacy (AVG) |
