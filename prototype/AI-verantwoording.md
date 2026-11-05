# AI-verantwoording prototype MijnInkomen

**Gebruikte tools:**
- Claude (Anthropic), een AI-taalmodel: voor het bouwen van de code en het controleren op toegankelijkheid.
- ChatGPT (OpenAI): voor de illustratie bovenaan de homepage (zie Homepage).

**Rolverdeling:** Isabella is de ontwerper en bepaalt de indeling, kleuren, logica en keuzes.
Claude bouwt de code op basis van haar aanwijzingen en controleert die op toegankelijkheid.
Isabella controleert de uitkomst en beslist wat er blijft.

---

## Kleurenpalet

**Gevraagd:** Isabella wilde weten of haar kleuren (groen, rood, geel en gebroken wit, geïnspireerd op de deelnemende gemeenten) voldoen aan de WCAG.

**Wat Claude deed:** het contrast van elke kleur berekend, en een Excel-bestand met de contrastcheck gemaakt. Claude gaf aan dat geel te weinig contrast heeft voor tekst, dat rood in websites vaak "fout" betekent, en dat rood en groen lastig te onderscheiden zijn voor kleurenblinde mensen. Toen Isabella later koos voor wit in plaats van gebroken wit, heeft Claude de achtergrond in de code en de documentatie aangepast en het contrast opnieuw berekend.

**Wat Isabella deed:** groen gekozen als primaire kleur, met haar eigen argumenten (blauw wordt al veel gebruikt door de overheid en financiële instanties, en groen past bij samenwerking, hulp en groei). Ze besloot rood alleen als accent te gebruiken en geel alleen als decoratie. Later koos ze voor een witte achtergrond in plaats van gebroken wit.

## Techniek

**Gevraagd:** Isabella wilde dat haar groepsgenoten het prototype makkelijk kunnen overnemen.

**Wat Claude deed:** React met TypeScript voorgesteld, omdat het team daar ook mee bouwt (Docusaurus). De code is opgebouwd zoals NL Design System: tokens, componenten en pagina's. Er staat uitleg in de code en in de README.

**Wat Isabella deed:** gekozen voor de techniek die voor het team het makkelijkst over te nemen is.

## Homepage (niveau 1)

**Gevraagd:** een informatieve homepage op basis van Isabella's ontwerp. Eerst op basis van haar eerste schets (kop, streepje en introductie), daarna volgens haar uitgewerkte ontwerp met de secties "Samen sterker", "Samen bouwen aan de toekomst" en "Voor alle gemeenten".

**Wat Claude deed:** de homepage gebouwd volgens het ontwerp, met de teksten uit het ontwerp. De illustraties (stad en wegwijzer) en de iconen zijn zelf als SVG getekend in de huisstijlkleuren. Eerst stonden er naambordjes in plaats van de logo's van de gemeenten. Later leverde Isabella de officiële logo's aan van de huisstijlsites van Amsterdam, Den Haag en Utrecht; Claude sneed die bij en zette ze in het blok, elk met de naam van de gemeente als tekstalternatief. Claude controleerde het contrast van alle kleurcombinaties, de volgorde van de koppen, de bediening met het toetsenbord en de weergave op een telefoon. Daarbij bleek het lange woord "inkomensondersteuning" op een telefoon buiten het scherm te vallen; dat is opgelost met een afbreekpunt.

**Wat Isabella deed:** het ontwerp gemaakt, het hoofdmenu teruggebracht naar drie onderdelen (Over MijnInkomen, Samenwerken en Contact), gekozen om het streepje in drie kleuren te behouden, het groene oproepblok ("Ook samenwerken aan MijnInkomen?") weggehaald, de officiële logo's van de gemeenten opgezocht en aangeleverd, en de stadsillustratie bovenaan vervangen door een eigen illustratie.

**Illustratie homepage (ChatGPT):** Isabella vroeg ChatGPT om een illustratie met drie tot vijf gemeenten in een cirkel, die allemaal naar het logo van MijnInkomen leiden. Ze koos deze illustratie omdat hij laat zien wat MijnInkomen is: gemeenten die via één platform verbonden zijn. Omdat de lichtgroene wolkjes achter de gemeentehuizen amper zichtbaar waren, maakte ze die zelf wit. Ze liet Claude controleren of het ontwerp aan de WCAG voldoet; daaruit bleek dat het kleine kopje in haar ontwerp te lichtgroen was (contrast 3,4), dus op de site staat het in het donkerdere huisstijlgroen. Claude haalde de losse vlekjes weg die na het verwijderen van de achtergrond waren achtergebleven, en zette de illustratie op de pagina (OpenAI, 2026). *(nog aanvullen: wat je verder hebt gecontroleerd, aangepast of afgekeurd)*

## Logo

**Gevraagd:** een logo op basis van een idee van de opdrachtgevers, dat Isabella had onthouden: in de M van MijnInkomen houden twee personen elkaar vast. Isabella wilde de puntjes op de i en de j weglaten, omdat je anders vier rondjes krijgt en dat te druk is.

**Wat Claude deed:** eerst een eigen versie van het logo nagetekend als SVG. Isabella vond haar eigen ontwerp beter, dus Claude heeft haar ontwerp gebruikt: de achtergrond doorzichtig gemaakt, bijgesneden, een icoonversie met alleen de M gemaakt (voor het browsertabblad) en het logo in de kop van de site gezet met een tekstalternatief voor schermlezers.

**Wat Isabella deed:** het idee van de opdrachtgevers onthouden en uitgewerkt, de puntjes weggelaten, en twee voorbeelden gemaakt waarop het logo is gebaseerd. In het tweede voorbeeld koos ze voor een hoofdletter I in "Inkomen" en een M met ronde schouders. Ze koos ervoor om haar eigen ontwerp te gebruiken in plaats van de nagetekende versie.

## Pagina Over MijnInkomen (niveau 1)

**Gevraagd:** een pagina "Over MijnInkomen" volgens Isabella's ontwerp: een introductie met de twee personen uit het logo, en drie genummerde hoofdstukken (Wie we zijn, Hoe het is begonnen, Onze drijfveer). In het menu moest ook "Home" komen.

**Wat Claude deed:** de pagina gebouwd met de teksten uit het ontwerp, en de illustraties (personen, pad met vlag, plantje) zelf als SVG getekend in de huisstijlkleuren. Om tussen pagina's te kunnen wisselen, maakte Claude een eenvoudige navigatie: elke pagina heeft een eigen adres en titel, het menu laat zien op welke pagina je bent, en na het wisselen begint een schermlezer bovenaan de nieuwe pagina. Claude testte het wisselen heen en terug (ook met de terugknop van de browser), de koppen, en de weergave op een telefoon.

**Wat Isabella deed:** het ontwerp en de teksten van de pagina gemaakt, en het menu aangepast naar Home, Over MijnInkomen, Samenwerken en Contact. *(nog aanvullen: wat je hebt gecontroleerd of aangepast)*

## Officiële NL Design System-componenten

**Gevraagd:** Isabella vroeg of de website nog voldoet aan de WCAG en NL Design System. Claude gaf aan dat de opbouw NLDS volgt, maar dat de componenten zelf gebouwd waren. Isabella koos ervoor om over te stappen op de officiële NLDS-componenten, omdat de opdrachtgever dat als eis heeft.

**Wat Claude deed:** uitgezocht welke officiële componenten er zijn (de Candidate-componenten Button, Heading, Paragraph, Link en Skip Link). Omdat Claude ze niet zelf kon downloaden, installeerde Isabella ze op haar laptop; Claude las daarna de geïnstalleerde bestanden om precies te zien hoe ze werken. Vervolgens zijn de eigen componenten vervangen door de officiële, en zijn de huisstijlkleuren gekoppeld aan de officiële NLDS-tokens (`--nl-...`). Voor onderdelen zonder officiële component (kop, voettekst, logo) zijn eigen componenten gebleven. Claude testte daarna opnieuw contrast, toetsenbord, smalle schermen en het wisselen tussen pagina's.

**Wat Isabella deed:** gekozen voor de officiële componenten, ze geïnstalleerd, en de oude, niet meer gebruikte componenten verwijderd.

## Pagina Samenwerken (niveau 1)

**Gevraagd:** een pagina "Samenwerken" volgens Isabella's ontwerp: een introductie met de twee personen uit het logo, drie redenen om samen te werken, een blok "Voor alle gemeenten" en een oproep om aan te sluiten.

**Wat Claude deed:** de pagina gebouwd met de officiële NLDS-componenten en de teksten uit het ontwerp, en de illustratie van het gemeentehuis zelf als SVG getekend. Het kopje "Waarom samenwerken" is een echte kop gemaakt, zodat schermlezers het blok kunnen vinden. Het menu en de knoppen op de homepage verwijzen nu naar deze pagina. Bij het testen vond Claude een fout uit de vorige stap (het menu-item van de huidige pagina werd blauw in plaats van groen, door een verwijderde token) en heeft die hersteld.

**Wat Isabella deed:** het ontwerp en de teksten van de pagina gemaakt. *(nog aanvullen: wat je hebt gecontroleerd of aangepast)*

## Pagina Contact (niveau 1)

**Gevraagd:** een contactpagina volgens Isabella's opzet: een contactformulier, contactgegevens, een blok over veelgestelde vragen en een verwijzing naar Samenwerken. De precieze inhoud wordt nog afgestemd met de opdrachtgever.

**Wat Claude deed:** de pagina gebouwd met de officiële NLDS-componenten waar die er zijn (koppen, tekst, knoppen). Het formulier is een eigen component, omdat er in dit project geen officiële NLDS-formuliervelden zijn: elk veld heeft een label, verplichte velden staan erbij, foutmeldingen staan in tekst met een icoon, en de focus gaat naar het eerste foute veld. Het formulier verstuurt niets, omdat het een prototype is. De contactgegevens zijn duidelijk als voorbeeldgegevens gemarkeerd. Omdat er nog geen pagina met veelgestelde vragen is, staat daar een tekst in plaats van een knop die nergens naartoe gaat. Het menu-item Contact en de knop "Vul het formulier in" op Samenwerken gaan nu naar deze pagina. Claude testte het formulier (leeg versturen, een fout e-mailadres en goed versturen), de koppen, het contrast en de weergave op een smal scherm, en loste daarbij twee fouten op.

**Wat Isabella deed:** de opzet van de pagina gemaakt. *(nog aanvullen: wat je hebt gecontroleerd of aangepast)*

**Controle op NL Design System:** Isabella vroeg of het prototype volledig voldoet aan NL Design System. Claude legde het naast de officiële NLDS-richtlijnen en vond twee afwijkingen in het formulier, waarvan één een eigen fout van Claude was: Claude had "(verplicht)" bij elk veld gezet, terwijl NLDS adviseert om alleen de uitzonderingen te markeren met "(niet verplicht)" en vooraf te vermelden dat alle velden verplicht zijn. Daarnaast ontbrak de samenvatting van fouten bovenaan het formulier. Beide zijn aangepast en getest.

## Versie 2 van niveau 1

**Gevraagd:** na feedback van de opdrachtgever maakte Isabella een nieuwe opzet voor de website: het document "Paginastructuur website MijnInkomen – niveau 1". Daarin beschrijft ze per pagina welke blokken erop komen, wat erin staat en waarom, onderbouwd met interviews en documenten van de opdrachtgever. Het menu werd Home, Ontwikkelingen, Aansluiten en Contact, met als uitgangspunt: informeren, niet werven. Ze gaf deze opzet aan Claude om de pagina's te bouwen. Claude stelde eerst een paar vragen; Isabella koos ervoor om de huidige stijl te houden, ontbrekende inhoud aan te vullen met duidelijk gemarkeerde voorbeeldtekst, en een klein aanmeldformulier voor het webinar te maken.

**Wat Claude deed:** de pagina's gebouwd volgens de blokken in Isabella's document. Op de homepage is de knop in de introductie weggehaald, omdat de site niet wil werven. Nieuw zijn de pagina's Ontwikkelingen (regelingen, waar nu aan gewerkt wordt met een status, plannen en updates) en Aansluiten (wat het oplevert en vraagt, spelregels, drie genummerde stappen, het webinar en het aanmeldformulier). Het aanmeldformulier kan alleen verstuurd worden met de datum van een webinar dat al geweest is, zodat de volgorde webinar → formulier echt vastligt. Er kwam één algemeen formuliercomponent voor alle formulieren, een labeltje "Voorbeeld" voor voorbeeldinhoud, en een korte voorbeeld-privacyverklaring omdat de formulieren om persoonsgegevens vragen. Claude testte het contrast, de koppen, het toetsenbord, smalle schermen (320 px) en de formulieren (leeg versturen en goed versturen).

**Wat Isabella deed:** de nieuwe paginastructuur bedacht en onderbouwd met de interviews, de keuzes gemaakt over stijl, voorbeeldtekst en het webinarformulier, en het logo van 's-Hertogenbosch aangeleverd, dat Claude heeft bijgesneden en op de homepage gezet. Bij het testen merkte ze dat de pagina na het klikken in het menu een stukje naar beneden schoof, wat ze storend vond. Claude heeft dat opgelost: de pagina begint nu bovenaan, en schermlezers beginnen nog steeds bij de inhoud. *(nog aanvullen: wat je hebt gecontroleerd of aangepast)*

---

## Inlogpagina

**Gevraagd:** een inlogpagina waarop duidelijk is dat inloggen alleen voor communityleden is, en die je doorstuurt naar Aansluiten als je nog geen lid bent.

**Wat Claude deed:** de pagina gebouwd met bovenaan "Alleen voor communityleden" en een uitleg wie dat zijn. Naast het inlogformulier staat een blok "Nog geen communitylid?" met een link naar Aansluiten, en een link naar Contact voor andere vragen. De knop Inloggen in de kop is nu een link naar deze pagina, met de opmaak van de NLDS-knop. Inloggen werkt nog niet: na het invullen staat er dat dit een prototype is. Claude testte contrast, koppen, smalle schermen, het formulier en de link naar Aansluiten.

**Wat Isabella deed:** bedacht wat de pagina moet doen. Daarna besloot ze dat het slotje op de knop Inloggen weg mocht, en dat er een blauw stukje in het streepje komt, omdat 's-Hertogenbosch geel en blauw als kleuren heeft. Claude haalde de blauwe kleur uit het logo van 's-Hertogenbosch. Daarna wilde Isabella een tweede kleur naast het groen voor kleine details. Claude raadde het blauw uit het streepje aan en voegde geel en blauw als accentjes toe in de tekeningen en bij de iconen en stappen. Isabella vond dat niet mooi en koos ervoor om alles weer groen te maken, zoals het was. *(nog aanvullen: wat je hebt gecontroleerd of aangepast)*

## Onderbouwing navigatie

**Gevraagd:** Isabella wilde in de onderbouwing uitleggen waarom ze voor niveau 1 een horizontale navigatiebalk koos, en waarom ze voor niveau 2 waarschijnlijk een verticale navigatie wil.

**Wat Claude deed:** een betrouwbare bron gezocht (een artikel van de Nielsen Norman Group over verticale navigatie) en op basis van Isabella's keuzes een kort stuk in haar stijl geschreven, met de bron in APA.

**Wat Isabella deed:** de keuze gemaakt voor horizontaal op niveau 1 en verticaal op niveau 2. *(nog aanvullen: wat je hebt gecontroleerd of aangepast)*

## Versie 2.1: feedback van de opdrachtgever

**Gevraagd:** Isabella verzamelde feedback van de opdrachtgever (Vincent) op versie 2 en gaf die aan Claude. Claude zette de punten op een rij en maakte een voorstel voor een nieuwe sitemap. Isabella koos ervoor om "Initiatief melden" als aparte pagina in het hoofdmenu te zetten, omdat het een actie is en geen informatie. Voor de andere punten nam ze het voorstel over.

**Wat Claude deed:** "Aansluiten" vervangen door "Meer weten" met vier pagina's (Hoe werken we samen?, Webinar, Kennismakingsgesprek, Communitylid worden). Ontwikkelingen opgesplitst in vier pagina's met elk één functie, zodat er geen informatie dubbel staat. Een zijmenu gemaakt voor deze twee onderdelen, "Lees meer" bij de projecttegels, en één sjabloon voor detailpagina's (Stadspas en Basisproces bijzondere bijstand als voorbeeld uitgewerkt). Nieuwe pagina's Initiatief melden en Toegang aanvragen gemaakt, de homepage ingekort tot een overzicht met knoppen, en op de inlogpagina tweestapsverificatie en een knop "Toegang aanvragen" toegevoegd. Daarnaast twee documenten voor het team: `sitemap.md` (doel per pagina) en `componenten.md` (doel, bron van de informatie en gedrag per onderdeel; de bron is een voorstel dat nog met development moet worden afgestemd). Claude testte alle 16 pagina's op contrast, koppen, telefoonscherm en de formulieren. Daarna vroeg Isabella het verschil tussen "Wat MijnInkomen al kan" en "Updates", en of Updates weg kon. Claude legde het verschil uit en gaf als advies om Updates weg te halen (lastig te onderhouden en dubbel), maar wel te laten zien dat er iets gebeurt. Isabella besloot Updates weg te halen; Claude verving het op de homepage door "Recent bijgewerkt", dat vanzelf uit de projecten komt. Later vond Isabella ook "Wat eraan komt" overbodig, omdat de site feiten moet geven en geen plannen die nog kunnen veranderen. Claude had voorgesteld om het samen te voegen met "Waar we nu aan werken", maar Isabella koos ervoor om het helemaal weg te halen. Ook vond Isabella de rol "Sluit aan" bij de gemeenten vaag en wilde ze "Communitylid". Claude wees erop dat alle gemeenten communitylid zijn, en zette daarom in de uitleg dat Den Haag en Utrecht daarnaast ook meebouwen en meebetalen ("Bouwt en betaalt mee"). Op verzoek van Isabella beschreef Claude in de onderbouwing per feedbackpunt van de opdrachtgever wat er is veranderd, in haar stijl.

**Wat Isabella deed:** de feedback verzameld, de keuze gemaakt over Initiatief melden, het voorstel beoordeeld en besloten om Updates en Wat eraan komt weg te halen. *(nog aanvullen: wat je hebt gecontroleerd of aangepast)*

## Niveau 2: de communityomgeving

**Gevraagd:** Isabella gaf Claude haar document "Website MijnInkomen – niveau 2" met vijf pagina's (Home, Vergaderingen, Stand van zaken steden, Roadmap & backlog, Initiatieven & innovaties) en de blokken per pagina. Haar idee: de knop Inloggen werkt zonder gegevens en brengt je naar niveau 2.

**Wat Claude deed:** eerst drie vragen gesteld, omdat het document twee verschillende menu's noemde. Daarna niveau 2 gebouwd: een eigen kop met wie er is ingelogd en Uitloggen, een verticaal zijmenu, en de vijf pagina's met de blokken uit het document. Het besluitenlogboek is doorzoekbaar en te filteren op status en gemeente. De actielijst en de roadmap zijn te filteren. Tabellen hebben echte koppen voor schermlezers en scrollen op een telefoon opzij. Alle gegevens zijn verzonnen voorbeelden in één bestand (`content/community.ts`). Claude testte alle pagina's op contrast, koppen, telefoonscherm, de filters en het in- en uitloggen, en legde in `sitemap.md` en `componenten.md` vast wat elk onderdeel doet en waar de informatie straks vandaan kan komen.

**Wat Isabella deed:** het document voor niveau 2 gemaakt en drie keuzes gemaakt: het menu met de vijf pagina's, een verticaal zijmenu en verzonnen voorbeeldnamen in plaats van echte personen. Daarna vond ze dat het zijmenu het beeld te veel belemmerde. Claude gaf drie oplossingen (menu tegen de linkerkant, horizontaal menu, inklapbaar menu); Isabella koos voor het menu helemaal tegen de linkerkant, met behoud van NLDS. *(nog aanvullen: wat je hebt gecontroleerd of aangepast)*

## Kritische controle op dubbele informatie

**Gevraagd:** Isabella vroeg Claude om kritisch te kijken of er dingen dubbel staan, of beter en toegankelijker kunnen.

**Wat Claude deed:** alle pagina's tekst voor tekst nagelezen en elf punten voorgelegd: dubbele informatie, dingen die duidelijker kunnen en toegankelijkheid. Daarna de punten aangepast die Isabella koos.

**Wat Isabella deed:** per punt beslist. Ze koos ervoor om de naam van het onderdeel juist boven de paginatitel te houden en uit het zijmenu te halen, zodat elke pagina dezelfde vaste opbouw heeft voor mensen met een schermlezer (Claude had het andersom voorgesteld). "Wat het oplevert" haalde ze weg bij Communitylid worden, omdat het al op de homepage staat. De extra kop in het inlogformulier ging weg, en bij Toegang aanvragen werd Functie een keuzelijst met "Niet van toepassing". Een paar voorstellen wees ze af: de uitleg over de community, het gele blok op Toegang aanvragen en de kaarten op Initiatief melden bleven zoals ze waren.

## Controle op WCAG en taalniveau B1 (versie 2.1)

**Gevraagd:** Isabella vroeg of versie 2.1 nog toegankelijk is volgens de WCAG en of de teksten op B1-niveau zijn.

**Wat Claude deed:** alle pagina's opnieuw getest op contrast, koppen, telefoonscherm en bediening met het toetsenbord (ook het zijmenu); daar kwamen geen fouten uit. Daarna alle teksten nagelezen op lange zinnen en moeilijke woorden, en die eenvoudiger gemaakt. Bijvoorbeeld "vertegenwoordigers" werd "mensen van de deelnemende gemeenten", "noodzakelijke kosten" werd "kosten die je echt moet maken", "persoonsgegevens" werd "gegevens over jou, zoals je naam en e-mailadres", lange zinnen zijn in tweeën gesplitst en afkortingen zoals IOAW zijn uitgelegd. Woorden die de opdrachtgever zelf gebruikt (community, webinar, stuurgroep) zijn gebleven, maar worden op de site uitgelegd. Claude gaf aan dat B1 geen WCAG-AA-eis is, maar wel de richtlijn voor overheidsteksten, en dat een echte check met de doelgroep beter is dan alleen een controle door AI.

**Wat Isabella deed:** gevraagd om de controle. *(nog aanvullen: wat je zelf hebt gecontroleerd)*

## Controle op WCAG en NL Design System (versie 2)

**Gevraagd:** Isabella vroeg of versie 2 voldoet aan de WCAG en NL Design System.

**Wat Claude deed:** alle zes pagina's getest op een breed scherm en op een telefoonscherm van 320 px: contrast, tekstalternatieven, koppen, landmarks, toetsenbord, focus, dubbele id's en of er iets buiten het scherm valt. Daarbij werden geen fouten gevonden. Daarna legde Claude de formulieren naast de NLDS-richtlijnen en vond één verbeterpunt: de voorbeelden in de e-mailvelden stonden als grijze tekst in het veld (placeholder). NLDS raadt aan om zo'n voorbeeld als uitleg tussen het label en het veld te zetten, gekoppeld aan het veld, zodat schermlezers het voorlezen. Dat is aangepast. Claude gaf ook aan dat een automatische test niet alles vindt, en dat het team bij de echte bouw nog moet testen met een schermlezer.

**Wat Isabella deed:** gevraagd om de controle. *(nog aanvullen: wat je zelf hebt gecontroleerd)*

---

## Bronvermelding

Anthropic. (2026). *Claude* [Groot taalmodel]. https://claude.ai

OpenAI. (2026). *ChatGPT* [Groot taalmodel]. https://chat.openai.com
