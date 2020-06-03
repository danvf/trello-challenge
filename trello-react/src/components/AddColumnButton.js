import React, { Component } from "react";
import NewColumn from "./NewColumn";
import "../style/addcolumn.scss";

class AddColumnButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newColumnFormOpen: false,
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

    renderAddButton = () => {
        const { newColumnFormOpen } = this.state;

        if (newColumnFormOpen) {
            return (
                <div ref={this.columnTitleForm}>
                    <NewColumn
                        title=""
                        cards={[]}
                        cancel={this.closeColumnForm}
                    />
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

export default AddColumnButton;
