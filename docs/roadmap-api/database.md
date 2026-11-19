# PostgreSQL Database

Voor het lokaal opslaan van de features en epics gebruiken we een Postgres database. Op eerste instantie was het idee om alle informatie rauw op te slaan in een json-bestand. Dit is veel simpeler om te implementeren, maar heeft als nadelen dat het onhandig wordt voor het schalen. Daardoor werd uiteindelijk gekozen voor een sql database. Er is specifiek gekozen voor Postgres, doordat deze database al op twee andere plaatsen werd gebruikt binnen het project

## ERD

```mermaid
erDiagram
    epics |o--o{ features: contains
    epics {
        uuid id
        text title
        text description
        text status
        boolean open
        text[] labels
    }
    features {
        uuid id
        uuid? epic_id
        text title
        text description
        text status
        boolean open
        text[] labels
    }
```

De belangrijkste informatie binnen GitHub die opgehaald moeten worden staatn in de labels. Deze bepalen of het een epic of feature is, of het publiek of niet moet zijn, etc. Normaal zou een relatie tussen meerdere en meerdere behandelt worden met een extra tabel. Deze tabel wordt dan gebruikt om erachter te komen welke van tabel A allemaal verbonden is aan tabel B, en andersom. Maar in deze situatie hebben we twee tabels die verbonden moeten worden aan labels. Dit heeft als nadeel dat we dan ook twee van zulke "merge tabellen" zouden moeten hebben; een voor epics en een voor features. Daarom is er voor gekozen om gebruik te maken van Postgres'es array functionaliteit.
