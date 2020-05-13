import React from "react";
import Search from "./Search";
import Column from "./Column";
import "../style/board.scss";

function Board(props) {
    return (
        <div>
            <p className="board-title"> {props.title} </p>
            <Search />
            <div className="board-columns">
                <Column />
                <Column />
            </div>
        </div>
    );
}

export default Board;
