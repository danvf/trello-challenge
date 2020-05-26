import React from "react";
import Search from "./Search";
import Column from "./Column";
import "../style/board.scss";
import AddColumnButton from "./AddColumnButton";

class Board extends React.Component {
    render() {
        const columns = this.props.columns;

        return (
            <div>
                <p className="board-title"> {this.props.title} </p>
                <Search />
                <div className="board-columns">
                    {columns.map((column) => (
                        <Column
                            key={column.id}
                            id={column.id}
                            title={column.title}
                            cards={column.cards}
                            newCol={false}
                        />
                    ))}
                    <AddColumnButton />
                </div>
            </div>
        );
    }
}

export default Board;
