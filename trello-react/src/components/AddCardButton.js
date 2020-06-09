import React, { Component } from "react";
import NewCard from "./NewCard";
import "../style/addcard.scss";

class AddCardButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newCardFormOpen: false,
        };
    }

    newCardForm = React.createRef();

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (
            this.newCardForm.current &&
            !this.newCardForm.current.contains(event.target)
        ) {
            this.setState({
                newCardFormOpen: false,
            });
        }
    };

    openCardForm = () => {
        this.setState({
            newCardFormOpen: true,
        });
    };

    closeCardForm = () => {
        this.setState({
            newCardFormOpen: false,
        });
    };

    renderAddButton = () => {
        const { columnId } = this.props;
        const { newCardFormOpen } = this.state;

        if (newCardFormOpen) {
            return (
                <div ref={this.newCardForm}>
                    <NewCard
                        edit={false}
                        columnId={columnId}
                        cardText=""
                        cardTags={[]}
                        cardMembers={[]}
                        cancel={this.closeCardForm}
                    />
                </div>
            );
        } else {
            return (
                <button onClick={this.openCardForm} className="new-card-btn">
                    <i className="fas fa-plus" /> Task
                </button>
            );
        }
    };

    render() {
        return this.renderAddButton();
    }
}

export default AddCardButton;
