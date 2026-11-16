# Vakliteratuur samenvatting & micro-testscript (15 min) voor sprint 3 prototypes

In dit document vind je de belangrijkste tips uit de literatuur over snelle gebruikerstesten, gecombineerd met een kant-en-klaar testscript van maximaal 15 minuten. Speciaal gemaakt voor de Digital Business Engineer en het Scrum-team om vroege prototypes in Sprint 3 vlot te checken bij echte gebruikers.

---

## 1. Theoretisch & methodologisch kader: Snelle gebruikerstesten

Prototypes testen in een korte Agile-sprint vraagt om een aanpak die weinig tijd kost, maar wel direct de grootste knelpunten blootlegt. Dit kader combineert de praktische tips uit Steve Krugs *Rocket Surgery Made Easy* met de inzichten van de Nielsen Norman Group (NNg) en Lean UX.

### 1.1 Steve Krug’s filosofie: "Do-It-Yourself" usability testing

In zijn boek *Rocket Surgery Made Easy* laat Steve Krug zien dat de echte waarde van gebruikerstesten niet zit in grote, dure laboratoriumonderzoeken. Het geheim zit juist in het regelmatig uitvoeren van kleine, eenvoudige tests door het team zelf.

Dit zijn de belangrijkste principes uit zijn aanpak:

* **Vaker testen in plaats van groter testen**: Het werkt veel beter om elke maand of sprint één ochtend te testen met 3 tot 5 mensen, dan één keer per jaar een groot onderzoek te doen met 20 deelnemers.
* **Grote fouten vroeg onderscheppen**: Door al vroeg in het ontwerpproces te testen, haal je de grootste denkfouten eruit voordat er überhaupt een regel code is geschreven.
* **We testen de software, niet de gebruiker**: Maak deelnemers vooraf duidelijk dat zij niets fout kunnen doen. Als iets niet lukt, ligt dat aan het ontwerp, nooit aan hen.
* **Kies voor de kleinste oplossing ("Do the Least You Can Do")**: Heb je een knelpunt ontdekt? Ga dan niet meteen alles opnieuw ontwerpen, maar zoek de simpelste, kleinste aanpassing (*tweak*) die het probleem oplost.

### 1.2 Gecomprimeerd testen: Van 60 minuten naar een 15-minuten micro-sessie

Traditionele usabilitytests, zoals beschreven in Krug’s standaard web-testscript, duren doorgaans 50 tot 60 minuten. Binnen een dynamische sprintomgeving waarin snel iteratieve prototypes (zoals wireframes of interactieve Figma-prototypes in sprint 3) moeten worden getoetst, kan een verkleind micro-testformaat van 15 minuten worden ingezet.

De onderstaande vergelijking beschrijft hoe de onderdelen uit het klassieke testscript van Krug worden teruggebracht tot hun essentie voor een micro-sessie:

| Fase in het testscript | Traditionele sessie (~60 min) | Micro-sessie (~15 min) |
| :--- | :--- | :--- |
| **1. Welkom & toestemming** | Uitgebreide uitleg, opname-toestemming, ijsbreker (5-8 min) | Snelle, gestandaardiseerde introductie & ondertekening (2 min) |
| **2. Contextuele vragen** | Uitgebreide achtergrond, internetgebruik, favoriete sites (5-7 min) | Maximaal 2 gerichte profielvragen over het specifieke domein (1,5 min) |
| **3. Home page / concept tour** | Verkenning van de homepage zonder klikken (3-5 min) | Korte blik op het startscherm van het prototype (2,5 min) |
| **4. Scenario-opdrachten** | 3 tot 5 uitgebreide taken (30-35 min) | 1 tot 2 kernopdrachten gericht op de feature (7 min) |
| **5. Debriefing & afronding** | Vragen van observatoren bellen, uitgebreide nagesprekken (5-10 min) | Korte check op observatiepunten & bedanken (2 min) |

### 1.3 Neutrale begeleiding en "Things a Therapist Would Say"

Om bruikbare data op te halen tijdens een gebruikerstest, is het cruciaal dat de facilitator volkomen neutraal blijft. Zodra je als begeleider hints geeft of sturende vragen stelt, beïnvloed je direct de resultaten.

Steve Krug raadt daarom aan om te werken met neutrale, 'therapeutische' frases. Zo zorg je ervoor dat de deelnemer echt natuurlijk gedrag laat zien en zelf de oplossing probeert te vinden.

* **Bij twijfel of stilstand**: Valt de deelnemer stil of twijfelt ie? Vraag dan simpelweg: "Wat denk je?", "Waar kijk je nu naar?" of "Wat probeer je nu te doen?".
* **Als de gebruiker een vraag stelt**: Vraagt iemand bijvoorbeeld "Moet ik hierop klikken?", kaats hem dan terug: "Wat zou je doen als je dit thuis in je eentje deed?" of "Wat denk je dat er gebeurt als je daarop klikt?".
* **Laat merken dat je luistert (Acknowledgment Tokens)**: Door af en toe neutraal "uh-huh", "oké" of "mm-hmm" te zeggen, weet de gebruiker dat je oplet, zonder dat je laat merken of ze het wel of niet 'goed' doen.
* **Vat samen en verduidelijk**: Kort even herhalen wat iemand zegt ("Dus als ik het goed begrijpt, valt deze knop onderaan niet op?") voorkomt misverstanden en maakt het ook meteen helder voor meekijkers in de observatieruimte.

### 1.4 Observatie, debriefing en het teamproces

Usabilitytesten hebben pas echt effect als het ontwikkelteam en de stakeholders actief meekijken. Om te zorgen dat zij goed betrokken zijn zonder de test zelf te verstoren, is een strakke aanpak nodig:

* **De observatieruimte (Observer Room)**: Observeerders volgen de test vanuit een aparte ruimte via een scherm en audiostream. Een aangewezen Hall Monitor bewaakt hier de rust, legt alle documenten (zoals het script en de scenario's) klaar en zorgt dat het noteren van observaties gestructureerd verloopt.
* **De top 3 problemen**: Direct na elke sessie noteert iedere observator op een formulier de 3 grootste knelpunten waar de gebruiker tegenaan liep.
* **Gezamenlijke debriefing**: Aan het eind van de testdag (of tijdens de lunch) komen de facilitators en meekijkers bij elkaar. Alle losse top 3-lijstjes worden dan samengevoegd tot één overzichtelijke prioriteitenlijst voor de volgende sprint.

### 1.5 Afstemming met Nielsen Norman Group (NNg) en Lean UX

De ideeën van Steve Krug sluiten goed aan op de richtlijnen van de Nielsen Norman Group (NNg) en het Lean UX-manifest van Gothelf en Seiden:

* **De 5-gebruikersregel van NNg**: Onderzoek van NNg laat zien dat je met slechts 5 testpersonen al zo’n 85% van de grootste problemen in een interface boven water haalt. Meer mensen testen in dezelfde ronde levert daarna steeds minder nieuwe inzichten op.
* **Testen op basis van aannames (Lean UX)**: In sprint 3 richt je met een kort testscript niet op de hele applicatie. In plaats daarvan test je heel gericht de meest risicovolle aannames rondom een nieuwe functie of workflow.
* **Korte feedbackloops**: Vergeet dikke onderzoeksrapporten van 50 pagina’s. Binnen Lean UX vertaal je de testresultaten direct naar concrete taken op de backlog voor de volgende sprint.

---

## 2. Het Micro-Testscript (Max. 15 Minuten) voor Sprint 3 Prototypes

Dit testscript is direct te gebruiken door de Digital Business Engineer of facilitator bij het testen van de nieuwste prototypeversie.

### 2.1 Tijdsmatrix & Structuur van de Micro-Sessie

De onderstaande tabel geeft de strikte tijdsverdeling aan voor het verloop van de 15 minuten:

| Fase | Onderdeel | Duur | Primair Doel |
| :--- | :--- | :--- | :--- |
| **Fase 1** | Welkom, instructie & consent | 2 minuten | Deelnemer op zijn gemak stellen, toestemming opname borgingsformulier. |
| **Fase 2** | Contextuele achtergrondvragen | 1,5 minuut | Vaststellen van relevante gebruikerservaring en context. |
| **Fase 3** | Eerste blik / concept tour | 2,5 minuut | Ongefilterde eerste indruk van het prototype-startscherm opvangen. |
| **Fase 4** | Uitvoering scenario-opdrachten | 7 minuten | Observeren van taakuitvoering en knelpunten in de feature. |
| **Fase 5** | Debriefing & afronding | 2 minuten | Eventuele verduidelijkingsvragen stellen, bedanken en afronden. |

### 2.2 Fase 1: Welkom, Doel & Toestemming (2 minuten)

**Welkomstscript voor de Facilitator**  
De facilitator leest de onderstaande tekst hardop voor aan de deelnemer om te garanderen dat alle juridische en methodologische randvoorwaarden worden afgedekt:

> "Hallo [Naam deelnemer], mijn naam is [Naam facilitator]. Hartelijk dank dat je vandaag wilt meewerken aan deze korte sessie. Binnen ons team werken we aan een nieuw prototype voor [naam van het product/systeem], en we willen graag testen of het werkt zoals bedoeld.
> 
> Voordat we beginnen, wil ik een paar belangrijke punten benadrukken:
> * We testen het prototype, niet jou. Je kunt absoluut niets fout doen. Elk knelpunt dat je tegenkomt, helpt ons om het ontwerp te verbeteren.
> * Terwijl je dadelijk met het prototype werkt, vraag ik je om zoveel mogelijk hardop te denken. Zeg hardop waar je naar kijkt, wat je probeert te doen en wat je verwacht dat er gebeurt.
> * Wees eerlijk. Je kunt onze gevoelens niet kwetsen; we willen juist je oprechte reacties horen.
> * Als je vragen hebt, stel ze gerust. Het kan zijn dat ik ze niet direct beantwoord, omdat we willen zien hoe je het maakt als er niemand is om te helpen.
> * Met jouw toestemming willen we de interactie op het scherm en ons gesprek opnemen. Dit wordt uitsluitend intern gebruikt door het projectteam om het ontwerp te verbeteren. Zou je dit korte toestemmingsformulier willen ondertekenen?"

**Actie Facilitator:**
* Overhandig het toestemmingsformulier voor opname (*Recording consent form*).
* Terwijl de deelnemer ondertekent: Start de scherm- en audiorecorder.

### 2.3 Fase 2: Contextuele achtergrondvragen (1,5 minuut)

De facilitator stelt maximaal twee korte vragen om het profiel van de deelnemer te valideren:

> "Voordat we naar het scherm kijken, heb ik twee korte vragen:"  
> 1. "Wat is je huidige beroep of dagelijkse werkzaamheid?"  
> 2. "Hoe vaak maak je in je werk of dagelijks leven gebruik van [relevante technologie of vergelijkbaar type systeem]?"

### 2.4 Fase 3: Eerste Indruk / Concept Tour (2,5 minuut)

De facilitator opent het prototype op het startscherm of het specifieke scherm.

**Instructie aan de Deelnemer:**
> "We gaan nu naar het scherm kijken. Ik wil je vragen om rond te kijken op deze pagina en mij hardop te vertellen wat je ervan maakt:
> * Wat valt je direct op?
> * Voor wie denk je dat dit schermafdruk of systeem bedoeld is?
> * Wat denk je dat je op deze pagina kunt doen?
> 
> Je mag wel scrollen als dat kan, maar klik aanhoudend nog nergens op."

**Actie Facilitator:**
* Laat de deelnemer maximaal 2 tot 2,5 minuut aan het woord.
* Noteer de eerste spontane reacties op navigatie, terminologie en lay-out.

### 2.5 Fase 4: Kernopdrachten / prototype scenario's (7 minuten)

De facilitator reikt de specifieke testopdrachten voor de feature uit op papier en leest ze voor.

**Instructie bij Scenario 1 (3,5 minuut):**
> "Je meemaakt nu een specifieke taak uitvoeren op het prototype. Probeer bij het uitvoeren hardop te blijven denken.
> 
> **[Scenario 1 Tekst]**: Stel je voor dat je [omschrijving van de specifieke casus]. Probeer dit proces via het prototype te doorlopen."

**Instructie bij Scenario 2 (3,5 minuut):**
> **[Scenario 2 Tekst]**: "Stel dat je nu [omschrijving van de vervolgtaak of alternatieve functionaliteit]. Laat zien hoe je dat zou aanpakken."

**Richtlijnen tijdens de uitvoering:**
* Grijp niet in wanneer de gebruiker zoekt of twijfelt.
* Gebruik bij stilte de neutrale vragen: "Wat zoek je nu?" of "Wat denk je dat die knop doet?".
* Blijf neutraal met lichte bevestigingen ("mhm", "ok").

### 2.6 Fase 5: Debriefing & afronding (2 minuten)

Wanneer de taken zijn afgerond of de tijd om is, rondt de facilitator de sessie af.

> "Dat was ontzettend waardevol. Bepaalde dingen die je liet zien helpen ons enorm.
> 
> Heb je zelf nog vragen of opmerkingen over het prototype die je met ons wilt delen?"

**Actie Facilitator:**
* Vraag eventueel kort na op een opvallend moment tijdens de test.
* Stop de opname en sla het opnamebestand op.
* Bedank de deelnemer voor zijn of haar time en loop even mee naar de uitgang.

---

## 3. Facilitatie-toolbox & praktische checklists

Om de testdagen soepel te laten verlopen, helpt onderstaande gereedschapskist het hele team op weg.

### 3.1 Spiekkaart voor de Facilitator: Therapeutische Responsen

Tijdens het testen ontstaan regelmatig situaties waarin de deelnemer sturing zoekt. Gebruik onderstaande tabel om neutraal te reageren:

| Wat er gebeurt tijdens de test | Wat de facilitator zegt |
| :--- | :--- |
| De deelnemer valt stil en je weet niet wat hij/zij denkt. | "Wat denk je nu?" / "Waar kijk je naar?" / "Wat probeer je te doen?" |
| De deelnemer is verrast door een actie of melding op het scherm. | "Is dat wat je verwachtte dat er zou gebeuren?" |
| De deelnemer vraagt om een hint ("Moet ik op deze knop drukken?"). | "Wat zou je doen als je alleen thuis/op je werk was?" / "Wat denk je dat er gebeurt als je daarop klikt?" |
| De deelnemer twijfelt of hij/zij wel 'goede' antwoorden geeft. | "Dit is precies wat we nodig hebben, je helpt ons hier erg mee." |
| De deelnemer vraagt hoe de achterliggende functionaliteit werkt. | "Hoe denk je dat het zou moeten werken? I kan het nu niet direct uitleggen, maar vertel me er na de test graag meer over." |
| De deelnemer raakt afgeleid van de hoofdfunctie. | "Wat probeer je op dit moment te bereiken?" |

### 3.2 Voorbereidingschecklist voor de Digital Business Engineer

Met een duidelijke planning staat alles op tijd klaar voor de testdag.

#### Drie tot twee weken voor de testdag
* Bepaal welke prototype-functionaliteiten getest moeten worden.
* Stel de scenario's op in nauw overleg met het team.
* Werf 5 geschikte testdeelnemers uit de doelgroep.
* Reserveer de testruimte en een nabijgelegen observer room inclusief schermen/wifi.

#### Één week tot twee dagen voor de testdag
* Stuur een bevestiging en routebeschrijving naar de deelnemers.
* Voer een proeftest (pilot) uit met de scenario's op het prototype om technische bugs op te sporen.
* Print de nodige documenten:
  * Toestemmingsformulieren voor opname (*permission-form.pdf*).
  * Losse scenario-kaarten voor de deelnemers.
  * Exemplaren van de *Instructions for Observers* voor de observer room.
* Wijs een Hall Monitor aan voor de opvang van observatoren.

#### Testdag (Vóór de eerste sessie)
* Controleer of het prototype naar behoren werkt en laad eventuele testdata in.
* Test de schermopname- en audiosoftware (doe een korte testopname en speel deze af).
* Zorg voor voldoende observatieformulieren (Top-3 usability problemen) in de observer room.
* Zorg dat de browser geschiedenis is gewist en een neutrale startpagina klaarstaat.

### 3.3 Observatie- en debriefingsprotocol voor het team

Goed observeren en de resultaten verwerken lukt alleen als het hele team actief meedoet:

* **Scherp meeschrijven**: Tijdens de test van 15 minuten schrijven meekijkers direct op waar de gebruiker twijfelt, fout klikt of even niet snapt wat er gebeurt.
* **Top 3 opschrijven**: Meteen na afloop van de sessie noteert iedereen zijn of haar 3 grootste opvallers op het formulier.
* **Samen keuzes maken (Debriefing)**: Na de laatste test gaat de groep bij elkaar zitten. Jullie zetten alle knelpunten op één bord en kijken wat de grootste impact heeft. De belangrijkste verbeterpunten gaan meteen als User Story of taak mee naar Sprint 4.
