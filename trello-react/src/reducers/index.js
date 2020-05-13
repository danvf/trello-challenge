import { combineReducers } from "redux";
import boardContent from "./boardContent";

export default combineReducers({
    board: boardContent,
});
