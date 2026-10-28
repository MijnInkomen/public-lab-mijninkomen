# MijnInkomen

Dit is de MijnInkomen-website. Het project laat zien hoe de site eruit moet zien en hoe hij werkt: de structuur, componenten en huisstijl.

Op dit moment bevat het niveau 1 (informatief): de homepage en de pagina's *Over MijnInkomen*, *Samenwerken* en *Contact*. Niveau 2 (ingelogde communityleden) komt later.

Deze README legt stap voor stap uit hoe je het project op je laptop aan de praat krijgt, ook als je nog niks hebt geïnstalleerd.

---

## Inhoud

1. [Wat heb je nodig?](#1-wat-heb-je-nodig)
2. [Het project ophalen](#2-het-project-ophalen)
3. [Het project starten](#3-het-project-starten)
4. [Wijzigingen delen met het team (Git)](#5-wijzigingen-delen-met-het-team-git)
5. [Problemen oplossen](#6-problemen-oplossen)

---

## 1. Wat heb je nodig?

Installeer onderstaande programma's **in deze volgorde**. Heb je iets al? Dan kun je dat overslaan.

| Programma | Waarvoor | Verplicht? |
|---|---|---|
| **Git** | Het project ophalen en wijzigingen delen | Ja |
| **Node.js (LTS-versie)** | Draait het project (inclusief `npm`) | Ja |
| **Code-editor** (bijv. VS Code) | Bestanden bekijken en aanpassen | Ja, aanbevolen |

### Stap 1: Git installeren

**Windows**

1. Download Git via [git-scm.com/download/win](https://git-scm.com/download/win).
2. Open het gedownloade bestand en klik door met de standaardinstellingen (steeds op *Next*, aan het eind op *Install*).
3. Hiermee krijg je ook **Git Bash**, een terminal die je kunt gebruiken voor alle commando's in deze README.

**Mac**

Open de Terminal en typ `git --version`. Is Git nog niet geïnstalleerd, dan biedt je Mac aan om het te installeren. Klik op *Installeren*.

Controleer of het gelukt is:

```bash
git --version
```

### Stap 2: Node.js installeren

1. Ga naar [nodejs.org](https://nodejs.org).
2. Download de **LTS**-versie (de knop met "LTS", niet "Current"). Op Windows krijg je een `.msi`-bestand, op Mac een `.pkg`-bestand.
3. Open het bestand en installeer met de standaardinstellingen. Laat op Windows het vinkje staan bij *Add to PATH* (staat standaard aan).
4. **Sluit je terminal en open hem opnieuw** (anders herkent hij Node nog niet).

Controleer:

```bash
node --version
npm --version
```

Zie je bij beide een versienummer? Dan is het gelukt. `npm` wordt automatisch met Node.js meegeïnstalleerd, je hoeft niks extra's te installeren.

### Stap 3: Code-editor installeren

Download [Visual Studio Code](https://code.visualstudio.com/) en installeer het. Je mag ook een andere editor gebruiken.

### Hoe open ik een terminal?

**Windows**

- Zoek in het startmenu naar **Git Bash** (staat er na het installeren van Git) of **PowerShell**.
- Wil je de terminal in een bepaalde map openen? Klik in Verkenner met de rechtermuisknop in de map en kies *Open Git Bash here* (of *Openen in Terminal*).

**Mac**

- Druk op `Cmd + Spatie`, typ *Terminal* en druk op Enter.

**Handig in VS Code (Windows en Mac)**

- Menu *Terminal → Nieuwe terminal*. Die opent meteen in de projectmap.

---

## 2. Het project ophalen

Clone het project dat in onze GitLab staat naar je laptop. Dit hoef je maar één keer te doen.

Open een terminal in de map waar je het project wilt hebben en typ:

```bash
git clone <URL-VAN-ONZE-GITLAB-REPOSITORY>
```

Ga daarna de nieuwe map in:

```bash
cd <naam-van-de-map>
```

---

## 3. Het project starten

Voer deze stappen uit in de projectmap documentatie.

**1. Onderdelen installeren** (alleen de eerste keer, en weer als er onderdelen zijn bijgekomen):

```bash
npm install
```

**2. Het project starten:**

```bash
npm run dev
```

Er verschijnt een link in de terminal, meestal **http://localhost:5173**. Open die in je browser. Je ziet nu de MijnInkomen-website.

Zolang dit commando draait, worden je wijzigingen direct zichtbaar in de browser.

**Stoppen:** druk in de terminal op `Ctrl + C`.

**Weer starten:** `npm run dev`. Opnieuw `npm install` draaien is alleen nodig als er onderdelen zijn gewijzigd.

---

## 4. Wijzigingen delen met het team (Git)

Werk nooit rechtstreeks op de hoofdbranch. Maak voor elke wijziging een eigen branch.

```bash
# 1. Haal eerst de laatste versie op
git checkout main
git pull

# 2. Maak een nieuwe branch (geef hem een duidelijke naam)
git checkout -b mijn-wijziging

# 3. Pas bestanden aan, en voeg ze dan toe
git add .
git commit -m "Korte omschrijving van wat je hebt gedaan"

# 4. Zet je branch online
git push -u origin mijn-wijziging
```

Maak daarna in GitLab een **Merge Request** aan en vraag iemand uit het team om mee te kijken.

> Controleer of de hoofdbranch in jullie GitLab `main` of `master` heet en pas de commando's zo nodig aan.

---

## 5. Problemen oplossen

| Probleem | Oplossing |
|---|---|
| `command not found: git / node / npm` (Mac) of `... is not recognized as the name of a cmdlet` (Windows) | Het programma is niet (goed) geïnstalleerd. Installeer het opnieuw en **start je terminal opnieuw op**. |
| Windows: `npm.ps1 cannot be loaded because running scripts is disabled on this system` | PowerShell blokkeert scripts. Gebruik **Git Bash** of de **Opdrachtprompt (cmd)** in plaats van PowerShell. Of typ in PowerShell eenmalig: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` en bevestig met `J`. |
| `npm install` geeft fouten | Controleer of je de LTS-versie van Node.js hebt (`node --version`). Verwijder daarna de map `node_modules` en draai `npm install` opnieuw. |
| `npm run dev` doet niks of geeft een fout | Zorg dat je in de projectmap zit (waar `package.json` staat) en dat je `npm install` hebt gedraaid. |
| `Port 5173 is already in use` | Er draait al iets op die poort. Sluit de terminal waar het project al draait, of stop het andere proces. |

Vastgelopen? Verwijder `node_modules`, draai `npm install` opnieuw, en vraag anders hulp in het team.