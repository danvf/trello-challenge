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

export const removeCard = (parentColumnId, cardId) => {
    return {
        type: CONSTANTS.REMOVE_CARD,
        payload: {
            parentColumnId,
            cardId,
        },
    };
};

export const editCard = (
    parentColumnId,
    cardId,
    newText,
    newTags,
    newMembers
) => {
    return {
        type: CONSTANTS.EDIT_CARD,
        payload: {
            parentColumnId,
            cardId,
            newText,
            newTags,
            newMembers,
        },
    };
};
