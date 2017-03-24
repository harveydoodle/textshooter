import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import 'animate.css';

console.log("Made by ANNIE :D linye.zhang18@gmail.com holla");

// game display
class App extends Component {
  constructor() {
    super();
    this.typedWord = '';
    this.state = {
      scoreboard: [], // top 5 players' scores, put object in array? or make separate array for players' names
      wordsArray: [],
      animation: [],
      bouncing: [],
      position: {left: 0},
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
      theme: ''
    };
    this.detectWord = this.detectWord.bind(this);
    this.wordMatch = this.wordMatch.bind(this);
    this.tick = this.tick.bind(this);
    this.resetState = this.resetState.bind(this);

    this.arrayOfArray = [
        ['will','thuy','daniel','jin','ian','jonathan','alex','brad','mandy','rares'],
        ['react','javascript','console','postgres','render','loop','brainstation','angular','ruby','ocaml'],
        ['goldendoodle','beagle','corgi','dachshund','husky','samoyed','greyhound','malamute','bulldog','rottweiler']
    ]
    this.themes = ['BrainStation Instructors','Programming','Dog Breeds']

    for (let i = 0; i < 10; i++) {
      this.state.top.push({top:0});
      this.state.animation.push(`animateWord${i}`);
      this.state.bouncing.push('');
    }
  }

  // when page mounts, event handler will run
  componentDidMount() {
    window.addEventListener('keypress', this.detectWord);
    setInterval(()=>{this.tick()}, 1000);
    this.setState({
      wordsArray: this.arrayOfArray[0],
      theme: this.themes[0]
    })
  }

  tick () {
    this.setState({
      timeCounter: this.state.timeCounter + 1
    })
  }

  /* 
    if timeCounter == done)
      if(won game)

      else if(lost game)

    if we are:
      - reset game state
      - check if levelComplete and set up next level
      - 
  */

  componentDidUpdate() {
    // if user passed the level
    if ((this.state.counter === 10 && this.state.timeCounter === 15) || (this.state.counter > 5 && this.state.timeCounter === 15)) {
          // if user is at level 0 or 1, and they pass it
          if (this.state.levelComplete === false && (this.state.level === 0 || this.state.level === 1)) {
            this.setState({
              winOpacity: 1,
              levelComplete: true,
              level: this.state.level + 1
            })
          }
          // if user is at level 2, and they pass it
          else if (this.state.level === 2 && this.state.levelComplete === false) {
            this.setState({
              finalOpacity: 1,
              levelComplete: false,
              level: this.state.level + 1
            })
          }

          // if we just finished level 0, proceed to level 1
          if ((this.state.level === 1 || this.state.level === 2) && this.state.levelComplete) {
            this.resetState(this.state.level);
          }
    }
    // otherwise if we lose
    else if (this.state.counter < 6 && this.state.timeCounter === 15) {
        this.setState({
          loseOpacity: 1,
          timeCounter: 0
        })
    }
  }

  // if we just finished a level, proceed to next level
  resetState(level) {
    // reset the game state for a new level
    let animation = [];
    let bouncing = [];
    let top = [];
    let wordsArray = this.arrayOfArray[level];
    // let theme = this.themes[level];

    for (let i = 0; i < 10; i++) {
      top.push({top:0});
      animation.push(`animateWord${i}`);
      bouncing.push('');
    }
    this.setState({
      timeCounter: 0,
      loseOpacity: 0,
      counter: 0,
      wordsArray: this.arrayOfArray[level],
      animation: animation,
      bouncing: bouncing,
      top: top,
      levelComplete: false,
      currentLevel: level,
      theme: this.themes[level]
    });
    
    setTimeout(
      () => {
        this.setState({
          winOpacity: 0
        })
      }, 1500)
  }

  // matches typed word to given word in array
  wordMatch(word) { // word = word at each index of array.findIndex() below
    if (this.typedWord.includes(word)) return true;
  }

  // detects character user types on keyboard and concats its in state
  detectWord(e) {
    const array       = this.state.wordsArray;
    // const topPos      = {top: 0};

    const newArray    = this.state.top; // resets each time
    const falling     = '';
    const newFall     = this.state.animation;
    const bounce      = 'animated bounceOut';
    const newAnim     = this.state.bouncing;
    const c           = String.fromCharCode(e.keyCode);

    this.typedWord    = (this.typedWord += c.toLowerCase());
    let match         = array.findIndex(this.wordMatch); // match = index of word user types

    if (match > -1) {
      this.typedWord  = '';
      let refName     = `word${match}`;
      
      // gets the location of word user types
      let aimWord       = ReactDOM.findDOMNode(this.refs[`${refName}`]);
      let wordLocation  = aimWord.getBoundingClientRect();
      let topPos        = {top: wordLocation.top + 50};
      newArray.splice(match, 1, topPos);
      newAnim.splice(match, 1, bounce);
      newFall.splice(match, 1, falling);

      this.setState({
        top: newArray,
        bouncing: newAnim,
        animation: newFall,
        points: this.state.points + this.state.wordsArray[match].length,
        counter: this.state.counter + 1
      });
    };
  }

  render() {
    let renderedArray = this.state.wordsArray.map((word, i)=>{
      return <div ref={`word${i}`} key={i} className={`position${i} set ${this.state.bouncing[i]}`} style={this.state.top[i]} id={this.state.animation[i]} >{word}</div>;
    });

    return (<div className="screen">
              <header>
                <h1>
                  <em>T</em><em>Y</em><em>P</em><em>E</em><em className="planet right">I</em><em>T</em>
                </h1>
                <span>
                  <a href="mailto:linye.zhang18@gmail.com" target="_blank">Contact me</a>
                </span>
              </header>
              <div className="game button red text-blanco text-shadow-negra">
                {renderedArray}
                <h2 className={this.state.winOpacity > 0 ? 'animated flash popup passLevel' : 'noShow'}>Next Level</h2>
                <h2 className={this.state.loseOpacity > 0 ? 'animated hinge popup gameOver' : 'noShow'}>Game Over</h2>
                <h2 className={this.state.finalOpacity > 0 ? 'animated wobble popup harveyEnd' : 'noShow'}><img src="harvey.png" /></h2>
              </div>

              <div className="scoreboard">
                <h3>THEME:<br /> <b>{this.state.theme}</b></h3>
                <h3>SCORE:<br /> <b>{this.state.points}</b></h3>
                <h3>CURRENT LEVEL:<br /> <b>{this.state.currentLevel + 1}</b></h3>
              </div>
            </div>);
  }
}

export default App;
