import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

export const MainScreen = (props) => {
  return (
    <div className="game button red text-blanco text-shadow-negra">
      {props.renderedArray}
      <h2 className={props.winOpacity > 0 ? 'animated flash popup passLevel' : 'noShow'}>
        Next Level
      </h2>
      <h2 className={props.loseOpacity > 0 ? 'animated hinge popup gameOver' : 'noShow'}>
        Game Over
      </h2>
      <h2 className={props.finalOpacity > 0 ? 'animated wobble popup harveyEnd' : 'noShow'}>
        <img src="harvey.png" alt="goldendoodle"/>
      </h2>
    </div>
  );
};

export default MainScreen;
