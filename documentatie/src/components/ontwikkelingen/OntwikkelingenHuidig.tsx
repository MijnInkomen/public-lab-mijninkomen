import { Card } from '@components/card/card';
import type { APIResponseType } from './apiTypes';
import { useEffect, useState } from 'react';

export function OntwikkelingenHuidig() {
    const [json, setJson] = useState<null | APIResponseType>(null);

    useEffect(() => {
        async function fetchOntwikkelingen() {
            const data = await fetch("/api/roadmap");
            const parsed = await data.json();
            setJson(parsed);
        }

        fetchOntwikkelingen()
            .catch(console.error);
    });

    if (!json) {
        return <b>Loading data...</b>;
    }

    const cards = json.publiek.huidig.map((cardInfo, index) => {
        return (<Card
            description={cardInfo.description}
            heading={cardInfo.heading}
            href="#"
            metadata={`Gebruikt door: ${cardInfo.gebruikers.join(", ")}`}
            title={cardInfo.heading}
            linkLabel="Lees meer"
            key={index}
        ></Card>)
    });
    return <>{cards}</>;
}