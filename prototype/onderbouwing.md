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

Het streepje in groen, rood en geel onder de kop staat voor de samenwerking tussen de gemeenten.

Eerst had ik gebroken wit (`#FAF9F6`) als achtergrond, maar uiteindelijk heb ik gekozen voor gewoon wit.

**WCAG-check:** groen haalt een contrast van 6,4 op de witte achtergrond, en ook 6,4 met witte tekst op een groene knop. Rood haalt 7,0. Dat is ruim boven de eis van 4,5 (W3C, 2023). Geel haalt maar 1,9, dus dat gebruik ik alleen als versiering. Rood en groen gebruik ik nooit als enige verschil, omdat ze voor kleurenblinde mensen bijna op elkaar lijken.

## 2. Logo

Het idee voor het logo komt van onze opdrachtgevers. Zij noemden in een gesprek dat je in de M van MijnInkomen twee poppetjes kunt maken die elkaar vasthouden. Dat idee had ik onthouden, en ik vond het zelf erg leuk, omdat het precies laat zien waar MijnInkomen om draait: samenwerken. Daarom heb ik het uitgewerkt tot een logo. Ik heb wel de puntjes op de i en de j weggehaald, want anders krijg je vier rondjes en dat vond ik te druk. Nu vallen alleen de twee hoofdjes op. Inkomen schrijf ik met een hoofdletter I, net als in de naam MijnInkomen.

Er is ook een versie met alleen de M, voor kleine plekken zoals het tabblad in de browser.

**WCAG-check:** voor logo's geldt geen contrasteis (W3C, 2023, succescriterium 1.4.3). Toch is de tekst van het logo goed leesbaar (contrast 10,3 op wit). Het logo heeft een tekstalternatief ("MijnInkomen"), zodat schermlezers het kunnen voorlezen.

## 3. Logo's van de gemeenten

Op de homepage laat ik de logo's zien van de gemeenten die als eerste meedoen: Amsterdam, Den Haag en Utrecht. Zo zie je meteen wie er achter MijnInkomen zitten. De logo's heb ik van de officiële huisstijlsites van de gemeenten gehaald. Voor het prototype is dat prima, maar voordat de site echt online gaat, is toestemming van de gemeenten nodig.

---

## Bronnen

Lichtenfeld, S., Elliot, A. J., Maier, M. A., & Pekrun, R. (2012). Fertile green: Green facilitates creative performance. *Personality and Social Psychology Bulletin, 38*(6), 784–797. https://doi.org/10.1177/0146167212436611

W3C. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*. https://www.w3.org/TR/WCAG22/
