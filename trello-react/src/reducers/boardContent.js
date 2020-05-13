import data from "../data/data.json";

const boardContent = (state = data.boards[0], action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default boardContent;
