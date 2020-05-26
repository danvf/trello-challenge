import React, { Component } from "react";
import Card from "./Card";
import TextareaAutosize from "react-autosize-textarea";
import "../style/addcard.scss";
import { connect } from "react-redux";
import { addCard } from "../actions";

class AddCardButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newCardFormOpen: false,
            selectTagsOpen: false,
            selectPeopleOpen: false,
            newCardText: "",
            newCardTags: [],
            newCardMembers: [],
        };
    }

    cardTextForm = React.createRef();
    cardPeopleForm = React.createRef();
    cardTagsForm = React.createRef();

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (
            this.cardTextForm.current &&
            !this.cardTextForm.current.contains(event.target)
        ) {
            this.setState({
                newCardFormOpen: false,
                selectPeopleOpen: false,
                selectTagsOpen: false,
            });
        }

        if (
            this.cardPeopleForm.current &&
            !this.cardPeopleForm.current.contains(event.target)
        ) {
            this.setState({
                selectPeopleOpen: false,
            });
        }

        if (
            this.cardTagsForm.current &&
            !this.cardTagsForm.current.contains(event.target)
        ) {
            this.setState({
                selectTagsOpen: false,
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

    handleTextChange = (event) => {
        this.setState({
            newCardText: event.target.value,
        });
    };

    handleAddCard = () => {
        const { dispatch, columnID } = this.props;
        const { newCardText, newCardTags, newCardMembers } = this.state;

        if (newCardText) {
            dispatch(
                addCard(columnID, newCardText, newCardTags, newCardMembers)
            );
        }

        this.setState({
            newCardText: "",
            newCardMembers: [],
            newCardTags: [],
            newCardFormOpen: false,
        });

        return;
    };

    openSelectItems = (event) => {
        const buttonId = event.target.id;
        switch (buttonId) {
            case "peopleBtn":
                this.setState({
                    selectPeopleOpen: !this.state.selectPeopleOpen,
                });
                break;
            case "tagBtn":
                this.setState({
                    selectTagsOpen: !this.state.selectTagsOpen,
                });
                break;
            default:
                break;
        }
    };

    handleSelectItems = (event, item) => {
        const isMember = typeof item === "object";
        let index = 0;
        let itemList = isMember
            ? [...this.state.newCardMembers]
            : [...this.state.newCardTags];

        if (itemList.includes(item)) {
            index = itemList.indexOf(item);
            itemList.splice(index, 1);
        } else {
            itemList = [...itemList, item];
        }

        if (isMember) {
            this.setState({
                newCardMembers: itemList,
            });
        } else {
            this.setState({
                newCardTags: itemList,
            });
        }

        event.target.classList.toggle("active-item");
    };

    renderAddButton = () => {
        const { people, tags } = this.props;
        const {
            newCardFormOpen,
            newCardText,
            newCardTags,
            newCardMembers,
            selectPeopleOpen,
            selectTagsOpen,
        } = this.state;

        if (newCardFormOpen) {
            return (
                <div ref={this.cardTextForm}>
                    <Card
                        text={
                            <TextareaAutosize
                                autoFocus
                                placeholder="Insira aqui o texto do cartão..."
                                className="new-card-text"
                                value={newCardText}
                                onChange={this.handleTextChange}
                            />
                        }
                        extras={
                            <div className="new-card-extras">
                                <div
                                    className="chosen-items"
                                    ref={this.cardTagsForm}
                                >
                                    <button className="item-counter">
                                        {newCardTags.length}
                                    </button>
                                    <button
                                        id="tagBtn"
                                        onClick={this.openSelectItems}
                                        className="add-extra"
                                    >
                                        <i className="fas fa-tags" />
                                    </button>
                                    {selectTagsOpen && (
                                        <div className="select-content">
                                            <div className="items-available">
                                                {tags.map((tag) => (
                                                    <button
                                                        onClick={(e) =>
                                                            this.handleSelectItems(
                                                                e,
                                                                tag
                                                            )
                                                        }
                                                        className={
                                                            "card-tag" +
                                                            (newCardTags.includes(
                                                                tag
                                                            )
                                                                ? " active-item"
                                                                : "")
                                                        }
                                                    >
                                                        {tag}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className="chosen-items"
                                    ref={this.cardPeopleForm}
                                >
                                    <button className="item-counter">
                                        {newCardMembers.length}
                                    </button>
                                    <button
                                        id="peopleBtn"
                                        ref={this.cardPeopleForm}
                                        onClick={this.openSelectItems}
                                        className="add-extra"
                                    >
                                        <i className="fas fa-user-plus" />
                                    </button>
                                    {selectPeopleOpen && (
                                        <div className="select-content">
                                            <div className="items-available">
                                                {people.map((member) => (
                                                    <img
                                                        onClick={(e) =>
                                                            this.handleSelectItems(
                                                                e,
                                                                member
                                                            )
                                                        }
                                                        className={
                                                            "member-img" +
                                                            (newCardMembers.includes(
                                                                member
                                                            )
                                                                ? " active-item"
                                                                : "")
                                                        }
                                                        alt="card member option"
                                                        src={member.photoURL}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        }
                    />
                    <div className="new-card-actions">
                        <button
                            onClick={() => this.handleAddCard()}
                            className="confirm-new-card"
                        >
                            Adicionar
                        </button>
                        <button
                            onClick={() => this.closeCardForm()}
                            className="cancel-new-card"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
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

const mapStateToProps = (state) => ({
    people: state.people,
    tags: state.tags,
});

export default connect(mapStateToProps)(AddCardButton);
