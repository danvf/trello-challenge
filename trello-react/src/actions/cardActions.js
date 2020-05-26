import { CONSTANTS } from "../actions";

export const addCard = (parentColumnId, text, tags, members) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: {
            parentColumnId,
            text,
            tags,
            members,
        },
    };
};
