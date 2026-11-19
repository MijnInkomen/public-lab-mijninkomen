import { Card } from "@rijkshuisstijl-community/card-react";
import { Badge } from '../home/Badge';
import { useState, useCallback, useEffect } from "react";

export type APIResponseType = {
    "huidig": cardInfo[],
    "toekomstig": cardInfo[],
};

export type cardInfo = {
    "title": string,
    "description": string,
    "labels": string[]
    "gebruikers": string[]
    "status": string,
    isOpen: boolean,
};

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
    const [epics, setEpics] = useState<null | false | APIResponseType[typeof type]>(null);
    const haalOp = useCallback(async () => {
        try {
            const response = await fetch(`/api/roadmap/publiek/${type}`);
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
    
    if (epics === null) {
        return <b>Informatie laden...</b>;
    }
    
    if (epics === false) {
        return <>Iets ging er mis met het ophalen van de informatie, probeer later opnieuw</>;
    }

    if (epics.length === 0) {
        return <>In de toekomst komen hier meer ontwikkelingen te staan, kom later terug</>
    }
    const cards = epics?.map((cardInfo, index) => {
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
