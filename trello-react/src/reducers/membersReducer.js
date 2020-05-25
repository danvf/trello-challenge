import data from "../data/data.json";

const membersReducer = (state = data.people, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default membersReducer;
