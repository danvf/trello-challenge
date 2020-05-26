import { CONSTANTS } from "../actions";

export const addColumn = (columnTitle) => {
    return {
        type: CONSTANTS.ADD_COLUMN,
        payload: {
            title: columnTitle,
        },
    };
};

export const renameColumn = (columnId, newTitle) => {
    return {
        type: CONSTANTS.RENAME_COLUMN,
        payload: {
            columnId,
            newTitle,
        },
    };
};

export const removeColumn = (columnId) => {
    return {
        type: CONSTANTS.REMOVE_COLUMN,
        payload: {
            columnId,
        },
    };
};
