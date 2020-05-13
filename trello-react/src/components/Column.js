import React from "react";
import Card from "./Card";
import "../style/column.scss";

class Column extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
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

    render() {
        return (
            <div className="column-box">
                <div className="column-header">
                    <span className="column-title">TODO: Title from JSON</span>
                    <div ref={this.container}>
                        <button
                            className="drop-btn"
                            onClick={() => this.dropdownClick()}
                        >
                            <i className="fas fa-ellipsis-v"> </i>
                        </button>
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
                    <Card />
                </div>
            </div>
        );
    }
}

export default Column;
