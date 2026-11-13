import { Card } from '@components/card/card';
import { useFetch } from '../useFetch';

export function OntwikkelingenHuidig() {
    const json = useFetch("/api/roadmap");
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

    // const [json, setJson] = useState<null | APIResponseType>(null);

    // useEffect(() => {
    //     async function fetchOntwikkelingen() {
    //         const response = await fetch("/api/roadmap");
    //         if (!response.ok) {
    //             throw new Error(`Something went wrong: ${response.status}`);
    //         }

    //         const parsed = await response.json();
    //         if (!ignore) {
    //             setJson(parsed);
    //         }
    //     }
        
    //     let ignore = false;
    //     fetchOntwikkelingen()
    //         .catch(console.error);
    //     return () => {
    //         ignore = true;
    //     }
    // }, []);
