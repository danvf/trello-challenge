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
        const { id, columnId, text, tags, members } = this.props;
        const { edit } = this.state;

        return (
            <div>
                {edit ? (
                    <NewCard
                        edit={true}
                        columnId={columnId}
                        cardId={id}
                        text={text}
                        tags={tags}
                        members={members}
                        cancel={this.closeEdit}
                    />
                ) : (
                    <div className="card-box">
                        <div className="card-btn-box">
                            <button
                                onClick={this.openEdit}
                                className="card-btn edit-card-btn"
                            >
                                <i className="fas fa-pen"></i>
                            </button>
                            <button
                                onClick={this.handleRemoveCard}
                                className="card-btn remove-card-btn"
                            >
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                        <p className="card-text"> {this.props.text} </p>
                        <div className="card-footer">
                            {this.props.extras}
                            <div className="card-tags">
                                {typeof this.props.tags !== "undefined" &&
                                    this.props.tags.map((tag) => (
                                        <button className="card-tag">
                                            {" "}
                                            {tag}{" "}
                                        </button>
                                    ))}
                            </div>
                            <div className="card-members">
                                {typeof this.props.members !== "undefined" &&
                                    this.props.members.map((member) => (
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
