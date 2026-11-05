# Sitemap MijnInkomen – niveau 1 (versie 2.1)

Dit is de opbouw van de openbare website (niveau 1), na de feedback van de opdrachtgever.
Per pagina staat wat het **doel** is. Zo is duidelijk waarom elke pagina er is, en staat er geen informatie dubbel.

Uitgangspunt: **informeren, niet werven.** De site legt uit en stuurt door naar meer informatie.
De besloten communityomgeving (niveau 2) staat los van deze site.

## Hoofdmenu

Home · Ontwikkelingen · Meer weten · Initiatief melden · Contact — met **Inloggen** apart rechts.

- Ontwikkelingen en Meer weten zijn **informatie** en hebben een zijmenu.
- Initiatief melden is een **actie** en staat daarom apart in het menu.
- Inloggen staat los van de rest, zodat een nieuwe bezoeker niet denkt dat inloggen nodig is.

## Overzicht

```
/                                    Home
│
├── Ontwikkelingen  (zijmenu)
│   ├── /ontwikkelingen              Wat MijnInkomen al kan
│   │   └── /ontwikkelingen/project/<naam>   Detailpagina van een project
│   └── /ontwikkelingen/nu           Waar we nu aan werken
│       └── /ontwikkelingen/project/<naam>   Detailpagina van een project
│
├── Meer weten  (zijmenu)
│   ├── /meer-weten                  Hoe werken we samen?
│   ├── /meer-weten/webinar          Webinar (met aanmeldformulier)
│   ├── /meer-weten/kennismaking     Kennismakingsgesprek (met aanvraagformulier)
│   └── /meer-weten/communitylid     Communitylid worden (de stappen)
│
├── /initiatief-melden               Initiatief melden (met formulier)
├── /contact                         Contact
│
├── /inloggen                        Inloggen (alleen communityleden)
│   └── /toegang-aanvragen           Toegang aanvragen (na een kennismakingsgesprek)
│
└── /privacy                         Privacyverklaring (alleen in de footer)
```

## Doel per pagina

| Pagina | Doel | Wat staat er NIET |
|---|---|---|
| **Home** | Overzicht dat nieuwsgierig maakt: wat is MijnInkomen, waarom samen, wie doen mee, de 3 recent bijgewerkte projecten. Knoppen naar Ontwikkelingen en Meer weten. | Rollen van gemeenten, regelingen, formulieren |
| **Wat MijnInkomen al kan** | Wat **af** is en gebruikt wordt (regelingen), met "Lees meer" per regeling | Lopende onderwerpen |
| **Waar we nu aan werken** | Wat **nu** loopt, met een status in woorden | Afgeronde regelingen, plannen zonder datum |
| **Detailpagina project** | Meer uitleg over één project. Eén sjabloon voor alle projecten. Uitgewerkt: Stadspas en Basisproces bijzondere bijstand | – |
| **Hoe werken we samen?** | Rollen van de gemeenten, stuurgroep, programmateam, werkgroepen, community, openbare afspraken | Uitgebreide of vertrouwelijke afspraken (die staan achter de inlog) |
| **Webinar** | Wat je hoort in het webinar, wanneer, en aanmelden | – |
| **Kennismakingsgesprek** | Wat het gesprek is, en een gesprek aanvragen (alleen na een webinar) | Initiatieven melden |
| **Communitylid worden** | De volgorde: webinar → kennismakingsgesprek → toegang aanvragen → inloggen | – |
| **Initiatief melden** | Een idee of project melden, ook zonder lidmaatschap. Uitleg over het verschil met een kennismakingsgesprek | – |
| **Contact** | Algemene vragen, pers, vragen over de samenwerking. Verwijst door naar Kennismaking en Initiatief melden | Aanmeldingen |
| **Inloggen** | Alleen voor communityleden. Met tweestapsverificatie. Verwijst naar "Communitylid worden" en "Toegang aanvragen" | – |
| **Toegang aanvragen** | Toegang tot de communityomgeving aanvragen, na een kennismakingsgesprek | – |

## Zo voorkomen we dubbele informatie

De site geeft **alleen feiten**. Daarom is er geen pagina met plannen zonder datum ("Wat eraan komt"): die kunnen nog veranderen en wekken verwachtingen. De volledige planning hoort bij niveau 2.

Er is ook **geen aparte pagina met nieuwsberichten (Updates)**. Die overlapte met de andere pagina's en moet steeds worden bijgehouden; een oude datum bovenaan laat juist zien dat er niets gebeurt. In plaats daarvan toont de homepage automatisch de projecten die het laatst zijn bijgewerkt.

| Soort informatie | Waar staat het | Op de homepage |
|---|---|---|
| Afgerond (regelingen die werken) | Wat MijnInkomen al kan | Nee |
| Nu bezig | Waar we nu aan werken | Nee |
| Wat er recent veranderd is | Datum "Laatst bijgewerkt" bij elk project | Ja: "Recent bijgewerkt", de 3 laatst bijgewerkte projecten (gaat vanzelf) |
| Rollen en organisatie | Hoe werken we samen? | Alleen de logo's + link |

**Nog laten beoordelen door José en Selmar** (feedback opdrachtgever).

---

# Niveau 2 – de communityomgeving

Het besloten werkplatform voor communityleden, gebaseerd op het document "Website MijnInkomen – niveau 2".
Je komt erin via **Inloggen**. In het prototype werkt de knop zonder dat je iets invult.

- Eigen kop: logo, "Communityomgeving", wie er is ingelogd en **Uitloggen** (terug naar niveau 1).
- **Verticaal zijmenu** met de vijf pagina's, op elke pagina hetzelfde.
- Een gele balk zegt dat alle namen en gegevens voorbeelden zijn.

```
/community                     Home
/community/vergaderingen       Vergaderingen (agenda's, besluitenlogboek, actielijst)
/community/steden              Stand van zaken steden (rollen, regelingen, contactpersonen)
/community/roadmap             Roadmap & backlog (tijdlijn per tertiaal, koppeling Jira/GitHub)
/community/initiatieven        Initiatieven & innovaties (backlog, beoordeling, formulier)
```

| Pagina | Doel | Wat staat er NIET |
|---|---|---|
| **Home** | Binnen 30 seconden zien wat er speelt: nieuws, de eerstvolgende 2 overleggen, mijn acties en de laatste besluiten | Uitleg over wat MijnInkomen is (staat op niveau 1) |
| **Vergaderingen** | Vaste agenda per overleg, doorzoekbaar besluitenlogboek, actielijst met eigenaar, streefdatum en status | Webinars voor nieuwe gemeenten (niveau 1) |
| **Stand van zaken steden** | Wie doet mee met welke rol, welke regelingen per gemeente, wie is de contactpersoon | Algemene informatie voor nieuwe gemeenten (niveau 1) |
| **Roadmap & backlog** | Alle epics per tertiaal met hun fase, en wanneer Jira en GitHub zijn bijgewerkt | Nieuwe ideeën die nog niet zijn beoordeeld |
| **Initiatieven & innovaties** | Nieuwe ideeën los van de roadmap: wat is ingediend, hoe het wordt beoordeeld, en zelf iets indienen | De vaste roadmap |
