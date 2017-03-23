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
      wordsArray: ['will','thuy','daniel','jin','ian','jonathan','alex','brad','mandy','rares'],
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
      currentLevel: 0
    };
    this.detectWord = this.detectWord.bind(this);
    this.wordMatch = this.wordMatch.bind(this);
    this.tick = this.tick.bind(this);
    this.quitButton = this.quitButton.bind(this);
    this.restartButton = this.restartButton.bind(this);

    for (let i = 0; i < this.state.wordsArray.length; i++) {
      this.state.top.push({top:0});
      this.state.animation.push(`animateWord${i}`);
      this.state.bouncing.push('');
    }
  }

  // when page mounts, event handler will run
  componentDidMount() {
    window.addEventListener('keypress', this.detectWord);
    setInterval(()=>{this.tick()}, 5000);
  }

  tick () {
    this.setState({
      timeCounter: this.state.timeCounter + 5
    })
  }

  componentDidUpdate() {
    // if user passes all levels
    if (this.state.counter === 10 || (this.state.counter > 5 && this.state.timeCounter === 15)) {
      setTimeout(
        () =>{
          let animation = [];
          let bouncing = [];
          let top = [];

          for (let i = 0; i < this.state.wordsArray.length; i++) {
            top.push({top:0});
            animation.push(`animateWord${i}`);
            bouncing.push('');
          }
          if (this.state.level === 1 && this.state.levelComplete) {
            // console.log('level 1')
            this.setState({
                timeCounter: 0,
                winOpacity: 0,
                loseOpacity: 0,
                counter: 0,
                wordsArray: ['react','javascript','console','postgres','render','loop','brainstation','angular','ruby','ocaml'],
                animation: animation,
                bouncing: bouncing,
                top: top,
                levelComplete: false,
                currentLevel: this.state.currentLevel + 1
              });
          }

          else if (this.state.level === 2 && this.state.levelComplete) {
            // console.log('level 2')
            this.setState({
                timeCounter: 0,
                winOpacity: 0,
                loseOpacity: 0,
                counter: 0,
                wordsArray: ['goldendoodle','beagle','corgi','dachshund','husky','samoyed','greyhound','malamute','bulldog','rottweiler'],
                animation: animation,
                bouncing: bouncing,
                top: top,
                levelComplete: false,
                currentLevel: this.state.currentLevel + 1
              });
          }
        }, 2500
      );

      setTimeout(
        () => {
          if ((this.state.level === 0 || this.state.level === 1) && this.state.levelComplete === false) {
            this.setState({
              winOpacity: 1,
              levelComplete: true,
              level: this.state.level + 1
            })
          } else if (this.state.level === 2 && this.state.levelComplete === false) {
            // console.log('ok there will');
            this.setState({
              finalOpacity: 1,
              levelComplete: false,
              level: this.state.level + 1
            })
          }
        }, 1000
      );
    }

    else if (this.state.counter < 6 && this.state.timeCounter === 15) {
      setTimeout(
        () => {
          this.setState({
            loseOpacity: 1
          })
        }, 2000
      )
    }
  }

  restartButton() {
    // this.setState({
    //   scoreboard: [],
    //   wordsArray: ['will','thuy','daniel','jin','ian','jonathan','alex','brad','mandy','rares'],
    //   animation: [],
    //   bouncing: [],
    //   position: {left: 0},
    //   top: [],
    //   points: 0,
    //   counter: 0,
    //   winOpacity: 0,
    //   loseOpacity: 0,
    //   finalOpacity: 0,
    //   levelComplete: false,
    //   level: 0,
    //   timeCounter: 0,
    //   currentLevel: 0
    // })
  }

  quitButton() {

  }

  // matches typed word to given word in array
  wordMatch(word) { // word = word at each index of array.findIndex() below
    if (this.typedWord.includes(word)) return true;
  }

  // detects character user types on keyboard and concats its in state
  detectWord(e) {
    const array       = this.state.wordsArray;
    const topPos      = {top: 0};
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
                  <em>T</em>
                  <em>Y</em>
                  <em>P</em>
                  <em>E</em>
                  <em className="planet right">I</em>
                  <em>T</em>
                </h1>
                <span>Contact Me</span>
              </header>
              <div className="game button red text-blanco text-shadow-negra">
                {renderedArray}
                <h2 className={this.state.winOpacity > 0 ? 'animated zoomIn popup' : 'noShow'}>Next Level</h2>
                <h2 className={this.state.loseOpacity > 0 ? 'animated hinge popup' : 'noShow'}>Game Over</h2>
                <h2 className={this.state.finalOpacity > 0 ? 'animated zoomIn popup' : 'noShow'}>HARVEY</h2>
              </div>

              <div className="scoreboard">
                <h3>THEME:<br /> Instructors</h3>
                <h3>POINTS:<br /> {this.state.points}</h3>
                <h3>CURRENT LEVEL:<br /> {this.state.currentLevel + 1}</h3>
                {/*<button onClick={this.restartButton}>RESTART {this.state.counter}</button>*/}
                <button onClick={this.quitButton}>QUIT</button>
              </div>
            </div>);
  }
}

export default App;
