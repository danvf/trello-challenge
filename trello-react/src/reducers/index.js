import { combineReducers } from "redux";
import boardReducer from "./boardReducer";
import membersReducer from "./membersReducer";
import tagsReducer from "./tagsReducer";

export default combineReducers({
    board: boardReducer,
    people: membersReducer,
    tags: tagsReducer,
});
