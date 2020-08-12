import React, { Component } from "react";
import TextareaAutosize from "react-autosize-textarea";
import { addCard, editCard } from "../actions";
import { connect } from "react-redux";
import "../style/newcard.scss";

class NewCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectTagsOpen: false,
            selectPeopleOpen: false,
            newCardText: props.cardText !== undefined ? props.cardText : "",
            newCardTags: props.cardTags !== undefined ? props.cardTags : "",
            newCardMembers: props.cardMembers,
        };
    }

    newCardDiv = React.createRef();
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
            this.newCardDiv.current &&
            !this.newCardDiv.current.contains(event.target)
        ) {
            this.props.cancel();
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

    handleTextChange = (event) => {
        this.setState({
            newCardText: event.target.value,
        });
    };

    handleAddCard = () => {
        const { dispatch, columnId, cancel } = this.props;
        const { newCardText, newCardTags, newCardMembers } = this.state;
        if (newCardText) {
            dispatch(
                addCard(columnId, newCardText, newCardTags, newCardMembers)
            );
        }

        cancel();

        return;
    };

    handleEditCard = () => {
        const { dispatch, columnId, cardId, cancel } = this.props;
        const { newCardText, newCardTags, newCardMembers } = this.state;

        if (newCardText) {
            dispatch(
                editCard(
                    columnId,
                    cardId,
                    newCardText,
                    newCardTags,
                    newCardMembers
                )
            );
        }

        cancel();

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

        if (isMember) {
            if (this.checkMember(item)) {
                index = itemList.findIndex(
                    (member) => member.name === item.name
                );
                itemList.splice(index, 1);
            } else {
                itemList = [...itemList, item];
            }
        } else {
            if (itemList.includes(item)) {
                index = itemList.indexOf(item);
                itemList.splice(index, 1);
            } else {
                itemList = [...itemList, item];
            }
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

    checkMember(member) {
        let filteredMembers = this.props.cardMembers.filter(
            (cardMember) => cardMember.name === member.name
        );
        if (
            typeof filteredMembers !== "undefined" &&
            filteredMembers.length > 0
        ) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { edit, cardText, people, tags, cancel } = this.props;
        const {
            newCardText,
            newCardTags,
            newCardMembers,
            selectTagsOpen,
            selectPeopleOpen,
        } = this.state;

        return (
            <div ref={this.newCardDiv}>
                <div className="new-card-box">
                    <TextareaAutosize
                        autoFocus
                        placeholder={
                            edit ? cardText : "Insira aqui o texto do cartão..."
                        }
                        className="new-card-text"
                        value={newCardText}
                        onChange={this.handleTextChange}
                    />
                    <div className="new-card-footer">
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
                                                        (this.checkMember(
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
                    </div>
                </div>
                <div className="new-card-actions">
                    <button
                        onClick={
                            edit ? this.handleEditCard : this.handleAddCard
                        }
                        className="action-new-card"
                    >
                        <i className="fas fa-check"></i>
                    </button>
                    <button onClick={cancel} className="action-new-card">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    people: state.people,
    tags: state.tags,
});

export default connect(mapStateToProps)(NewCard);
