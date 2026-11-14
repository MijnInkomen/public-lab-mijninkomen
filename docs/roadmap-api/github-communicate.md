# GitHub API Communicatie

Voor het project moeten we Features en Epics vanuit GitHub renderen in de gebruikers browser. Dit kan gedaan worden door middel van API calls of Webhooks.

## API Calls

Als een gebruiker een oproep doet naar de api voor de Features en Epics, kunnen we eerst kijken hoe oud de opgeslagen informatie is. Dan als het ouder is dan een gezette duratie, doen we eerst een API call naar GitHubs servers. Dan slaan we de resultaten van dat verzoek op en geven we de gebruiker de correcte informatie. Als het niet ouder is geven we de gebruiker gewoon direct de opgeslagen informatie en doen we nooit een API call naar GitHubs servers.

Diagram: [API Call Diagram](#api-call-diagram)

### API Call voordelen

- Simpel om op te zetten

### API Call nadelen

- Informatie is minder recent

    Als iemand een verzoek maakt voordat de duratie af is, krijgen ze oude informatie. Zelfs als er al nieuwe informatie op GitHub staat.
- Maakt onnodige verzoeken

    Met deze methode moet je periodiek nieuwe verzoeken maken. Maar de meeste van deze verzoeken zullen waarschijnlijk geen veranderingen bevatten. Dat zijn dus een hoop extra verzoeken dan nodig is

## Webhooks

Bij webhooks stuurt GitHub automatisch de informatie als een Feature of Epic wordt geupdate in GitHub. Dus als een gebruiker een oproep doet naar het api, kan de server gewoon direct de opgeslagen data mee geven

Diagram: [Webhook Diagram](#webhook-diagram)

### Webhooks voordelen

- Informatie is zo recent als het kan

### Webhooks nadelen

- Lastiger om op te zetten, vooral in development
- Updates kunnen gemist worden

    Als GitHub een update krijgt, terwijl de MijnInkomen servers om een of andere reden offline staan. Wordt de opgeslagen informatie niet hernieuwd. Dus dan is de informatie op de website oud totdat er een nieuwe update op GitHub komt.

## Implementatie

De beste keuze voor ons gebruik zal een combinatie van beide zijn. Het systeem zal normaal gebruik maken van Webhooks, maar wanneer iemand met admin rechten handmatig een API call doet naar de server, wordt er gebruik gemaakt van een API call. Hierdoor kunnen de meeste updates automatisch gebeuren op een efficiënte manier en blijft de data op de server recent. En dan als er een fout gebeurt in dit automatische systeem, kan de website nog steeds handmatig hernieuwd worden.

Diagrammen: [Implementatie Diagrammen](#implementatie-diagrammen)

### API Call type: GraphQL

Op eerste instantie verwachtte ik dat de simpelste methode via REST zou zijn. Dat was ook het eerste dat ik zag op GitHubs API documentatie. Maar na overwegen welke informatie we moeten ophalen per call, kwam ik tot de conclusie dat REST lastig ging zijn. Het probleem is dat er geen enkele endpoint is voor het ophalen van issues en hun subissues. Dus dan zouden we eerst een API call moeten maken voor alle issues in het project, en daarna per issue alle subissues ophalen, als het een epic is. Het is zeker mogelijk maar neemt veel meer calls dan zou horen te hoeven. GraphQL maakt het simpel doordat je met hun notatie alleen één call hoeft te doen. Daarna haalt de server de informatie op en geeft het je in de aangegeven format. Daarnaast geeft GraphQL ook precies de informatie waar je voor vroeg, dus kunnen de json packages heen en weer zo klein als mogelijk zijn.

## Diagrammen

*auth*: In deze diagrammen wordt auth geskipt voor overzichtelijkheid. Auth zou altijd gebeuren voordat nginx een verzoek doet naar de node server.

*endpoints*: De adressen benoemd in deze diagrammen, `api/github/publiek` bijvoorbeeld, zijn nog niet vast en voornamelijk bedoelt als voorbeeld.

### Webhook Diagram

```mermaid
sequenceDiagram
    actor browser as Browser
    participant proxy as NginX
    participant node as Node Server
    participant github as GitHub API
    opt Feature/Epic update
        github-->>node: Feature en Epic JSON
        activate node
        node->>node: JSON opslaan
        deactivate node
    end
    browser->>proxy: GET api/github/publiek
    activate browser
    activate proxy
    proxy->>node: GET api/github/publiek
    activate node
    deactivate proxy
    node->>node: JSON ophalen
    node-->>proxy: Feature en Epic JSON
    activate proxy
    deactivate node
    proxy-->>browser: Feature en Epic JSON
    deactivate proxy
    deactivate browser
```

### API Call Diagram

```mermaid
sequenceDiagram
    actor browser as Browser
    participant proxy as NginX
    participant node as Node Server
    participant github as GitHub API
    browser->>proxy: GET api/github/publiek
    activate browser
    activate proxy
    proxy->>node: GET api/github/publiek
    activate node
    deactivate proxy
    opt Laatste verzoek 1+ uur geleden
        node->>github: Verzoek Epics en Features
        github-->node: Feature en Epic JSON
        node->>node: Json opslaan
    end
    node->>node: JSON ophalen
    node-->>proxy: Feature en Epic JSON
    activate proxy
    deactivate node
    proxy-->>browser: Feature en Epic JSON
    deactivate proxy
    deactivate browser
```

### Implementatie Diagrammen

```mermaid
---
title: Data vernieuwen
---
sequenceDiagram
    actor browser as Browser
    participant proxy as NginX
    participant node as Node Server
    participant github as GitHub API
    opt Feature/Epic update
        github-->>node: Feature en Epic JSON
        activate node
        node->>node: JSON opslaan
        deactivate node
    end
    browser->>proxy: GET api/github/vernieuw
    activate proxy
    proxy->>node: GET api/github/vernieuw
    deactivate proxy
    activate node
    node->>github: Verzoek Epics en Features
    github-->>node: Feature en Epic JSON
    node->>node: JSON opslaan
    deactivate node

```

---

```mermaid
---
title: Data ophalen
---
sequenceDiagram
    actor browser as Browser
    participant proxy as NginX
    participant node as Node Server
    browser->>proxy: GET api/github/publiek
    activate browser
    activate proxy
    proxy->>node: GET api/github/publiek
    activate node
    deactivate proxy
    node->>node: JSON ophalen
    node-->>proxy: Feature en Epic JSON
    activate proxy
    deactivate node
    proxy-->>browser: Feature en Epic JSON
    deactivate proxy
    deactivate browser
```
