import React from "react";
import data from "../data/data.json";
import Board from "./Board";
import { connect } from "react-redux";
import "../style/app.scss";

class App extends React.Component {
    render() {
        const { board } = this.props;

        return (
            <div className="app">
                <button onClick={() => this.doTest()}>debug</button>
                <Board title={board.title} columns={board.columns} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    board: state.board,
});

export default connect(mapStateToProps)(App);
