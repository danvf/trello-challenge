import React, { Component } from "react";
import TextareaAutosize from "react-autosize-textarea";
import { addCard } from "../actions";
import { connect } from "react-redux";
import "../style/newcard.scss";

class NewCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectTagsOpen: false,
            selectPeopleOpen: false,
            newCardText: "",
            newCardTags: [],
            newCardMembers: [],
        };
    }

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

        this.props.cancel();

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

    render() {
        const { people, tags, cancel } = this.props;
        const {
            newCardText,
            newCardTags,
            newCardMembers,
            selectTagsOpen,
            selectPeopleOpen,
        } = this.state;

        return (
            <div>
                <div className="new-card-box">
                    <TextareaAutosize
                        autoFocus
                        placeholder="Insira aqui o texto do cartão..."
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
                    </div>
                </div>
                <div className="new-card-actions">
                    <button
                        onClick={this.handleAddCard}
                        className="confirm-new-card"
                    >
                        Adicionar
                    </button>
                    <button onClick={cancel} className="cancel-new-card">
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
