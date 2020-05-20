import React from "react";
import Search from "./Search";
import Column from "./Column";
import "../style/board.scss";

class Board extends React.Component {
    render() {
        const columns = this.props.columns;

        return (
            <div>
                <p className="board-title"> {this.props.title} </p>
                <Search />
                <div className="board-columns">
                    {columns.map((column) => (
                        <Column title={column.title} cards={column.cards} />
                    ))}
                </div>
            </div>
        );
    }
}

export default Board;
