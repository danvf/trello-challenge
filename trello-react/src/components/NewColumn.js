import React, { Component } from "react";
import Column from "./Column";
import { connect } from "react-redux";
import { addColumn } from "../actions";
import "../style/newcolumn.scss";

import TextareaAutosize from "react-autosize-textarea";

class NewColumn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newColumnTitle: "",
        };
    }

    handleTextChange = (event) => {
        this.setState({
            newColumnTitle: event.target.value,
        });
    };

    handleAddColumn = () => {
        const { dispatch } = this.props;
        const { newColumnTitle } = this.state;

        if (newColumnTitle) {
            dispatch(addColumn(newColumnTitle));
        }

        this.setState({
            newColumnTitle: "",
            newColumnFormOpen: false,
        });

        this.props.cancel();

        return;
    };

    render() {
        const { cancel } = this.props;
        const { newColumnTitle } = this.state;

        return (
            <div>
                <Column
                    title={
                        <div className="new-column-header">
                            <TextareaAutosize
                                autoFocus
                                placeholder="Insira o título da coluna..."
                                className="new-column-text"
                                value={newColumnTitle}
                                onChange={this.handleTextChange}
                            />
                        </div>
                    }
                    cards={[]}
                    inactivateOptions={true}
                />
                <div className="new-column-actions">
                    <button
                        onClick={this.handleAddColumn}
                        className="confirm-new-column"
                    >
                        Adicionar
                    </button>
                    <button onClick={cancel} className="cancel-new-column">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>
        );
    }
}

export default connect()(NewColumn);
