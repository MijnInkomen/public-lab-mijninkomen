import { Card } from '@components/card/card';
import { Badge } from '../home/Badge';
import { type APIResponseType, useFetch } from '../useFetch';

type PubliekeFeaturesProps = {
    type: "huidig" | "toekomstig"
};

export function PubliekeFeatures({ type }: PubliekeFeaturesProps) {
    const response = useFetch(`/api/roadmap/publiek/${type}`);
    if (response === null) {
        return <b>Informatie laden...</b>;
    } else if (response === false) {
        return <>Iets ging er mis met het ophalen van de informatie, probeer later opnieuw</>;
    } else if (response.length === 0) {
        return <>In de toekomst komen hier meer ontwikkelingen te staan, kom later terug</>
    }

    let json;
    try {
        json = JSON.parse(response) as APIResponseType["publiek"][typeof type];
    } catch (e) {
        console.error(e);
    }
    const cards = json?.map((cardInfo, index) => {
        return (<Card
            description={cardInfo.description}
            heading={cardInfo.title}
            {...(type === "toekomstig" ? {subheading: <Badge>{cardInfo.status}</Badge>} : {})}
            href="#"
            metadata={`Gebruikt door: ${cardInfo.gebruikers.join(", ")}`}
            title={cardInfo.title}
            linkLabel="Lees meer"
            key={index}
        ></Card>);
    });
    return <>{cards}</>;
}
