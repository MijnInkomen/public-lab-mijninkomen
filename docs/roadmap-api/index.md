# Roadmap API

Binnen dit project hebben we een server genoemd de Roadmap API. Het doel van deze server is voor het opslaan en doorgeven van Feature en Epic informatie uit Github. Dit betekent dat als de frontend een request wil doen voor Feature en/of Epic informatie, moet het naar deze server gaan.

## Info

- **Directory**: [roadmap-api](../../roadmap-api/)
- **Adres**: /api/roadmap
- **Port**: 4000
- **Type**: Node Ts

Voor meer informatie over hoe de Roadmap API interacteert met GitHub voor het ophalen van de Features en Epics, kun je hier naar toe gaan: [Github Communicatie](./github-communicate.md)

Voor meer informatie over de Postgres SQL database waarmee de Roadmap API interacteert, kun je hier naar toe gaan: [Database documentatie](./database.md)

## Table Of Contents

- [Roadmap API](#roadmap-api)
  - [Info](#info)
  - [Table Of Contents](#table-of-contents)
  - [Endpoints](#endpoints)
    - [Keywords](#keywords)
    - [GET `/publiek/huidig`](#get-publiekhuidig)
      - [Response](#response)
      - [Voorbeeld](#voorbeeld)
    - [GET `/publiek/toekomstig`](#get-publiektoekomstig)
      - [Response](#response-1)
      - [Voorbeeld](#voorbeeld-1)
    - [GET `/update` -admin\_required](#get-update--admin_required)
      - [Response](#response-2)

## Endpoints

### Keywords

|Keyword|Betekenis|
|-|-|
|admin_required|Alleen ingelogde gebruikers deel van niveau 3 (admin / developers) kunnen requests hiernaar maken|

### GET `/publiek/huidig`

#### Response

Een JSON bestand met publieke features die huidig al in MijnInkomen zitten

**Format:**

```json
[
    {
        "heading": <naam feature>,
        "title": <naam feature>,
        "description": <description>,
        "gebruikers": [
            <naam stad/organisatie>,
            ...
        ],
        "status": ""
    },
    ...
]
```

#### Voorbeeld

http

GET /publiek/huidig

**Repsonse:**

```json
[
    {
        "heading": "Stadspas",
        "title": "Stadspas",
        "description": "Korting op sport, cultuur en activiteiten voor inwoners met een laag inkomen.",
        "gebruikers": [
            "Den Haag",
            "Utrecht"
        ],
        "status": ""
    },
    {
        "description": "Geld om van te leven als je te weinig inkomen hebt en geen andere uitkering kunt krijgen.",
        "heading": "Algemene bijstand (ALO)",
        "title": "Algemene bijstand (ALO)",
        "gebruikers": [
            "Den Haag",
            "Utrecht"
        ],
        "status": ""
    },
]
```

### GET `/publiek/toekomstig`

#### Response

Een JSON bestand met publieke features waar MijnInkomen momenteel aan werkt

**Format:**

```json
[
    {
        "heading": <langer naam feature>,
        "title": <naam feature>,
        "description": <description>,
        "gebruikers": [
            <naam stad/organisatie>,
            ...
        ],
        "status": <status feature>
    },
    ...
]
```

#### Voorbeeld

http

GET /publiek/toekomstig

**Repsonse:**

```json
[
    {
        "description": "Eén vaste manier om bijzondere bijstand aan te vragen en af te handelen, voor alle gemeenten.",
        "heading": "Basisproces bijzondere bijstand",
        "status": "In ontwikkeling",
        "gebruikers": [
            "Den Haag",
            "Utrecht"
        ],
        "title": "Stadspas"
    },
    {
        "description": "Amsterdam gaat MijnInkomen gebruiken. We testen samen of alles goed werkt.",
        "heading": "Aansluiting van Amsterdam",
        "status": "In test",
        "gebruikers": [
            "Amsterdam"
        ],
        "title": "Algemene bijstand"
    },
]
```

### GET `/update` -admin_required

#### Response

Een http request zonder body waarbij de status verwijst naar of het vernieuwen succesvol was.

- **Status code 500:** Er ging iets mis met de server en het updaten was niet succesvol
- **Status code 200:** Alles is goed gegaan het updaten was succesvol
