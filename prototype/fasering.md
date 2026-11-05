# Fasering prototype MijnInkomen

Door: Isabella Jansen

Ik heb een klikbaar prototype gemaakt van de MijnInkomen-website. Het begon met onderzoek en een schets op papier, groeide via drie versies van de openbare site (niveau 1) en staat nu aan het begin van de besloten communityomgeving (niveau 2). Hieronder vertel ik per fase wat ik deed en waarom.

## Fase 1 – Onderzoek en een schets op papier

In sprint 1 en het begin van sprint 2 hebben we als team vooral informatie opgehaald. We hielden interviews en stelden veel vragen aan Vincent. Op basis van die requirements maakte ik een simpele schets op papier van wat er op niveau 1 moest komen, en daarna ben ik gewoon begonnen.

Ik ben zelf fan van Figma, maar ik koos ervoor om het prototype in code te laten bouwen met Claude. Zo is het meteen klikbaar, en kan mijn team precies zien welke NL Design System-componenten waar zijn gebruikt. Dat maakt het overnemen veel makkelijker. Ik gaf Claude alle input die nodig was: NL Design System, de WCAG en de eisen van het technische deel van mijn groep. Het ontwerp, de indeling en de keuzes blijven van mij; dat is de menselijke factor. Wat ik deed en wat AI deed, staat in de AI-verantwoording in de code.

Ik vind het erg leuk om op deze manier een prototype te bouwen. Als ik met een duidelijk idee of ontwerp kom, kan Claude dat heel goed uitwerken.

**Bewijs:** interviewverslagen, de schets op papier, notulen van sprint 1 en 2 (deels in GitLab, deels in Teams).

## Fase 2 – Huisstijl en techniek

Voordat ik pagina's maakte, legde ik de basis. Ik koos groen als hoofdkleur: blauw wordt al veel gebruikt door de overheid en financiële instanties, en groen past bij samenwerking en groei. Rood gebruik ik alleen als accent en geel alleen als versiering, en alle kleuren heb ik getest op contrast. Het logo is gebaseerd op een idee van de opdrachtgever: twee poppetjes in de M die elkaar vasthouden.

Omdat NL Design System een eis van de opdrachtgever is, gebruikt het prototype de officiële NLDS-componenten met onze eigen huisstijl. Het is gebouwd in React met TypeScript, dezelfde techniek als mijn team, zodat zij het makkelijk kunnen overnemen.

**Bewijs:** onderbouwing.md (kleurenpalet en logo), contrastcheck, logobestanden.

## Fase 3 – Versie 1 van niveau 1

De eerste versie van de openbare website had vier pagina's: Home, Over MijnInkomen, Samenwerken en Contact. Ik bouwde ze per pagina, op basis van mijn schetsen en de opgehaalde requirements. Op de homepage kwamen de logo's van Amsterdam, Den Haag en Utrecht, en een illustratie die ik met ChatGPT maakte en daarna zelf aanpaste.

Toen ik controleerde of alles klopte met NL Design System, bleek dat de eerste componenten zelfgemaakt waren. Die heb ik vervangen door de officiële NLDS-componenten, en het formulier heb ik verbeterd volgens de NLDS-richtlijnen. Deze versie stond als deelbare link online voor de opdrachtgever, en ging via een merge request naar de dev-branch van ons team.

**Bewijs:** link versie 1, screenshots, AI-verantwoording, merge request in GitLab.

## Fase 4 – Versie 2: een nieuwe paginastructuur

Na de eerste validatie met Vincent heb ik de opbouw van de site opnieuw bekeken. Ik schreef een paginastructuur voor niveau 1, onderbouwd met de interviews met Gert, Carl, Selmar en Vincent. Het uitgangspunt werd: informeren, niet werven, in gewone taal en snel te scannen. Het menu werd Home, Ontwikkelingen, Aansluiten en Contact, in de volgorde van de vragen die een bezoeker na elkaar heeft.

Waar de echte informatie nog ontbrak, zette ik voorbeeldtekst met een duidelijk label "Voorbeeld". Het logo van 's-Hertogenbosch kwam erbij, met een blauw stukje in het streepje voor deze gemeente. Ik probeerde ook geel en blauw als accentkleuren in de tekeningen, maar vond dat niet mooi en ging terug naar groen.

**Bewijs:** document "Paginastructuur website MijnInkomen – niveau 1", onderbouwing.md, screenshots versie 2.

## Fase 5 – Versie 2.1: de feedback van Vincent verwerkt

Bij de volgende validatie was Vincent positief over de vormgeving, maar vond hij dat de site nog te veel aanstuurde op aansluiten. Zijn belangrijkste punt: de site moet vooral informeren en nieuwsgierig maken, en bij elk onderdeel moet duidelijk zijn waarom het er staat, waar de informatie vandaan komt en hoe het werkt. De tabel laat zien wat ik met elk punt heb gedaan.

| Feedback van Vincent                 | Wat ik veranderde                                                        |
|--------------------------------------|--------------------------------------------------------------------------|
| Homepage moet nieuwsgierig maken     | Kort overzicht met knoppen naar meer informatie                          |
| Informeren in plaats van werven      | "Aansluiten" werd "Meer weten"                                           |
| Verticaal menu bij veel informatie   | Zijmenu bij Ontwikkelingen en Meer weten                                 |
| Meer informatie bij projecttegels    | "Lees meer" met een detailpagina, de Stadspas als voorbeeld              |
| Dubbele informatie voorkomen         | Updates en Wat eraan komt weggehaald; "Recent bijgewerkt" op de homepage |
| Initiatief melden is iets anders     | Eigen pagina in het hoofdmenu, omdat het een actie is                    |
| Organisatie uitleggen                | Pagina "Hoe werken we samen?" met logo's en rollen                       |
| Eerst kennismaken, dan lid worden    | Pagina "Communitylid worden" en "Toegang aanvragen"                      |
| Werking beschrijven voor development | sitemap.md en componenten.md                                             |

Ik maakte ook eigen keuzes bovenop de feedback. "Wat eraan komt" haalde ik weg, omdat ik bezoekers feiten wil geven en geen plannen die nog kunnen veranderen. De rol "Sluit aan" vond ik vaag; die heet nu "Communitylid".

**Bewijs:** feedbackverslag van Vincent, link versie 2, onderbouwing.md, sitemap.md, componenten.md.

## Fase 6 – Kritische controle, WCAG en B1

Na het verwerken van de feedback liet ik het hele prototype nog een keer kritisch nalopen. Alle pagina's zijn getest op de WCAG: contrast, koppen, bediening met het toetsenbord en weergave op een telefoon. Daar kwamen geen fouten uit. De teksten heb ik op B1-niveau gebracht: moeilijke woorden vervangen, lange zinnen gesplitst en afkortingen uitgelegd.

Per verbeterpunt besliste ik zelf wat ik wel en niet aanpaste. Een voorstel om de naam van een onderdeel in het zijmenu te zetten, draaide ik juist om: die naam staat boven de paginatitel, zodat elke pagina dezelfde vaste opbouw heeft voor mensen die blind zijn en een schermlezer gebruiken. Dubbele informatie haalde ik weg, en bij Toegang aanvragen werd Functie een keuzelijst.

**Bewijs:** AI-verantwoording (controle op WCAG en B1, kritische controle), screenshots voor en na.

## Fase 7 – Het begin van niveau 2

Niveau 2 is het besloten deel voor communityleden. Het onderzoek, het bouwen, het contact met de opdrachtgever en het verwerken van de feedback werd te veel naast mijn andere taken. Daarom vroeg ik Tess om voor niveau 2 hetzelfde soort document te maken als ik voor niveau 1 had gemaakt. Haar deel heb ik tot nu toe verwerkt in het prototype: vijf pagina's met vergaderingen, de stand van zaken per gemeente, de roadmap en initiatieven.

Voor de demo werkt de knop Inloggen zonder gegevens, en alle namen zijn verzonnen voorbeelden. Het zijmenu stond eerst in het midden, maar belemmerde het beeld; ik zette het helemaal tegen de linkerkant, zoals in een werkprogramma. Dit is nog het begin: niveau 2 heeft nog genoeg validatie- en goedkeuringsmomenten nodig.

**Bewijs:** document "Website MijnInkomen – niveau 2" van Tess (in Teams), screenshots van mijn prototype van niveau 2, branch feat/prototype-niveau-2 in GitLab.

## Hoe ik werk

Zodra de requirements zijn opgehaald, bedenk ik per pagina wat erin moet komen. Dat leg ik vast in een schets of document, en dan laat ik het bouwen met de eisen van NL Design System, de WCAG en development erbij. Daarna bekijk ik het zelf in de browser en beslis ik wat beter moet.

Dit was nooit in één keer perfect. Ik heb het ontwerp meerdere keren met Vincent gevalideerd en steeds aangepast. Elke keuze leg ik vast in de onderbouwing, en in de AI-verantwoording staat wat ik deed en wat AI deed.

Ik werk volgens de samenwerkingsafspraken van mijn team: elke versie staat op een eigen branch in GitLab, en gaat via een merge request naar dev die een teamgenoot goedkeurt. Met de README, de sitemap en componenten.md kan development zien hoe alles werkt en waar de informatie vandaan komt.

## Waar ik nu sta en wat er nog komt

Niveau 1 is na de feedback van Vincent bijna klaar, en niveau 2 staat aan het begin. Het ontwerp van beide niveaus moet nog worden goedgekeurd door Vincent, Selmar en José.

De volgende stappen zijn:

1.  Niveau 1 valideren met Vincent, Selmar en José.

2.  Niveau 2 valideren en verder uitwerken met hun feedback.

3.  Het beheer onderzoeken. Hoe redacteuren de site straks aanpassen, is een extra onderdeel. Ik ontwerp dat zelf, of ik geef Amin en Benito tips over wat logisch is.

## Bewijsstukken per fase

| Fase         | Bewijs                                                      | Waar te vinden                                                                                 |
|--------------|-------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| 1 Onderzoek  | Interviewverslagen, schets op papier, notulen sprint 1 en 2 | GitLab (map docs), notulen in Teams, eigen schets                                              |
| 2 Huisstijl  | Kleurenpalet, contrastcheck, logo                           | onderbouwing.md                                                                                |
| 3 Versie 1   | Link versie 1, screenshots, merge request                   | [Link versie 1](https://claude.ai/artifact/YJW3WewgLvKftYtmA9EoYo), GitLab                     |
| 4 Versie 2   | Paginastructuur niveau 1, screenshots                       | Eigen document, onderbouwing.md                                                                |
| 5 Versie 2.1 | Feedbackverslag van Vincent, link versie 2                  | [Link versie 2](https://claude.ai/artifact/GB4aieUrnUGjK1U97CM5AK), sitemap.md, componenten.md |
| 6 Controle   | WCAG- en B1-controle                                        | AI-verantwoording.md                                                                           |
| 7 Niveau 2   | Document van Tess, screenshots van het prototype            | Teams (document van Tess), branch feat/prototype-niveau-2                                      |
| Alle fases   | Wat ik deed en wat AI deed                                  | AI-verantwoording.md                                                                           |
