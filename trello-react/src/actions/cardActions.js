import { CONSTANTS } from "../actions";

export const addCard = (parentColumnID, text, tags, members) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: {
            parentColumnID,
            text,
            tags,
            members,
        },
    };
};
