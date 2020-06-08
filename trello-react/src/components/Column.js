import React from "react";
import Card from "./Card";
import AddCardButton from "./AddCardButton";
import "../style/column.scss";
import { connect } from "react-redux";
import { removeColumn } from "../actions";
import NewColumn from "./NewColumn";

class Column extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            rename: false,
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

    dropdownClick = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
    };

    handleRemoveColumn = () => {
        const { dispatch, id } = this.props;
        dispatch(removeColumn(id));
        return;
    };

    openRename = () => {
        this.setState({ rename: true });
    };

    closeRename = () => {
        this.setState({ rename: false, dropdownOpen: false });
    };

    render() {
        const { id, title, cards } = this.props;
        const { rename, dropdownOpen } = this.state;

        return (
            <div>
                <div className="column-box">
                    {rename ? (
                        <NewColumn
                            columnId={id}
                            currentTitle={title}
                            rename={true}
                            cancel={this.closeRename}
                        />
                    ) : (
                        <div className="column-header">
                            <span className="column-title">{title}</span>
                            <div ref={this.container}>
                                <button
                                    className="drop-btn"
                                    onClick={this.dropdownClick}
                                >
                                    <i className="fas fa-ellipsis-v"> </i>
                                </button>
                                {dropdownOpen && (
                                    <div className="drop-btn-content">
                                        <li onClick={this.openRename}>
                                            {" "}
                                            Renomear{" "}
                                        </li>
                                        <hr />
                                        <li onClick={this.handleRemoveColumn}>
                                            {" "}
                                            Excluir{" "}
                                        </li>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="column-body">
                        {cards.map((card) => (
                            <Card
                                key={card.id}
                                id={card.id}
                                columnId={this.props.id}
                                text={card.title}
                                tags={card.tags}
                                members={card.members}
                            />
                        ))}
                        <AddCardButton columnId={this.props.id} />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(Column);
