# MijnInkomen

Dit is de MijnInkomen-website. Het project laat zien hoe de site eruit moet zien en hoe hij werkt: de structuur, componenten en huisstijl.

Op dit moment bevat het niveau 1 (informatief): de homepage en de pagina's *Over MijnInkomen*, *Samenwerken* en *Contact*. Het inlogmechanisme voor niveau 2 (ingelogde communityleden) en niveau 3 (developers) is ook aanwezig, maar de content voor ze is nog niet volledig uitegewerkt

Deze README legt stap voor stap uit hoe je het project op je laptop aan de praat krijgt, ook als je nog niks hebt geïnstalleerd.

---

## Inhoud

- [MijnInkomen](#mijninkomen)
  - [Inhoud](#inhoud)
  - [1. Wat heb je nodig?](#1-wat-heb-je-nodig)
    - [Stap 1: Git installeren](#stap-1-git-installeren)
    - [Stap 2: Node.js installeren](#stap-2-nodejs-installeren)
    - [Stap 4: Pnpm installeren](#stap-4-pnpm-installeren)
    - [Stap 4: Code-editor installeren](#stap-4-code-editor-installeren)
    - [Hoe open ik een terminal?](#hoe-open-ik-een-terminal)
  - [2. Het project ophalen](#2-het-project-ophalen)
  - [3. Het project starten](#3-het-project-starten)
    - [Front-end starten](#front-end-starten)
    - [Back-end starten](#back-end-starten)
  - [4. Wijzigingen delen met het team (Git)](#4-wijzigingen-delen-met-het-team-git)
  - [5. Problemen oplossen](#5-problemen-oplossen)
  - [6. Back-end lokaal starten](#6-back-end-lokaal-starten)

---

## 1. Wat heb je nodig?

Installeer onderstaande programma's **in deze volgorde**. Heb je iets al? Dan kun je dat overslaan.

| Programma | Waarvoor | Verplicht? |
| --- | --- | --- |
| **Git** | Het project ophalen en wijzigingen delen | Ja |
| **Node.js (LTS-versie)** | Draait het project | Ja |
| **Pnpm** | Beheert de packages (installaties) binnen het project| Ja |
| **Code-editor** (bijv. VS Code) | Bestanden bekijken en aanpassen | Ja, aanbevolen |

### Stap 1: Git installeren

**Windows**

1. Download Git via [git-scm.com/download/win](https://git-scm.com/download/win).
2. Open het gedownloade bestand en klik door met de standaardinstellingen (steeds op *Next*, aan het eind op *Install*).
3. Hiermee krijg je ook **Git Bash**, een terminal die je kunt gebruiken voor alle commando's in deze README.

**Mac**

[Open de Terminal](#hoe-open-ik-een-terminal) en typ `git --version`. Is Git nog niet geïnstalleerd, dan biedt je Mac aan om het te installeren. Klik op *Installeren*.

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

### Stap 4: Pnpm installeren

Om pnpm te installeren kun je gebruik maken van de net geïnstalleerde npm:

1. Open de terminal en type `npx get-pnpm`
2. Sluit de terminal
3. Open de terminal opnieuw en kijk of het geïnstalleerd is met `pnpm --version`

Als dat niet lukt, of je wilt / kan geen npm gebruiken, kun je voor verdere instructies gaan naar [de officiële website](https://pnpm.io/installation).

### Stap 4: Code-editor installeren

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

Dit project bestaat als het ware uit twee delen; een front-end en een back-end. Het aanpassen, en dus starten, van deze twee delen moeten gebeuren op verschillende manieren. De front-end is de website zelf. De code voor de front-end staat in de documentatie folder. De back-end is de rest, denk aan hoe het inloggen behandelt wordt.

### Front-end starten

Voor het aanpassen en/of starten van de front-end, is de beste methode direct via pnpm:

1. Open de terminal in de **documentatie** folder:

    ```bash
    cd ./documentatie
    ```

2. Installeer de onderdelen (alleen de eerste keer, en weer als er onderdelen zijn bijgekomen):

    ```bash
    pnpm install
    ```

3. Start de front-end in development mode:

    ```bash
    pnpm run dev
    ```

Nu kan je de development omgeving openen op het internet op het adres: <http://localhost:3000>. Met deze methode zorg je ervoor dat aanpassingen in de documentatie folder live mee gaan.

Om dit te stoppen kun je in dezelfde terminal `Ctrl + c` tegelijk intikken.

### Back-end starten

Voor het starten en/of aanpassingen maken op de back-end kun je hier verder gaan: 

[Back-end lokaal starten](#6-back-end-lokaal-starten)

---

## 4. Wijzigingen delen met het team (Git)

Werk nooit rechtstreeks op de hoofdbranch. Maak voor elke wijziging een eigen branch.

```bash
# 1. Haal eerst de laatste versie op
git checkout dev
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

---

## 5. Problemen oplossen

| Probleem | Oplossing |
| --- | --- |
| `command not found: git / node / npm` (Mac) of `... is not recognized as the name of a cmdlet` (Windows) | Het programma is niet (goed) geïnstalleerd. Installeer het opnieuw en **start je terminal opnieuw op**. |
| Windows: `npm.ps1 cannot be loaded because running scripts is disabled on this system` | PowerShell blokkeert scripts. Gebruik **Git Bash** of de **Opdrachtprompt (cmd)** in plaats van PowerShell. Of typ in PowerShell eenmalig: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` en bevestig met `J`. |
| `npm install` geeft fouten | Controleer of je de LTS-versie van Node.js hebt (`node --version`). Verwijder daarna de map `node_modules` en draai `npm install` opnieuw. |
| `npm run dev` doet niks of geeft een fout | Zorg dat je in de projectmap zit (waar `package.json` staat) en dat je `npm install` hebt gedraaid. |
| `Port 5173 is already in use` | Er draait al iets op die poort. Sluit de terminal waar het project al draait, of stop het andere proces. |

Vastgelopen? Verwijder `node_modules`, draai `npm install` opnieuw, en vraag anders hulp in het team.

---

## 6. Back-end lokaal starten

Voor het inloggen, dat werkt alleen via Nginx op <http://localhost:3000>. Stop daarom eerst de front-end development omgeving als die draait; die gebruikt dezelfde poort. Wil je tegelijk snel iets aanpassen zonder inloggen, start die dan met `pnpm start --port 3001`. Voor het starten van de back-end heb je [Docker Desktop](https://www.docker.com/products/docker-desktop/) nodig.

**1. Eenmalig: maak je instellingen.**

Doe dit in de hoofdmap van de repo. In production moeten de geheimen wel veilig zijn en dus vervangen worden.

```bash
cp .env.example .env
```

**2. Bouw de site** (ook opnieuw na een wijziging in `documentatie/`):

```bash
cd documentatie
pnpm install
pnpm run build
cd ..
```

**3. Start alles:**

```bash
docker compose up -d
```

| Adres | Waarvoor |
| --- | --- |
| http://localhost:3000 | De site met inloggen |
| http://localhost:3000/auth/admin | Beheer van Keycloak (`KEYCLOAK_ADMIN_USERNAME` en `KEYCLOAK_ADMIN_PASSWORD` uit `.env`) |
| http://localhost:8025 | Mailpit: hier komen de testmails binnen |

**Testaccounts** (e-mailadressen en wachtwoorden staan in `.env`):

| Account | Rol | Tweestapsverificatie |
|---|---|---|
| `TEST_ADMIN_EMAIL` | `admin` | Stel je bij de eerste keer in met een code-app |
| `TEST_LID_EMAIL` | `communitylid` | Staat al klaar voor de automatische test |
| `TEST_E2E_ADMIN_EMAIL` | `admin` | Staat al klaar voor de automatische test |

Heb je iets in `.env` of de realm aangepast? Wis dan de database, zodat de accounts opnieuw worden aangemaakt: `docker compose down -v` en daarna `docker compose up -d`.

**Aanvragen behandelen:** log in met een account met de rol `admin` en kies **Beheer** in het menu (`/community/beheer/`). Toelaten maakt een account met de rol `communitylid`. De uitnodiging staat daarna in Mailpit.

**Toegangsaanvragen bekijken:** aanvragen van `/toegang-aanvragen` staan in een eigen database. Bekijk ze met:

```bash
docker compose exec toegang-db psql -U toegang -c "SELECT naam, organisatie, email, gesprek_datum, status FROM toegangsaanvragen;"
```

Heb je `toegang-api/` aangepast? Bouw die opnieuw met `docker compose up -d --build toegang-api`.

**Testen van de API:** `cd toegang-api && npm install && npm run typecheck && npm test`.

**Stoppen:** `docker compose down`. Met `docker compose down -v` wis je ook alle accounts; bij de volgende start worden de testaccounts opnieuw aangemaakt.

> Deze instellingen zijn alleen voor lokaal gebruik. Voor een echte server zijn onder meer HTTPS, eigen domeinnamen, geen testaccounts en een afgeschermd adres voor het Keycloak-beheer nodig.
