import React, { Component } from "react";
import Column from "./Column";
import TextareaAutosize from "react-autosize-textarea";
import "../style/addcolumn.scss";

class AddColumnButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newColumnFormOpen: false,
            newColumnTitle: "",
        };
    }

    openColumnForm = () => {
        this.setState({
            newColumnFormOpen: true,
        });
    };

    handleTextChange = (event) => {
        this.setState({
            newColumnTitle: event.target.value,
        });
    };

    renderAddButton = () => {
        const { newColumnFormOpen, newColumnTitle } = this.state;

        if (newColumnFormOpen) {
            return (
                <Column
                    title={
                        <div className="new-column-header">
                            <TextareaAutosize
                                autoFocus
                                placeholder="Título da Coluna"
                                className="new-column-text"
                                value={this.state.newCardText}
                                onChange={this.handleTextChange}
                            />
                            <div className="new-column-actions">
                                <button
                                    onClick={this.handleAddColumn}
                                    className="confirm-new-column"
                                >
                                    Adicionar
                                </button>
                                <button
                                    onClick={this.closeColumnForm}
                                    className="cancel-new-column"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                    }
                    cards={[]}
                    newColumn={true}
                />
            );
        } else {
            return (
                <button
                    onClick={this.openColumnForm}
                    className="new-column-btn"
                >
                    <i className="fas fa-plus" /> Coluna
                </button>
            );
        }
    };

    render() {
        return this.renderAddButton();
    }
}

export default AddColumnButton;
