# Onderbouwing prototype MijnInkomen

Hier leg ik per stap uit welke ontwerpkeuzes ik heb gemaakt en waarom.

---

## 1. Kleurenpalet

Een van de eerste stappen in mijn proces is het kleurenpalet. Daarbij moet je natuurlijk rekening houden met de WCAG en met de wensen van je opdrachtgever.

De opdrachtgever wilde graag de kleuren van de gemeenten die nu meedoen terugzien (Amsterdam, Utrecht en Den Haag). Daar ben ik mee aan de slag gegaan, en uiteindelijk heb ik gekozen voor **groen als primaire kleur**. Blauw wordt al voor veel financiële zaken gebruikt, zoals door de Belastingdienst en andere overheidsorganisaties. Deze website staat voor samenwerking, hulp en groei, en daar past groen beter bij. Groen is in veel talen en culturen verbonden met groei, en onderzoekers zien het als een signaal van "jezelf ontwikkelen" (Lichtenfeld e.a., 2012). Er zijn ook aanwijzingen dat groen creatief denken ondersteunt, maar het ging om kleine experimenten, en de onderzoekers zeggen zelf dat simpele, brede uitspraken over kleur niet terecht zijn (Lichtenfeld e.a., 2012). Dat is voor mij dus een extra argument, niet het hoofdargument.

| Kleur | Hex | Gebruik |
|---|---|---|
| Groen | `#216B50` | Primaire kleur: tekst, koppen en knoppen |
| Rood | `#A52A35` | Alleen als accent, niet voor knoppen, omdat rood vaak gezien wordt als signaal van gevaar of falen (Lichtenfeld e.a., 2012) |
| Geel | `#E8B547` | Alleen decoratie, nooit als tekst |
| Wit | `#FFFFFF` | Achtergrond, en tekst op groene knoppen |
| Blauw | `#003976` | Alleen in het streepje, uit het logo van 's-Hertogenbosch |

Het streepje in groen, rood en geel onder de kop staat voor de samenwerking tussen de gemeenten. Toen 's-Hertogenbosch erbij kwam, heb ik er een blauw stukje aan toegevoegd, want hun kleuren zijn geel en blauw. Blauw gebruik ik verder nergens, zodat groen de hoofdkleur blijft.

Eerst had ik gebroken wit (`#FAF9F6`) als achtergrond, maar uiteindelijk heb ik gekozen voor gewoon wit.

**WCAG-check:** groen haalt een contrast van 6,4 op de witte achtergrond, en ook 6,4 met witte tekst op een groene knop. Rood haalt 7,0. Dat is ruim boven de eis van 4,5 (W3C, 2023). Geel haalt maar 1,9, dus dat gebruik ik alleen als versiering. Rood en groen gebruik ik nooit als enige verschil, omdat ze voor kleurenblinde mensen bijna op elkaar lijken.

## 2. Logo

Het idee voor het logo komt van onze opdrachtgevers. Zij noemden in een gesprek dat je in de M van MijnInkomen twee poppetjes kunt maken die elkaar vasthouden. Dat idee had ik onthouden, en ik vond het zelf erg leuk, omdat het precies laat zien waar MijnInkomen om draait: samenwerken. Daarom heb ik het uitgewerkt tot een logo. Ik heb wel de puntjes op de i en de j weggehaald, want anders krijg je vier rondjes en dat vond ik te druk. Nu vallen alleen de twee hoofdjes op. Inkomen schrijf ik met een hoofdletter I, net als in de naam MijnInkomen.

Er is ook een versie met alleen de M, voor kleine plekken zoals het tabblad in de browser.

**WCAG-check:** voor logo's geldt geen contrasteis (W3C, 2023, succescriterium 1.4.3). Toch is de tekst van het logo goed leesbaar (contrast 10,3 op wit). Het logo heeft een tekstalternatief ("MijnInkomen"), zodat schermlezers het kunnen voorlezen.

## 3. Logo's van de gemeenten

Op de homepage laat ik de logo's zien van de gemeenten die meedoen: Den Haag, Utrecht, Amsterdam en 's-Hertogenbosch. Zo zie je meteen wie er achter MijnInkomen zitten. De logo's heb ik van de officiële huisstijlsites van de gemeenten gehaald. Voor het prototype is dat prima, maar voordat de site echt online gaat, is toestemming van de gemeenten nodig.

## 4. Paginastructuur versie 2

Na de feedback van de opdrachtgever heb ik de opbouw van de site opnieuw bekeken. De opdrachtgever wil vooral laten zien wie ze zijn en wat ze doen, dus de site moet informeren en niet werven. Daarom heb ik de knoppen die mensen overhalen weggehaald en zijn de teksten beschrijvend.

Het menu is nu Home, Ontwikkelingen, Aansluiten en Contact. Die volgorde volgt de vragen die een bezoeker na elkaar heeft: wat is het, waar werken ze aan, hoe kan mijn gemeente meedoen, en bij wie kan ik terecht. Uit de interviews kwam dat kleine gemeenten weinig tijd hebben en dat IT-woorden afschrikken (Gert), dat je nergens kon zien wat de status is (Carl en Selmar), en dat gemeenten eerlijke spelregels willen (Carl). Daarom zijn de blokken kort, staat er bij de ontwikkelingen een status in gewone woorden, en staat op Aansluiten ook wat het van een gemeente vraagt, niet alleen wat het oplevert.

Het formulier om aan te sluiten is pas voor wie al een webinar heeft gevolgd. Daarom moet je de datum van je webinar kiezen, anders kun je het niet versturen. Waar we de echte informatie nog niet hebben, staat voorbeeldtekst met een labeltje "Voorbeeld", zodat niemand denkt dat het al klopt. Wat echt online komt, moet eerst door de opdrachtgever goedgekeurd worden.

## 5. Navigatie

Voor niveau 1 heb ik gekozen voor een horizontale navigatiebalk bovenaan de pagina. Niveau 1 heeft maar vier pagina's (Home, Ontwikkelingen, Aansluiten en Contact), dus die passen makkelijk naast elkaar en een bezoeker ziet ze allemaal in één oogopslag. De volgorde volgt de vragen die een bezoeker na elkaar heeft. Een horizontale balk neemt ook weinig ruimte in, waardoor de inhoud zelf de meeste aandacht krijgt (Laubheimer, 2021). Inloggen staat apart rechts in de balk, zodat een nieuwe bezoeker niet denkt dat hij moet inloggen.

Voor niveau 2 denk ik aan een verticale navigatie aan de zijkant. Communityleden krijgen meer onderdelen, zoals de volledige roadmap, en dat worden er waarschijnlijk steeds meer. Een verticaal menu past goed bij een site die veel onderdelen heeft of nog groeit: je kunt er makkelijk iets aan toevoegen en de lijst is makkelijk te scannen (Laubheimer, 2021). Het nadeel is dat een menu aan de zijkant meer ruimte kost (Laubheimer, 2021). Voor communityleden die vaker terugkomen en snel naar het juiste onderdeel willen, vind ik dat het waard. Dit is nog een plan: de keuze maak ik definitief als we aan niveau 2 beginnen.

## 6. Feedback opdrachtgever (versie 2.1)

Op 29 oktober 2026 kreeg ik feedback van de opdrachtgever (Vincent) op versie 2. Hij was positief over de vormgeving en de structuur, maar vond dat de site nog te veel aanstuurde op aansluiten. Zijn belangrijkste punt: de site moet vooral **informeren en nieuwsgierig maken**, en bij elk onderdeel moet duidelijk zijn waarom het er staat, waar de informatie vandaan komt en hoe het werkt. Hieronder staat per feedbackpunt wat ik heb veranderd.

**Homepage.** Vincent wil dat de homepage een overzicht is dat nieuwsgierig maakt en doorstuurt naar meer informatie. Ik heb de homepage ingekort en er twee knoppen in gezet: "Bekijk de ontwikkelingen" en "Meer weten". Onder de logo's van de gemeenten staat nu een korte tekst met een link naar meer uitleg. De rollen van de gemeenten staan niet meer op de homepage, maar op een eigen pagina.

**Van "Aansluiten" naar "Meer weten".** De site moet voorlopig meer informeren dan werven. Daarom heet het menu-item nu "Meer weten", en zijn de teksten minder gericht op actie. Onder Meer weten staan: hoe we samenwerken, het webinar, het kennismakingsgesprek en hoe je communitylid wordt.

**Zijmenu.** Vincent gaf aan dat een verticaal menu aan de linkerkant overzichtelijker is bij pagina's met veel informatie, en dat het op alle pagina's van een onderdeel hetzelfde moet zijn. Ontwikkelingen en Meer weten hebben nu zo'n zijmenu. Dat past bij wat ik eerder al voor niveau 2 had bedacht: een verticaal menu is makkelijk uit te breiden en makkelijk te scannen (Laubheimer, 2021). Op een telefoon staat het menu boven de inhoud. Het hoofdmenu bovenaan blijft horizontaal. De naam van het onderdeel (bijvoorbeeld "Meer weten") staat niet in het zijmenu, maar als klein kopje boven de titel van de pagina. Zo heeft elke pagina dezelfde vaste opbouw, en dat is fijn voor mensen die blind zijn en een schermlezer gebruiken.

**Lees meer bij projecten.** Bezoekers moeten bij een projecttegel meer informatie kunnen bekijken. Elke tegel heeft nu een "Lees meer"-link naar een detailpagina. Alle detailpagina's gebruiken hetzelfde sjabloon. De Stadspas en het basisproces bijzondere bijstand heb ik als voorbeeld helemaal uitgewerkt. Vincent zei dat niet elke pagina al gevuld hoeft te zijn, dus bij de andere staat dat de pagina later wordt aangevuld.

**Geen dubbele informatie: Updates en Wat eraan komt weg.** Vincent zag dat "Updates", "Laatste ontwikkelingen" en "Waar werken we aan" te veel overlapten. Daarom heeft Ontwikkelingen nu nog maar twee pagina's: wat al af is en wat nu loopt. Ook de pagina "Wat eraan komt" heb ik weggehaald. Daar stonden plannen zonder datum, en die kunnen nog veranderen. Ik wil bezoekers feiten geven, geen verwachtingen die misschien niet uitkomen. De volledige planning hoort bij niveau 2, achter de inlog. De pagina Updates heb ik helemaal weggehaald. Updates zijn losse nieuwsberichtjes die iemand steeds moet schrijven. Gebeurt dat een tijd niet, dan staat er een oude datum bovenaan en lijkt het alsof er niks gebeurt. Dat is lastig te onderhouden en werkt juist tegen de nieuwsgierigheid. In plaats daarvan staat op de homepage "Recent bijgewerkt": de drie projecten die het laatst zijn veranderd, met hun status en een link. Dat komt vanzelf uit de projecten, dus niemand hoeft apart nieuws te schrijven, en je ziet toch dat er iets gebeurt.

**Initiatief melden.** Volgens Vincent is een initiatief melden iets anders dan een kennismakingsgesprek, en het is ook voor organisaties die nog geen communitylid zijn. Ik heb het een eigen pagina in het hoofdmenu gegeven, en niet onder Meer weten gezet. Meer weten is voor informatie, maar een initiatief melden is echt een actie. Op de pagina staat ook uitgelegd wat het verschil is met een kennismakingsgesprek.

**Organisatie en community.** Bezoekers moeten snappen hoe MijnInkomen georganiseerd is. Daarvoor is er nu de pagina "Hoe werken we samen?", met de logo's en rollen van de gemeenten, de stuurgroep, het programmateam, de werkgroepen en de community. De rol "Sluit aan" vond ik vaag. Die heet nu "Communitylid", want dat zijn ze gewoon. Er staat ook bij dat alle gemeenten communitylid zijn, en dat Den Haag en Utrecht daarnaast meebouwen en meebetalen. Uitgebreide of vertrouwelijke afspraken horen achter de inlog, dus daar staat alleen een verwijzing naar.

**Communitylid worden en inloggen.** Je wordt niet direct communitylid via de website: eerst volgt er een kennismaking. Op de pagina "Communitylid worden" staat de volgorde in vier stappen: webinar, kennismakingsgesprek, toegang aanvragen en inloggen. Op de inlogpagina staat nu duidelijk dat die alleen voor communityleden is, dat je inlogt met tweestapsverificatie, en er is een knop "Toegang aanvragen" voor wie al een kennismakingsgesprek heeft gehad.

**Overdracht aan development.** Vincent vindt een ontwerp niet genoeg als de werking niet beschreven is. Daarom zijn er nu twee documenten bij de code. In `sitemap.md` staat welk doel elke pagina heeft. In `componenten.md` staat per onderdeel wat het doet, waar de informatie vandaan komt (CMS, GitHub of de website) en hoe het zich gedraagt. Waar de informatie vandaan komt, is nog een voorstel dat we met development moeten afstemmen.

---

## Bronnen

Laubheimer, P. (2021, 16 mei). *Left-side vertical navigation on desktop: Scalable, responsive, and easy to scan*. Nielsen Norman Group. https://www.nngroup.com/articles/vertical-nav/

Lichtenfeld, S., Elliot, A. J., Maier, M. A., & Pekrun, R. (2012). Fertile green: Green facilitates creative performance. *Personality and Social Psychology Bulletin, 38*(6), 784–797. https://doi.org/10.1177/0146167212436611

W3C. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*. https://www.w3.org/TR/WCAG22/
