import { useEffect, useState } from "react";

// TODO: EXPIREMENT TYPING, CHANGE LATER
export type huidigeCard = {
    "heading": string,
    "description": string,
    "gebruikers": string[]
};

export type toekomstigeCard = huidigeCard | {
    "title": string,
    "status": string,
}

export type APIResponseType = {
    "publiek": {
        "huidig": huidigeCard[],
        "toekomstig": toekomstigeCard[],
    },
    "roadmap": null[]
}

export function useFetch(url: string) {
    const [json, setJson] = useState<null | APIResponseType>(null);
    useEffect(() => {
        if (!url) {
            return () => {};
        }

        async function fetchOntwikkelingen() {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Something went wrong: ${response.status}`);
            }

            const parsed = await response.json();
            if (!ignore) {
                setJson(parsed);
            }
        }
        
        let ignore = false;
        fetchOntwikkelingen()
        .catch(console.error);
        return () => {
            ignore = true;
        }
    }, [url]);
    return json;
}