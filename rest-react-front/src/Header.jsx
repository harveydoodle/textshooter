import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

export const Header = () => {
  return (
    <header>
      <h1>
        <em>T</em>
        <em>Y</em>
        <em>P</em>
        <em>E</em>
        <em className="planet right">I</em>
        <em>T</em>
      </h1>
      <p>
        <a href="mailto:linye.zhang18@gmail.com" target="_blank">
            >_ contact me
        </a><br />
        <a href="http://anniezhang.herokuapp.com/" target="_blank">
            >_ portfolio
        </a></p>
    </header>
  );
};

export default Header;