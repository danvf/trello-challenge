import React from "react";
import NewCard from "./NewCard";
import { removeCard } from "../actions";
import { connect } from "react-redux";
import "../style/card.scss";

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
        };
    }

    openEdit = () => {
        this.setState({
            edit: true,
        });
    };

    closeEdit = () => {
        this.setState({
            edit: false,
        });
    };

    handleRemoveCard = () => {
        const { dispatch, columnId, id } = this.props;
        dispatch(removeCard(columnId, id));
        return;
    };

    render() {
        const { id, columnId, cardText, cardTags, cardMembers } = this.props;
        const { edit } = this.state;

        return (
            <div>
                {edit ? (
                    <NewCard
                        edit={true}
                        columnId={columnId}
                        cardId={id}
                        cardText={cardText}
                        cardTags={cardTags}
                        cardMembers={cardMembers}
                        cancel={this.closeEdit}
                    />
                ) : (
                    <div className="card-box">
                        <div className="card-btn-box">
                            <button
                                onClick={this.openEdit}
                                className="card-btn"
                            >
                                <i className="fas fa-pen"></i>
                            </button>
                            <button
                                onClick={this.handleRemoveCard}
                                className="card-btn"
                            >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                        <p className="card-text"> {this.props.cardText} </p>
                        <div className="card-footer">
                            {this.props.extras}
                            <div className="card-extra-box">
                                {typeof cardTags !== "undefined" &&
                                    cardTags.map((tag) => (
                                        <button className="card-tag">
                                            {" "}
                                            {tag}{" "}
                                        </button>
                                    ))}
                            </div>
                            <div className="card-extra-box">
                                {typeof cardMembers !== "undefined" &&
                                    cardMembers.map((member) => (
                                        <img
                                            className="member-img"
                                            alt="card member"
                                            src={member.photoURL}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default connect()(Card);
