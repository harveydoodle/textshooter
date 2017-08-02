import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

export const Scoreboard = (props) => {
    return (
        <div>
            <div className="scoreboard topboard">
                <h4>
                    <b>{props.theme}</b>
                </h4>
                <br /><br />
                    <h6>THEME</h6>
            </div>
            <div className="scoreboard middleboard">
                <h3>
                    <b>{props.points}</b>
                </h3>
                <br /><br />
                <h6>SCORE</h6>
            </div>
                <div className="scoreboard bottomboard">
                <h3>
                    <b>{props.currentLevel + 1}</b>
                    </h3>
                    <br /><br />
                <h6>LEVEL</h6>
            </div>
        </div>
    )
}

export default Scoreboard;