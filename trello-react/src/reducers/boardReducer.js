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
    let removeIndex,
        editCardId,
        editCardIndex,
        editColumnId,
        editColumnIndex,
        removeCardId,
        removeCardIndex,
        removeColumnId,
        removeColumnIndex,
        newCard,
        newColumn,
        newCards,
        newColumns,
        newBoard;

    switch (action.type) {
        case CONSTANTS.ADD_CARD:
            newCard = {
                id: cardID,
                title: action.payload.text,
                tags: action.payload.tags,
                members: action.payload.members,
            };

            cardID += 1;

            newColumns = state.columns.map((column) => {
                if (column.id === action.payload.parentColumnId) {
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

        case CONSTANTS.REMOVE_CARD:
            removeColumnId = action.payload.parentColumnId;
            removeColumnIndex = findWithAttr(
                state.columns,
                "id",
                removeColumnId
            );
            removeCardId = action.payload.cardId;
            removeCardIndex = findWithAttr(
                state.columns[removeColumnIndex].cards,
                "id",
                removeCardId
            );

            newCards = [...state.columns[removeColumnIndex].cards];
            newCards.splice(removeCardIndex, 1);

            newBoard = { ...state };
            newBoard.columns[removeColumnIndex].cards = newCards;

            return newBoard;

        case CONSTANTS.EDIT_CARD:
            newCard = {
                id: action.payload.cardId,
                title: action.payload.newText,
                tags: action.payload.newTags,
                members: action.payload.newMembers,
            };

            editColumnId = action.payload.parentColumnId;
            editColumnIndex = findWithAttr(state.columns, "id", editColumnId);
            editCardId = action.payload.cardId;
            editCardIndex = findWithAttr(
                state.columns[editColumnIndex].cards,
                "id",
                editCardId
            );

            newCards = [...state.columns[editColumnIndex].cards];
            newCards[editCardIndex] = newCard;

            newBoard = { ...state };
            newBoard.columns[editColumnIndex].cards = newCards;

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
            removeColumnId = action.payload.columnId;
            removeIndex = findWithAttr(state.columns, "id", removeColumnId);
            newColumns = [...state.columns];
            console.log("newColumns: ");
            console.log(newColumns);
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
