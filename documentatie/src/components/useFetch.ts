import { useEffect, useState } from "react";

export type APIResponseType = {
    "publiek": {
        "huidig": cardInfo[],
        "toekomstig": cardInfo[],
    },
    "community": {
        "roadmap": feature[],
    },
}

export type cardInfo = {
    "heading": string,
    "description": string,
    "gebruikers": string[]
    "title": string,
    "status": string,
}

export type epic = {
    name: string,
    features: feature[],
}

export type feature = {
    name: string,
    status: "In Behandeling" | "Trechter" | "PI Ready" | "Refinement",
}
export function useFetch(url: string) {
    const [data, setData] = useState<null | false | string>(null);

    useEffect(() => {
        if (!url) {
            return () => {};
        }

        async function fetchData() {
            const response = await fetch(url);
            if (!response.ok) {
                setData(false);
                throw new Error(`Something went wrong: ${response.status}`);
            }

            if (!ignore) {
                setData(await response.text());
            }
        }
        
        let ignore = false;
        fetchData()
            .catch(console.error);
        return () => {
            ignore = true;
        }
    }, [url]);
    return data;
}