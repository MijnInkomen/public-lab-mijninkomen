# Heuristische evaluatie – niveau 1

Door Isabella Jansen. Dit is een levend document: ik vul het aan tijdens sprint 3 en 4. In de geschiedenis van GitLab is te zien wanneer ik wat heb gevonden en opgelost.

Hier houd ik bij welke problemen er in het prototype van niveau 1 zitten, hoe ernstig ze zijn en wat ermee gebeurt. De aanpak komt uit mijn UX-onderzoek (`ux-onderzoek-nielsen.md`): ik beoordeel met de tien heuristieken van Nielsen, toets aan de WCAG en los op met NLDS.

## Zo heb ik het aangepakt

1. Ik loop het prototype pagina voor pagina langs, in de volgorde van het menu.
2. Per pagina kijk ik naar gebruiksvriendelijkheid, toegankelijkheid en visuele consistentie, op een groot scherm en op een telefoon.
3. Elk probleem krijgt een nummer (E-01, E-02, enzovoort), de heuristiek die het raakt en een ernstscore.
4. Ook teamgenoten en stakeholders mogen pagina's beoordelen. Hun naam komt bij "Beoordeeld door".
5. Is een probleem opgelost? Dan zet ik de status op Opgelost.

**Status:** Open · Bezig · Opgelost · Niet oplossen (met reden)

## Ernstschaal (Nielsen, 1994)

| Score | Betekenis |
| --- | --- |
| 0 | Geen probleem |
| 1 | Alleen cosmetisch: oplossen als er tijd over is |
| 2 | Klein probleem: lage prioriteit |
| 3 | Groot probleem: belangrijk om op te lossen |
| 4 | Ernstig probleem: moet opgelost worden voor de oplevering |

Problemen met score 3 en 4 los ik als eerste op.

---

## Op elke pagina (kop, kruimelpad en voet)

De kop, het kruimelpad en de voet staan op elke pagina. Een probleem daarin zie je dus overal terug. Daarom staan deze problemen apart, voor de pagina's zelf.

Beoordeeld door: Isabella

| Nr | Heuristiek | Probleem | Ernst | Status |
| --- | --- | --- | --- | --- |
| E-01 | 1 Systeemstatus, 3 Controle | Er was geen kruimelpad. Bezoekers zagen niet waar een pagina in de site zit en konden niet snel een niveau terug. | 2 | Opgelost |
| E-03 | 7 Flexibiliteit, 8 Minimalistisch | Op een telefoon nemen het logo, de knop Inloggen en het menu bijna de helft van het scherm in. De inhoud begint pas onderaan. | 2 | Open |
| E-04 | 8 Minimalistisch | Inloggen is de grootste en opvallendste knop in de kop, terwijl de meeste bezoekers van niveau 1 nog geen lid zijn. | 2 | Open |
| E-05 | 8 Minimalistisch | De naam van het onderdeel staat nu twee keer boven elkaar: in het kruimelpad en in het kopje boven de titel. Let op: het kopje is een bewuste keuze, voor een vaste opbouw voor schermlezers. | 1 | Open |
| E-06 | 1 Systeemstatus | "Volg ons op LinkedIn" gaat naar een andere website, maar dat zie je niet aan de link. | 1 | Open |

## Home

Beoordeeld door: Isabella

| Nr | Heuristiek | Probleem | Ernst | Status |
| --- | --- | --- | --- | --- |
| E-07 | 4 Consistentie | Hetzelfde icoon betekent op verschillende plekken iets anders. Het staafdiagram staat bij "Lagere kosten" en op Hoe werken we samen? bij "Programmateam". De lamp staat bij "Dezelfde goede ervaring" en bij "Werkgroepen". | 1 | Open |

## Ontwikkelingen – Wat MijnInkomen al kan

Beoordeeld door: Isabella

| Nr | Heuristiek | Probleem | Ernst | Status |
| --- | --- | --- | --- | --- |
| E-08 | 1 Systeemstatus, 8 Minimalistisch | Bij projecten zonder uitleg (bijvoorbeeld IOAW) leidt "Lees meer" naar een bijna lege pagina met "nog geen uitgebreide informatie". De bezoeker klikt voor niets. Dit geldt ook voor Waar we nu aan werken en de projectpagina's. | 2 | Open |

## Ontwikkelingen – Waar we nu aan werken

Beoordeeld door: Isabella

| Nr | Heuristiek | Probleem | Ernst | Status |
| --- | --- | --- | --- | --- |
| E-09 | 8 Esthetisch | "'s-Hertogenbosch" breekt af over twee regels ("'s-" en "Hertogenbosch"). | 1 | Open |

## Ontwikkelingen – Projectpagina

Beoordeeld door: Isabella

Geen problemen gevonden.

## Meer weten – Hoe werken we samen?

Beoordeeld door: Isabella

Geen problemen gevonden.

## Meer weten – Webinar

Beoordeeld door: Isabella

Geen problemen gevonden.

## Meer weten – Kennismakingsgesprek

Beoordeeld door: Isabella

| Nr | Heuristiek | Probleem | Ernst | Status |
| --- | --- | --- | --- | --- |
| E-02 | 4 Consistentie, 5 Fouten voorkomen | Bij Functie moest je zelf typen, terwijl je bij Toegang aanvragen uit een lijst kiest. | 1 | Opgelost |

## Meer weten – Communitylid worden

Beoordeeld door: Isabella

| Nr | Heuristiek | Probleem | Ernst | Status |
| --- | --- | --- | --- | --- |
| E-10 | 4 Consistentie | Bij stap 2 staat dat je het gesprek voert met "de stuurgroep". Op de pagina Kennismakingsgesprek staat "de stuurgroep en het programmateam". | 2 | Open |
| E-11 | 4 Consistentie | Drie stappen zijn een actie ("Volg een webinar", "Toegang aanvragen", "Inloggen"), maar stap 2 is alleen een woord ("Kennismakingsgesprek"). | 1 | Open |

## Initiatief melden

Beoordeeld door: Isabella

Geen problemen gevonden.

## Contact

Beoordeeld door: Isabella

Geen problemen gevonden.

## Inloggen

Beoordeeld door: Isabella

| Nr | Heuristiek | Probleem | Ernst | Status |
| --- | --- | --- | --- | --- |
| E-12 | 1 Systeemstatus, 4 Consistentie | In de kop zie je niet dat je op de pagina Inloggen bent. Bij de andere pagina's zie je dat wel in het menu. De knop Inloggen staat hier ook twee keer: in de kop en onder het formulier. | 1 | Open |

## Toegang aanvragen

Beoordeeld door: Isabella

| Nr | Heuristiek | Probleem | Ernst | Status |
| --- | --- | --- | --- | --- |
| E-13 | 5 Fouten voorkomen | De datum van het kennismakingsgesprek typ je zelf. Iedereen schrijft een datum anders, en een tikfout wordt niet opgemerkt. | 1 | Open |
| E-14 | 4 Consistentie | Het formulier heeft geen eigen kopje. De formulieren op Kennismakingsgesprek ("Kennismakingsgesprek aanvragen") en Initiatief melden ("Meld je initiatief") hebben dat wel. | 1 | Open |

## Privacyverklaring

Beoordeeld door: Isabella

| Nr | Heuristiek | Probleem | Ernst | Status |
| --- | --- | --- | --- | --- |
| E-15 | 4 Consistentie | Dit is de enige pagina zonder klein kopje boven de titel. | 1 | Open |

---

## Bron

Nielsen, J. (1994). *Severity ratings for usability problems*. Nielsen Norman Group. <https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/>
