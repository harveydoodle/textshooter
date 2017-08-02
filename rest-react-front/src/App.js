import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Scoreboard from './Scoreboard';
import Header from './Header';
import MainScreen from './MainScreen';
import { arrayOfArray, themes } from './Constants';
import './App.css';
import 'animate.css';

console.log("follow my dog on Instagram: instagram.com/harveydroolmonster");

// Game begins on refresh 
// Game display
class App extends Component {
  constructor() {
    super();
    this.typedWord = '';
    this.state = {
      wordsArray: [],
      animation: [],
      bouncing: [],
      position: { left: 0 },
      top: [],
      points: 0,
      counter: 0,
      winOpacity: 0,
      loseOpacity: 0,
      finalOpacity: 0,
      levelComplete: false,
      level: 0,
      timeCounter: 0,
      currentLevel: 0,
      theme: '',
    };
    this.detectWord = this.detectWord.bind(this);
    this.wordMatch = this.wordMatch.bind(this);
    this.tick = this.tick.bind(this);
    this.resetState = this.resetState.bind(this);

    // Create starting states for empty arrays
    for (let i = 0; i < 10; i++) {
      this.state.top.push({ top: 0 });
      this.state.animation.push(`animateWord${i}`);
      this.state.bouncing.push('');
    }
  }

  // When page mounts, event handler will run
  componentDidMount() {
    window.addEventListener('keypress', this.detectWord);
    setInterval(() => { this.tick(); }, 1000);
    this.setState({
      wordsArray: arrayOfArray[0],
      theme: themes[0],
    });
  }

  // Keeps a counter (every 15 seconds) to control changing levels 
  tick() {
    this.setState({
      timeCounter: this.state.timeCounter + 1,
    });
  }

  componentDidUpdate() {
    // If user passed the level
    if ((this.state.counter === 10 && this.state.timeCounter === 15) || (this.state.counter > 5 && this.state.timeCounter === 15)) {
      // If user is at level 0 or 1, and they pass it
      if (this.state.levelComplete === false && (this.state.level === 0 || this.state.level === 1)) {
        this.setState({
          winOpacity: 1,
          levelComplete: true,
          level: this.state.level + 1,
        });
      }
      // If user is at level 2, and they pass it
      else if (this.state.level === 2 && this.state.levelComplete === false) {
        this.setState({
          finalOpacity: 1,
          levelComplete: false,
          level: this.state.level + 1,
        });
      }
      // If we just finished level 0, proceed to level 1
      if ((this.state.level === 1 || this.state.level === 2) && this.state.levelComplete) {
        this.resetState(this.state.level);
      }
    }
    // Otherwise if they lose
    else if (this.state.counter < 6 && this.state.timeCounter === 15) {
      this.setState({
        loseOpacity: 1,
        timeCounter: 0,
      });
    }
  }

  // If we just finished a level, proceed to next level
  resetState(level) {
    // reset the game state for a new level
    const animation = [];
    const bouncing = [];
    const top = [];

    for (let i = 0; i < 10; i++) {
      top.push({ top:0 });
      animation.push(`animateWord${i}`);
      bouncing.push('');
    }

    this.setState({
      timeCounter: 0,
      loseOpacity: 0,
      counter: 0,
      wordsArray: this.arrayOfArray[level],
      animation,
      bouncing,
      top,
      levelComplete: false,
      currentLevel: level,
      theme: this.themes[level],
    });

    setTimeout(
      () => {
        this.setState({
          winOpacity: 0,
        });
      }, 1500);
  }

  // Matches typed word to given word in array
  wordMatch(word) { // word = word at each index of array.findIndex() below
    if (this.typedWord.includes(word)) return true;
  }

  // Detects character user types on keyboard and concats its in state
  detectWord(e) {
    const array = this.state.wordsArray;
    const newArray = this.state.top; // Resets each time
    const falling = '';
    const newFall = this.state.animation;
    const bounce = 'animated bounceOut';
    const newAnim = this.state.bouncing;
    const c = String.fromCharCode(e.keyCode);

    // Can sense the character user types and match lowercase version
    this.typedWord = (this.typedWord += c.toLowerCase());
    const match = array.findIndex(this.wordMatch); // match = index of word user types

    if (match > -1) {
      this.typedWord = '';
      const refName = `word${match}`;

      // Gets the location of word user types
      const aimWord = ReactDOM.findDOMNode(this.refs[`${refName}`]);
      const wordLocation = aimWord.getBoundingClientRect();
      const topPos = { top: wordLocation.top + 50 };
      // Updates the array depending on word user types for animation purposes
      newArray.splice(match, 1, topPos);
      newAnim.splice(match, 1, bounce);
      newFall.splice(match, 1, falling);

      this.setState({
        top: newArray,
        bouncing: newAnim,
        animation: newFall,
        points: this.state.points + this.state.wordsArray[match].length,
        counter: this.state.counter + 1,
      });
    }
  }

  render() {
    const renderedArray = this.state.wordsArray.map((word, i) => {
      return <div ref={`word${i}`} key={i} className={`position${i} set ${this.state.bouncing[i]}`} style={this.state.top[i]} id={this.state.animation[i]} >{word}</div>;
    });

    return (<div className="screen">
      <Header />
      <MainScreen
        renderedArray={renderedArray}
        winOpacity={this.state.winOpacity}
        loseOpacity={this.state.loseOpacity}
        finalOpacity={this.state.finalOpacity}
      />
      <Scoreboard
        theme={this.state.theme}
        points={this.state.points}
        currentLevel={this.state.currentLevel}
      />
    </div>
    );
  }
}

export default App;
