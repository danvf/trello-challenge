import React from "react";
import "../style/card.scss";

class Card extends React.Component {
    render() {
        return (
            <div className="card-box">
                <button className="edit-card-btn">
                    <i class="fas fa-pen"></i>
                </button>
                <p className="card-text"> {this.props.text} </p>
                <div className="card-footer">
                    {this.props.extras}
                    <div className="card-tags">
                        {typeof this.props.tags !== "undefined" &&
                            this.props.tags.map((tag) => (
                                <button className="card-tag"> {tag} </button>
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
        );
    }
}

export default Card;
