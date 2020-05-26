import data from "../data/data.json";
import { CONSTANTS } from "../actions";

let cardID = 3;
let columnID = 4;

function findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

const boardReducer = (state = data.boards[0], action) => {
    let newCard, newColumn, newColumns, newBoard;

    switch (action.type) {
        case CONSTANTS.ADD_CARD:
            newCard = {
                id: cardID,
                parentColumnId: action.payload.parentColumnId,
                title: action.payload.text,
                tags: action.payload.tags,
                members: action.payload.members,
            };

            cardID += 1;

            newColumns = state.columns.map((column) => {
                if (column.id === newCard.parentColumnId) {
                    return {
                        ...column,
                        cards: [...column.cards, newCard],
                    };
                } else {
                    return column;
                }
            });

            newBoard = {
                ...state,
                columns: newColumns,
            };

            return newBoard;

        case CONSTANTS.ADD_COLUMN:
            newColumn = {
                id: columnID,
                title: action.payload.title,
                cards: [],
            };

            columnID += 1;

            newColumns = [...state.columns, newColumn];
            newBoard = {
                ...state,
                columns: newColumns,
            };

            return newBoard;

        case CONSTANTS.RENAME_COLUMN:
            newColumns = state.columns.map((column) => {
                if (column.id === action.payload.columnId) {
                    return {
                        ...column,
                        title: action.payload.newTitle,
                    };
                } else {
                    return column;
                }
            });
            newBoard = {
                ...state,
                columns: newColumns,
            };

            return newBoard;

        case CONSTANTS.REMOVE_COLUMN:
            let removeColumnId = action.payload.columnId;
            let removeIndex = findWithAttr(state.columns, "id", removeColumnId);
            newColumns = state.columns;
            newColumns.splice(removeIndex, 1);
            newBoard = {
                ...state,
                columns: newColumns,
            };
            return newBoard;

        default:
            return state;
    }
};

export default boardReducer;
