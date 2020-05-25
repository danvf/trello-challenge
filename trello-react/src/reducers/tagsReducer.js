import data from "../data/data.json";

const tagsReducer = (state = data.tags, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default tagsReducer;
