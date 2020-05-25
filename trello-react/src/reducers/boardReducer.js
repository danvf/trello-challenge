import data from "../data/data.json";
import { CONSTANTS } from "../actions";

let cardID = 3;

const boardReducer = (state = data.boards[0], action) => {
    switch (action.type) {
        case CONSTANTS.ADD_CARD:
            const newCard = {
                id: cardID,
                title: action.payload.text,
                tags: action.payload.tags,
                members: action.payload.members,
            };

            cardID += 1;
            let firstColumn = true;

            const newColumns = state.columns.map((column) => {
                if (firstColumn) {
                    firstColumn = false;
                    return {
                        ...column,
                        cards: [...column.cards, newCard],
                    };
                } else {
                    return column;
                }
            });

            const newBoard = {
                ...state,
                columns: newColumns,
            };

            return newBoard;
        default:
            return state;
    }
};

export default boardReducer;
