import React, { Component } from "react";
import { connect } from "react-redux";
import { addColumn, renameColumn } from "../actions";
import "../style/newcolumn.scss";

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

    newColumnDiv = React.createRef();

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (
            this.newColumnDiv.current &&
            !this.newColumnDiv.current.contains(event.target)
        ) {
            this.props.cancel();
        }
    };

    handleAddColumn = () => {
        const { dispatch, cancel } = this.props;
        const { newColumnTitle } = this.state;

        if (newColumnTitle) {
            dispatch(addColumn(newColumnTitle));
        }

        this.setState({
            newColumnTitle: "",
        });

        cancel();

        return;
    };

    handleRenameColumn = () => {
        const { dispatch, cancel, columnId } = this.props;
        const { newColumnTitle } = this.state;

        if (newColumnTitle) {
            dispatch(renameColumn(columnId, newColumnTitle));
        }

        this.setState({
            newColumnTitle: "",
        });

        cancel();

        return;
    };

    render() {
        const { currentTitle, rename, cancel } = this.props;
        const { newColumnTitle } = this.state;

        return (
            <div ref={this.newColumnDiv} className="new-column-header">
                <span className="new-column-title-box">
                    <input
                        autoFocus
                        type="text"
                        placeholder={
                            rename
                                ? currentTitle
                                : "Insira o título da coluna..."
                        }
                        className="new-column-title"
                        maxLength="25"
                        value={newColumnTitle}
                        onChange={this.handleTextChange}
                    />
                </span>
                <button
                    className="rename-column-btn"
                    onClick={
                        rename ? this.handleRenameColumn : this.handleAddColumn
                    }
                >
                    <i className="confirm fas fa-check"></i>
                </button>
                <button className="rename-column-btn" onClick={cancel}>
                    <i className="cancel fas fa-times"></i>
                </button>
            </div>
        );
    }
}

export default connect()(NewColumn);
