import { Card } from "@rijkshuisstijl-community/card-react";
import { Badge } from '../home/Badge';
import { useState, useCallback, useEffect } from "react";

export type APIResponseType = {
    huidig?: cardInfo[],
    toekomstig?: cardInfo[],
};

export type cardInfo = {
    title: string,
    status: string,
    isOpen: boolean,
} & ({
    description: null,
    gebruikers: null,
} | {
    description: string,
    gebruikers: string[],
});

export type epic = feature & {
    features: feature[],
};

export type feature = {
    title: string,
    description: string,
    labels: string[],
    status: string,
    isOpen: boolean,
};

type PubliekeFeaturesProps = {
    type: "huidig" | "toekomstig"
};

export function PubliekeFeatures({ type }: PubliekeFeaturesProps) {
    const [epics, setEpics] = useState<null | false | APIResponseType>(null);
    const haalOp = useCallback(async () => {
        try {
            // Statisch fetch voor testing
            const response = await fetch("/community/publiek.json");

            // Dynamische fetch connectie aan github API
            // const response = await fetch(`/api/roadmap/publiek/${type}`);

            if (!response.ok) {
                throw new Error(`Status ${response.status}`);
            }

            setEpics(await response.json());
        } catch(e) {
            console.error(e);
            setEpics(false);
        }
    }, []);
    useEffect(() => {
        haalOp();
    }, [haalOp]);
    
    if (epics === false) {
        return <>Iets ging er mis met het ophalen van de informatie, probeer later opnieuw</>;
    }
    
    if (!epics || !(type in epics) || !epics[type]) {
        return <b>Informatie laden...</b>;
    }

    const items: cardInfo[] = epics[type];
    if (items.length === 0) {
        return <>In de toekomst komen hier meer ontwikkelingen te staan, kom later terug</>
    }
    const cards = items?.map((cardInfo, index) => {
        if (cardInfo.description === null) {
            return (<Card
                title={cardInfo.title}
                {...(type === "toekomstig" ? {subheading: <Badge soort="status">{cardInfo.status}</Badge>} : {})}
                heading={cardInfo.title}
                description="Deze Epic moet nog uitgewerkt worden door het team"
                href="#"
                key={index}
            ></Card>);
        }

        return (<Card
            title={cardInfo.title}
            heading={cardInfo.title}
            {...(type === "toekomstig" ? {subheading: <Badge soort="status">{cardInfo.status}</Badge>} : {})}
            description={cardInfo.description}
            metadata={`Gebruikt door: ${cardInfo.gebruikers.join(", ")}`}
            href="#"
            linkLabel="Lees meer"
            key={index}
        ></Card>);
    });
    return <>{cards}</>;
}
