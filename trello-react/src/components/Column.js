import React from "react";
import Card from "./Card";
import AddCardButton from "./AddCardButton";
import "../style/column.scss";

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

    renderColumnHeader = () => {
        if (this.props.newColumn) {
            return;
        } else {
            return (
                <button
                    className="drop-btn"
                    onClick={() => this.dropdownClick()}
                >
                    <i className="fas fa-ellipsis-v"> </i>
                </button>
            );
        }
    };

    render() {
        const cards = this.props.cards;

        return (
            <div className="column-box">
                <div className="column-header">
                    <span className="column-title">{this.props.title}</span>
                    <div ref={this.container}>
                        {this.renderColumnHeader}
                        {this.state.dropdownOpen && (
                            <div className="drop-btn-content">
                                <li> Renomear </li>
                                <hr />
                                <li> Excluir </li>
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
                    {this.state.firstColumn && (
                        <AddCardButton columnID={this.props.id} />
                    )}
                </div>
            </div>
        );
    }
}

export default Column;
