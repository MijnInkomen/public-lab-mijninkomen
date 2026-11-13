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