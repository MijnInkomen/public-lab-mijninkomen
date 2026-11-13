import { Card } from '@components/card/card';
import { Badge } from '../home/Badge';
import { useFetch } from '../useFetch';

type PubliekeFeaturesProps = {
    type: "huidig" | "toekomstig"
};

export function PubliekeFeatures({ type }: PubliekeFeaturesProps) {
    const json = useFetch(`/api/roadmap/${type}`);
    if (json === null) {
        return <b>Informatie laden...</b>;
    } else if (json === false) {
        return <>Iets ging er mis met het ophalen van de informatie, probeer opnieuw later</>
    }

    const cards = json.publiek[type].map((cardInfo, index) => {
        return (<Card
            description={cardInfo.description}
            heading={cardInfo.heading}
            {...(type === "toekomstig" ? {subheading: <Badge>{cardInfo.status}</Badge>} : {})}
            href="#"
            metadata={`Gebruikt door: ${cardInfo.gebruikers.join(", ")}`}
            title={cardInfo.title}
            linkLabel="Lees meer"
            key={index}
        ></Card>)
    });
    return <>{cards}</>;
}
