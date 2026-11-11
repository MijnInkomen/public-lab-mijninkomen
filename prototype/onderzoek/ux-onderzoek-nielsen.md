# UX-onderzoek: Nielsen, WCAG en NLDS voor niveau 1

Doo: Isabella Jansen. 
Dit is een levend document: ik vul het aan zodra mijn onderzoek verder gaat. In de geschiedenis van GitLab is te zien wat ik zelf heb aangepast.

## Inleiding

Mijn docent gaf me de tip om de tien heuristieken van Nielsen te gebruiken. Een heuristiek is een vuistregel: een korte regel waarmee je snel kunt zien of een ontwerp prettig werkt. Jakob Nielsen stelde deze tien regels op in 1994, op basis van een analyse van honderden gebruiksproblemen. Ze worden nog steeds veel gebruikt om ontwerpen te beoordelen (Nielsen, 2024).

De heuristieken zeggen alleen weinig over toegankelijkheid en niets over welke componenten je moet gebruiken. Daarom zet ik ze naast de WCAG en het NL Design System (NLDS). MijnInkomen is een opdracht voor de publieke sector. In Nederland zijn overheidsorganisaties, ook gemeenten, wettelijk verplicht om hun websites toegankelijk te maken volgens de Europese norm EN 301 549. In die norm zitten de WCAG-eisen op niveau AA. Deze plicht stond eerst in het Tijdelijk besluit digitale toegankelijkheid overheid (2018) en is nu opgenomen in de Wet digitale overheid (VNG, z.d.). NLDS is daarnaast de standaard die de opdrachtgever vraagt. Alleen Nielsen is voor dit project dus niet genoeg.

**Onderzoeksvraag:** hoe kan ik de heuristieken van Nielsen samen met de WCAG en NLDS gebruiken om niveau 1 van mijn prototype te beoordelen en te verbeteren?

Ik beperk me tot niveau 1: het openbare, informatieve deel van de MijnInkomen-website. Bezoekers zijn medewerkers van gemeenten, zoals beleidsadviseurs en managers. Zij willen weten wat MijnInkomen is, wat het al kan en hoe ze kunnen meedoen. Ze moeten die informatie snel kunnen vinden en begrijpen, ook als ze een beperking hebben.

Dit document is de basis voor de volgende stap: een heuristische evaluatie van mijn prototype.

## De 10 heuristieken op niveau 1

Per heuristiek staat hieronder wat die betekent, hoe je hem terugziet in mijn prototype en welke WCAG-criteria en NLDS-onderdelen erbij horen. Een heuristiek en een WCAG-criterium liggen vaak dicht bij elkaar, maar zijn nooit precies hetzelfde. De Engelse naam staat erbij, zodat je hem makkelijk terugvindt in de bron. Bij elk WCAG-criterium staat het niveau (A, AA of AAA). Voor ons project is AA de eis.

| # | Heuristiek | Wat het betekent | Zo zie je het in mijn prototype | WCAG 2.2 | NLDS |
| --- | --- | --- | --- | --- | --- |
| 1 | Zichtbaarheid van de systeemstatus (*Visibility of system status*) | De gebruiker weet altijd waar hij is en wat er gebeurt. Zo voelt hij zich niet verloren. | Het menu laat zien op welke pagina je bent. Het kruimelpad laat zien waar die pagina in de site zit. Na een klik springt de focus naar de nieuwe inhoud, zodat ook een schermlezer weet dat er iets veranderd is. | 2.4.2 Paginatitel (A), 2.4.7 Focus zichtbaar (AA), 2.4.8 Locatie (AAA), 4.1.3 Statusberichten (AA) | Link met `current`, focusstijl via tokens, kruimelpad (breadcrumb navigation) |
| 2 | Aansluiten bij de echte wereld (*Match between system and the real world*) | Gebruik woorden en een volgorde die de gebruiker kent, geen vaktaal of interne termen. | Teksten op B1-niveau. Vage woorden zijn vervangen: "Sluit aan" werd "Communitylid" en "Aansluiten" werd "Meer weten". Het menu volgt de vragen die een bezoeker na elkaar heeft. | 3.1.1 Taal van de pagina (A), 3.1.5 Leesniveau (AAA) | Richtlijnen voor schrijven en content |
| 3 | Controle en vrijheid (*User control and freedom*) | De gebruiker kan makkelijk terug of ergens uit, zonder vast te lopen. | Een skiplink brengt je direct naar de inhoud. De terugknop van de browser werkt. Via het kruimelpad ga je makkelijk een niveau terug. | 2.4.1 Blokken omzeilen (A), 2.1.2 Geen toetsenbordval (A) | Skip link-component |
| 4 | Consistentie en standaarden (*Consistency and standards*) | Wat hetzelfde doet, ziet er overal hetzelfde uit en staat op dezelfde plek. Zo hoeft de gebruiker niet steeds opnieuw te leren hoe de site werkt. | Kop, voet en menu staan op elke pagina op dezelfde plek. De naam van het onderdeel staat altijd boven de paginatitel. | 3.2.3 Consistente navigatie (AA), 3.2.4 Consistente identificatie (AA) | Dezelfde componenten en tokens op de hele site |
| 5 | Fouten voorkomen (*Error prevention*) | Ontwerp zo dat fouten minder snel gebeuren. Voorkomen is beter dan een foutmelding achteraf. | Elk formulierveld heeft een zichtbaar label en waar nodig uitleg. Bij Functie kies je uit een lijst in plaats van zelf te typen. | 3.3.2 Labels of instructies (A), 1.3.5 Doel van invoer (AA) | Formulierrichtlijnen: label boven het veld, geen placeholder als label |
| 6 | Herkennen in plaats van herinneren (*Recognition rather than recall*) | De gebruiker hoeft niets te onthouden. De opties staan in beeld, zodat hij ze alleen hoeft te herkennen. | Het hoofdmenu staat altijd in beeld. Het zijmenu toont alle pagina's van een onderdeel. Duidelijke koppen laten zien waar een stuk tekst over gaat. | 2.4.6 Koppen en labels (AA), 3.3.7 Overbodige invoer (A) | Heading-component voor een vaste koppenstructuur |
| 7 | Flexibiliteit en efficiëntie (*Flexibility and efficiency of use*) | Iedereen komt snel bij zijn doel, op zijn eigen manier en met zijn eigen apparaat. | Alles werkt met muis en met toetsenbord. De site werkt op een scherm van 320 pixels breed en als je de tekst vergroot. | 2.1.1 Toetsenbord (A), 1.4.10 Reflow (AA), 1.4.4 Tekst vergroten (AA) | Componenten zijn responsive en met het toetsenbord te bedienen |
| 8 | Esthetisch en minimalistisch ontwerp (*Aesthetic and minimalist design*) | Toon alleen wat de gebruiker nodig heeft. Elke extra tekst of kleur leidt af van wat belangrijk is. | De pagina's Updates en "Wat eraan komt" zijn weggehaald, omdat ze dubbel waren. Kleur wordt alleen als accent gebruikt. | 1.4.3 Contrast (AA), 1.3.1 Info en relaties (A) | Design tokens voor kleur, ruimte en lettertype |
| 9 | Fouten herkennen en herstellen (*Help users recognize, diagnose, and recover from errors*) | Gaat er toch iets mis? Dan zegt de foutmelding in gewone taal wat er mis is en hoe je het oplost. | Het formuliercomponent kan per veld een foutmelding tonen. Die staat bij het veld zelf, zodat je ziet waar het misgaat. | 3.3.1 Fout identificeren (A), 3.3.3 Foutsuggestie (AA) | Formulierrichtlijnen voor foutmeldingen |
| 10 | Hulp en documentatie (*Help and documentation*) | Een goede site werkt zonder uitleg. Is er toch hulp nodig, dan is die makkelijk te vinden. | Contact staat in het hoofdmenu en in de voet van elke pagina. | 3.2.6 Consistente hulp (A), 3.3.5 Hulp (AAA) | Vaste plek in de paginavoet |

Bron heuristieken: Nielsen (2024). Bron criteria: W3C (2023).

## Hoe Nielsen, WCAG en NLDS samenhangen

De drie vullen elkaar aan, omdat ze elk een andere vraag beantwoorden:

1. **Nielsen: is het makkelijk te gebruiken?** Dit zijn algemene vuistregels. Ze helpen om problemen te vinden, maar zeggen niet precies wanneer iets goed of fout is. Daarvoor heb je je eigen oordeel nodig.
2. **WCAG: kan iedereen het gebruiken?** Dit zijn toetsbare eisen, ook voor mensen met een beperking, zoals mensen die slecht zien of een schermlezer gebruiken. Een criterium is gehaald of niet gehaald.
3. **NLDS: hoe bouw je het?** Dit zijn kant-en-klare componenten en richtlijnen voor overheidswebsites. Veel WCAG-eisen zitten er al in, zoals een zichtbare focus en een skiplink. Dat scheelt werk en zorgt dat overheidssites op elkaar lijken.

Een ontwerp kan aan de WCAG voldoen en toch onduidelijk zijn. Een menu kan bijvoorbeeld technisch goed in elkaar zitten, maar vage woorden gebruiken. Andersom kan een ontwerp prettig zijn voor de meeste mensen, maar onbruikbaar met een schermlezer.

Daarom gebruik ik ze alle drie, elk voor een eigen stap: Nielsen om problemen te vinden, de WCAG om te toetsen of iedereen erbij kan, en NLDS om de oplossing te bouwen.

## Kritische kanttekeningen

De heuristieken zijn nuttig, maar ze hebben grenzen. Hieronder staan de grenzen die voor dit project het belangrijkst zijn, en wat ik eraan doe.

- **Ze zijn niet gemaakt voor toegankelijkheid.** Nielsen schreef ze in de jaren negentig voor software in het algemeen. Mensen die blind zijn of alleen een toetsenbord gebruiken, komen er nauwelijks in voor. Daarom toets ik elk punt ook aan de WCAG.
- **Eén beoordelaar vindt niet alles.** Nielsen en Molich (1990) lieten mensen los van elkaar een ontwerp beoordelen. Eén persoon vond maar een deel van de problemen, tussen de 20 en 51 procent. Wie samen kijkt, vindt veel meer, omdat iedereen andere dingen ziet. Daarom laat ik mijn prototype in sprint 3 en 4 ook beoordelen door mijn team, de opdrachtgever en andere stakeholders.
- **Het vervangt geen test met gebruikers.** Een heuristische evaluatie is een inschatting door mensen die naar het ontwerp kijken. Of medewerkers van gemeenten de site echt begrijpen, weet je pas als zij het zelf proberen.
- **De heuristieken kunnen botsen.** Een minimalistisch ontwerp (heuristiek 8) kan te weinig uitleg geven (heuristiek 10). Ik moet dan zelf afwegen wat zwaarder weegt voor de bezoeker, en die keuze onderbouwen.
- **WCAG AA is niet het maximum.** Sommige criteria die goed passen, zoals Leesniveau (3.1.5) en Locatie (2.4.8), zijn niveau AAA. Met B1-taal en een kruimelpad doe ik dus meer dan de verplichte eis.
- **Niet elk NLDS-component is al volledig getest.** Wij gebruiken Candidate-componenten. Die zijn goed bruikbaar, maar nog niet door de hele NLDS-community bevestigd. Ze kunnen in de toekomst dus nog veranderen.

## Wat het zwaarst weegt op niveau 1

Niveau 1 is vooral een site om te lezen en informatie te zoeken, met een paar formulieren. Niet elke heuristiek is daarom even belangrijk. Deze weging gebruik ik in de evaluatie om te bepalen welke problemen ik als eerste oplos.

| Weging | Heuristieken | Waarom |
| --- | --- | --- |
| Zwaar | 2 Echte wereld, 4 Consistentie, 6 Herkennen, 8 Minimalistisch | Bezoekers komen vooral om te lezen en te zoeken. Ze moeten de woorden begrijpen, snel de juiste pagina vinden en niet afgeleid worden door overbodige informatie. |
| Gemiddeld | 1 Systeemstatus, 3 Controle, 7 Flexibiliteit, 10 Hulp | Belangrijk om je weg te vinden, vooral voor mensen die een toetsenbord of schermlezer gebruiken. Er gebeurt alleen weinig op de site zelf, dus het speelt minder vaak. |
| Alleen bij formulieren | 5 Fouten voorkomen, 9 Fouten herstellen | Speelt alleen bij Initiatief melden, Toegang aanvragen, Kennismaking en Contact. Daar is het wel belangrijk: een formulier dat niet lukt, kost je een aanmelding. |

## Volgende stap: de heuristische evaluatie

Met dit onderzoek loop ik mijn prototype pagina voor pagina langs. Per probleem noteer ik vier dingen:

1. Welke heuristiek het raakt, en welk WCAG-criterium erbij hoort.
2. Wat het probleem is en op welke pagina het staat.
3. Hoe ernstig het is (zie de schaal hieronder).
4. Een of meer oplossingen, met het NLDS-component dat ik daarvoor zou gebruiken.

Voor de ernst gebruik ik de schaal van Nielsen (1994). Zo kan ik kiezen wat eerst moet:

| Score | Betekenis |
| --- | --- |
| 0 | Geen probleem |
| 1 | Alleen cosmetisch: oplossen als er tijd over is |
| 2 | Klein probleem: lage prioriteit |
| 3 | Groot probleem: belangrijk om op te lossen |
| 4 | Ernstig probleem: moet opgelost worden voor de oplevering |

De problemen met score 3 en 4 los ik als eerste op. Daarna leg ik de verbeteringen voor aan Vincent, Selmar en José.

## Bronnen

- Nielsen, J. (1994). *Severity ratings for usability problems*. Nielsen Norman Group. <https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/>
- Nielsen, J. (2024). *10 usability heuristics for user interface design*. Nielsen Norman Group. <https://www.nngroup.com/articles/ten-usability-heuristics/>
- Nielsen, J., & Molich, R. (1990). Heuristic evaluation of user interfaces. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems* (pp. 249–256). ACM. <https://doi.org/10.1145/97243.97281>
- NL Design System. (z.d.). *Componenten*. <https://nldesignsystem.nl/componenten>
- *Tijdelijk besluit digitale toegankelijkheid overheid*. (2018). Staatsblad 2018, 141. <https://zoek.officielebekendmakingen.nl/stb-2018-141.html>
- VNG. (z.d.). *Digitale toegankelijkheid*. Vereniging van Nederlandse Gemeenten. <https://vng.nl/onderwerpen/digitale-toegankelijkheid>
- W3C. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*. <https://www.w3.org/TR/WCAG22/>

