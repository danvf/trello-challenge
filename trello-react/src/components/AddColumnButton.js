import React, { Component } from "react";
import Column from "./Column";
import TextareaAutosize from "react-autosize-textarea";
import { connect } from "react-redux";
import { addColumn } from "../actions";
import "../style/addcolumn.scss";

class AddColumnButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newColumnFormOpen: false,
            newColumnTitle: "",
        };
    }

    columnTitleForm = React.createRef();

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (
            this.columnTitleForm.current &&
            !this.columnTitleForm.current.contains(event.target)
        ) {
            this.setState({
                newColumnFormOpen: false,
            });
        }
    };

    openColumnForm = () => {
        this.setState({
            newColumnFormOpen: true,
        });
    };

    closeColumnForm = () => {
        this.setState({
            newColumnFormOpen: false,
        });
    };

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

        return;
    };

    renderAddButton = () => {
        const { newColumnFormOpen, newColumnTitle } = this.state;

        if (newColumnFormOpen) {
            return (
                <div ref={this.columnTitleForm}>
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
                        <button
                            onClick={this.closeColumnForm}
                            className="cancel-new-column"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>
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

export default connect()(AddColumnButton);
