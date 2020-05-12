import React from "react";
import Card from "./Card";

function Column() {
    return (
        <div className="column-box">
            <div className="column-header">
                <span> TODO: Import column title from JSON </span>
            </div>
            <div className="column-body">
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
}

export default Column;
