import React from "react";
import "../style/card.scss";

class Card extends React.Component {
    render() {
        const members = this.props.members;
        const tags = this.props.tags;

        return (
            <div className="card-box">
                <p className="card-text"> {this.props.text} </p>
                <div className="card-footer">
                    <span>img</span>
                    <span>tag</span>
                </div>
            </div>
        );
    }
}

export default Card;
