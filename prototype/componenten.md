# Werking per onderdeel – voor development

Feedback van de opdrachtgever: een ontwerp is pas over te dragen als ook beschreven is **wat** een onderdeel doet,
**waar** de informatie vandaan komt en **hoe** het zich gedraagt.

> **Let op:** de kolom "Bron" is een **voorstel** vanuit het ontwerp. Dit moet nog worden afgestemd tussen ontwerp en development.
> - **CMS** = teksten die redacteuren zelf aanpassen, zonder programmeur
> - **GitHub** = informatie die het team al bijhoudt in GitHub (epics, features, issues)
> - **Website** = vast in de code van de website
> - **Formulierverwerking** = een dienst die formulieren veilig ontvangt (bijv. mailbox of zaaksysteem)

## Vaste onderdelen (op elke pagina)

| Onderdeel | Code | Doel | Bron (voorstel) | Gedrag |
|---|---|---|---|---|
| Kop met hoofdmenu | `components/PageHeader` | Logo, hoofdmenu, Inloggen en het streepje in de gemeentekleuren | Website | Huidige pagina is groen en onderstreept (`aria-current="page"`). Op een pagina eronder krijgt het menu-item `aria-current="true"`. Op een telefoon komt het menu onder het logo. |
| Voettekst | `components/PageFooter` | Contact, menu, privacyverklaring, LinkedIn | Website (links), CMS (teksten) | Alleen links. |
| Skiplink | NLDS Skip Link | Direct naar de inhoud springen | Website | Onzichtbaar tot je op Tab drukt. |

## Navigatie en knoppen

| Onderdeel | Code | Doel | Bron (voorstel) | Gedrag |
|---|---|---|---|---|
| Zijmenu | `components/Zijmenu` | Overzicht van de pagina's binnen Ontwikkelingen of Meer weten | Website | Op elke pagina van het onderdeel hetzelfde. De naam van het onderdeel staat niet in het menu, maar als kopje boven de paginatitel (vaste opbouw); schermlezers horen de naam via de `aria-label` van het menu. Huidige pagina: groene lijn links en vet. Op een detailpagina is het bovenliggende item gemarkeerd. Op een telefoon staat het menu boven de inhoud. Staat tegen de linkerkant van het scherm, over de hele hoogte, net als op niveau 2 (variant `app`). Het kruimelpad staat dan bovenaan de inhoud, naast het zijmenu. |
| Kruimelpad | `components/Kruimelpad` + `content/kruimelpad.ts` | Laat zien waar de pagina in de site zit, bijvoorbeeld Home › Meer weten › Webinar | Website | Op elke pagina van niveau 1, behalve de homepage. Elke stap is een link, behalve de huidige pagina (`aria-current="page"`). Staat boven `<main>`, zodat de skiplink eroverheen springt. Op een telefoon loopt het door op de volgende regel. Nieuwe pagina? Zet hem in `content/kruimelpad.ts`. |
| Knop als link | `components/KnopLink` | Een link naar een andere pagina die eruitziet als een NLDS-knop | Website | Gaat naar een andere pagina (het is een `<a>`, geen `<button>`). |
| Knop | NLDS Button | Een actie op dezelfde pagina: formulier versturen, formulier openklappen, e-mailadres kopiëren | Website | Werkt met muis, Enter en spatie. |

## Ontwikkelingen

| Onderdeel | Code | Doel | Bron (voorstel) | Gedrag |
|---|---|---|---|---|
| Projecttegel | `pages/ontwikkelingen/ProjectKaarten.tsx` | Kort overzicht van één project: naam, samenvatting, gemeenten, eventueel status | **GitHub** (epic/feature met een label "openbaar") of CMS | "Lees meer" gaat naar de detailpagina. Schermlezers horen "Lees meer over [project]". |
| Status | `components/Badge` (soort `status`) | Hoe ver een project is, in woorden: Beschikbaar, In ontwikkeling, In test, In voorbereiding | **GitHub** (status van de epic) | Alleen tekst, geen kleur als enige signaal. |
| Detailpagina project | `pages/ontwikkelingen/ProjectDetail.tsx` | Meer uitleg over één project | **GitHub** (beschrijving) of CMS (uitleg in gewone taal) | Eén sjabloon voor alle projecten, adres `/ontwikkelingen/project/<naam>`. Zonder uitgebreide tekst staat er dat de pagina later wordt aangevuld. Toont "Laatst bijgewerkt". |
| Recent bijgewerkt | `pages/Home.tsx` + `recentBijgewerkt()` in `content/ontwikkelingen.ts` | Laten zien wat er recent is veranderd | Komt vanzelf uit de projecten (datum "bijgewerkt"), dus uit **GitHub** of het CMS | Toont de 3 projecten met de nieuwste datum, met status en link naar de detailpagina. Niemand hoeft apart nieuws te schrijven. |

**Open vraag voor development:** kan projectinformatie automatisch uit GitHub worden opgehaald? Dan moet worden afgesproken welke velden openbaar zijn (bijv. alleen epics met een label "openbaar"), en wie de uitleg in gewone taal schrijft. De volledige roadmap blijft bij niveau 2.

## Meer weten en formulieren

| Onderdeel | Code | Doel | Bron (voorstel) | Gedrag |
|---|---|---|---|---|
| Formulier | `components/Formulier` | Eén component voor alle formulieren | Website + **Formulierverwerking** | Controleert verplichte velden en e-mail. Bij fouten: samenvatting bovenaan, links naar de velden, foutmelding bij elk veld. Na versturen een bevestiging. **In het prototype wordt niets verstuurd.** |
| Webinar-aanmelding | `pages/meer-weten/Webinar.tsx` | Aanmelden voor een webinar | Data: CMS of agenda. Aanmelding: Formulierverwerking | Formulier klapt open met een knop (`aria-expanded`). Alleen komende data zijn te kiezen. |
| Webinardata | `content/webinars.ts` | Lijst met webinardata | CMS of agenda | De site rekent zelf uit welke webinars al geweest zijn en welke nog komen. |
| Kennismakingsgesprek aanvragen | `pages/meer-weten/Kennismaking.tsx` | Een gesprek aanvragen | Formulierverwerking | Alleen te versturen met de datum van een gevolgd webinar. |
| Organisatie | `pages/meer-weten/Samenwerken.tsx` | Rollen en organisatie uitleggen | CMS | Alleen openbare informatie. |
| Initiatief melden | `pages/InitiatiefMelden.tsx` | Een idee of project melden, ook zonder lidmaatschap | Formulierverwerking | Los van het kennismakingsgesprek. |

## Inloggen

| Onderdeel | Code | Doel | Bron (voorstel) | Gedrag |
|---|---|---|---|---|
| Inloggen | `pages/Inloggen.tsx` | Toegang tot de communityomgeving (niveau 2) | **Website-applicatie** (inlogsysteem) | Alleen voor communityleden. Na het wachtwoord volgt **tweestapsverificatie**. Werkt nog niet in het prototype. |
| Toegang aanvragen | `pages/ToegangAanvragen.tsx` | Toegang aanvragen na een kennismakingsgesprek | Formulierverwerking → programmateam | Functie is een keuzelijst, met "Niet van toepassing" als laatste keuze. Het programmateam controleert de aanvraag en stuurt een e-mail om een account te maken. |

## Overig

| Onderdeel | Code | Doel | Bron (voorstel) | Gedrag |
|---|---|---|---|---|
| Logo's gemeenten | `content/gemeenten.ts` (gebruikt op de homepage en op "Hoe werken we samen?") | Laten zien wie er meedoen, en met welke rol | CMS (afbeelding, naam en rol) | Eén lijst voor de hele site. Logo met de naam als tekstalternatief; op "Hoe werken we samen?" staat de rol eronder. Toestemming van de gemeenten nodig. |
| Label "Voorbeeld" | `components/Badge` | Laat zien dat inhoud nog niet echt is | Alleen in het prototype | Moet weg zodra de echte inhoud er is. |
| Contactgegevens | `content/contact.ts` | Algemeen e-mailadres en reactietijd | CMS | Knop om het e-mailadres te kopiëren. |

## Niveau 2 – de communityomgeving

Alle gegevens staan in het prototype in `content/community.ts` en zijn voorbeelden.

| Onderdeel | Code | Doel | Bron (voorstel) | Gedrag |
|---|---|---|---|---|
| Inloggen | `pages/Inloggen.tsx` | Naar de communityomgeving | **Website-applicatie** (inlogsysteem met tweestapsverificatie) | Prototype: de knop werkt zonder gegevens en gaat naar `/community`. |
| Kop en voet niveau 2 | `components/CommunityKop` | Laten zien dat je in de besloten omgeving bent | Website | Alleen logo, "Communityomgeving" en Uitloggen (terug naar de openbare website). Gele balk: alles is voorbeeld. De ingelogde gebruiker staat in `pages/community/gebruiker.ts` (in het prototype altijd Sanne). Bij de echte bouw komt de gebruiker met zijn rol uit het inlogsysteem. |
| Account | `pages/community/Account.tsx` | Mijn gegevens, wijziging aanvragen, inloggen en beveiliging | Website-applicatie (gebruikersprofielen + aanvragen voor beheer) | Staat los onderaan in het zijmenu, met een lijn erboven. Naam en e-mailadres wijzig je zelf, elk apart en direct op de plek: knop Wijzigen met een potlood, dan Opslaan of Annuleren. De focus gaat naar het veld en daarna terug naar de knop; een fout staat bij het veld. Functie, gemeente en de telefoon voor de inlogcode wijzig je via een aanvraag bij beheer; beheer beslist of het mag. |
| Zijmenu niveau 2 | `components/Zijmenu` (variant `app`) + `pages/community/CommunityPagina.tsx` | De vijf pagina's van niveau 2 | Website | Zelfde gedrag als op niveau 1, maar het menu staat tegen de linkerkant van het scherm en de inhoud krijgt de rest van de breedte. Kop en voet gaan ook over de hele breedte. Op een telefoon staat het menu boven de inhoud. Elk onderdeel (behalve Home en Account) heeft eigen subpagina's, zoals op de NL Design System-website. Ze staan open bij het onderdeel waar je bent; het onderdeel krijgt `aria-current="true"`, de subpagina `aria-current="page"`. De eerste subpagina heeft hetzelfde adres als het onderdeel. Het menu staat in `content/community.ts`. |
| Nieuws (highlights) | `pages/community/CommunityHome.tsx` | Korte berichten uit de samenwerking | CMS | De 3 nieuwste. |
| Mijn acties | `pages/community/CommunityHome.tsx` | Acties voor de gebruiker of diens gemeente | **GitHub** (issues) of website-applicatie | Alleen acties die nog niet zijn afgerond. Rolgericht: van jou, van je gemeente, of (programmamanager) alle landelijke acties. |
| Agenda's | `pages/community/Agenda.tsx` | Alle overleggen in een agenda, met de weergaven Dag, Week en Maand, en een filter per overleg | **CMS** (overleggen met hun vaste ritme) of agenda-koppeling | Dag / Week / Maand zijn NLDS-knoppen met `toggle` en `pressed`. De periode wordt voorgelezen na Vorige of Volgende (`aria-live`). De maand is een tabel; op een telefoon scrollt hij opzij. Klik op een overleg: de details en de vaste agenda verschijnen eronder en krijgen de focus. Onder de agenda staan de drie vaste overleggen. |
| Besluitenlogboek | `pages/community/Vergaderingen.tsx` | Alle besluiten op één plek | **GitHub** (Markdown per besluit) of CMS | Zoeken op woord, filteren op datum (vanaf / tot en met), status en gemeente. Het aantal resultaten wordt voorgelezen (`aria-live`). |
| Actielijst | `pages/community/Vergaderingen.tsx` | Acties met eigenaar, streefdatum en status | **GitHub** (issues) | Filteren op status en op "alleen mijn gemeente". |
| Gemeenten, rollen en contactpersonen | `pages/community/Steden.tsx` | Per gemeente de rol (bouwt / betaalt mee, toetreder) en de contactpersoon, in één tabel | CMS + website-applicatie (gebruikersprofielen) | Tabel met echte kolom- en rijkoppen; op een telefoon scrollt de tabel opzij. Contactgegevens alleen zichtbaar na inloggen (privacy). In het prototype verzonnen namen. |
| Status per regeling | `pages/community/Steden.tsx` | Per gemeente de status van elke regeling: In gebruik, In ontwikkeling, In onderzoek of Niet in gebruik | CMS | Uitleg van de vier statussen boven de tabel. De status staat als tekst in de cel, niet alleen als kleur. |
| Roadmap-tijdlijn | `pages/community/Roadmap.tsx` | Epics per tertiaal en fase, met hun features (geen user stories) | **GitHub** (epics en features met labels voor tertiaal en fase) | Filteren op fase. Het huidige tertiaal heeft een rand en het label "Nu". De user stories blijven in Jira en GitHub. |
| Synclog Jira/GitHub | `pages/community/Roadmap.tsx` | Laten zien wanneer de gegevens zijn bijgewerkt | Website-applicatie (koppeling) | Status met icoon en tekst: Gelukt, Waarschuwing, Mislukt. |
| Innovatie-backlog | `pages/community/Initiatieven.tsx` | Ingediende ideeën met hun beoordeling | **GitHub** (aparte repository of project) | Los van de kern-roadmap. |
| Initiatief indienen | `pages/community/Initiatieven.tsx` | Een initiatief indienen als ingelogd lid | Formulierverwerking → GitHub-issue | Naam en gemeente komen van de ingelogde gebruiker. |
| Initiatief bijwerken | `pages/community/Initiatieven.tsx` | De indiener werkt zijn initiatief bij, via een link in een e-mail | Formulierverwerking → GitHub-issue bijwerken | Zo blijft de innovatie-backlog actueel. De vragen zijn nog een voorbeeld. |

## Beheer

Uiteindelijk komt er een **beheerhandleiding** waarin staat hoe redacteuren deze onderdelen aanpassen. Die kan worden gemaakt zodra duidelijk is wat in het CMS komt en wat uit GitHub.
