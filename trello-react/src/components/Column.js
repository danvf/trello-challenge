import React from "react";
import Card from "./Card";
import AddCardButton from "./AddCardButton";
import "../style/column.scss";
import { connect } from "react-redux";
import { removeColumn } from "../actions";

class Column extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            firstColumn: this.props.id === 1,
        };
    }

    container = React.createRef();

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (
            this.container.current &&
            !this.container.current.contains(event.target)
        ) {
            this.setState({
                dropdownOpen: false,
            });
        }
    };

    dropdownClick() {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
    }

    handleRemoveColumn = () => {
        const { dispatch, id } = this.props;
        dispatch(removeColumn(id));
        return;
    };

    render() {
        const { cards } = this.props;

        return (
            <div className="column-box">
                <div className="column-header">
                    <span className="column-title">{this.props.title}</span>
                    <div ref={this.container}>
                        {this.props.newCol === false && (
                            <button
                                className="drop-btn"
                                onClick={() => this.dropdownClick()}
                            >
                                <i className="fas fa-ellipsis-v"> </i>
                            </button>
                        )}
                        {this.state.dropdownOpen && (
                            <div className="drop-btn-content">
                                <li> Renomear </li>
                                <hr />
                                <li onClick={this.handleRemoveColumn}>
                                    {" "}
                                    Excluir{" "}
                                </li>
                            </div>
                        )}
                    </div>
                </div>
                <div className="column-body">
                    {cards.map((card) => (
                        <Card
                            key={card.id}
                            id={card.id}
                            text={card.title}
                            tags={card.tags}
                            members={card.members}
                        />
                    ))}
                    {this.props.newCol === false && (
                        <AddCardButton columnID={this.props.id} />
                    )}
                </div>
            </div>
        );
    }
}

export default connect()(Column);
