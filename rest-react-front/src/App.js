import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import 'animate.css';

// game display
class App extends Component {
  constructor() {
    super();
    this.typedWord = '';
    this.state = {
      scoreboard: [], // top 5 players' scores, put object in array? or make separate array for players' names
      wordsArray: ['a','b','c','d','e','f','g','h','i','j'],
      animation: [],
      bouncing: [],
      position: {left: 0},
      top: [],
      points: 0,
      counter: 0,
      winOpacity: 0,
      loseOpacity: 0,
      levelComplete: false,
      level:0,
      timeCounter: 0
    };
    this.detectWord = this.detectWord.bind(this);
    this.wordMatch = this.wordMatch.bind(this);
    this.tick = this.tick.bind(this);

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
                counter: 0,
                wordsArray: ['1','2','3','4','5','6','7','8','9','z'],
                animation: animation,
                bouncing: bouncing,
                top: top,
                levelComplete: false
              });
          }

          else if (this.state.level === 2 && this.state.levelComplete) {
            // console.log('level 2')
            this.setState({
                timeCounter: 0,
                winOpacity: 0,
                counter: 0,
                wordsArray: ['will','thuy','daniel','ian','jin','jonathan','rares','alex','brad','mandy'],
                animation: animation,
                bouncing: bouncing,
                top: top,
                levelComplete: false
              });
          }
        }, 2000
      );

      setTimeout(
        () => {
          if (this.state.levelComplete === false) {
            this.setState({
              winOpacity: 1,
              levelComplete: true,
              level: this.state.level + 1
            })
          } else {
            console.log('ok there will')
          }
        }, 50
      );
    }
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
      return <div ref={`word${i}`} key={i} className={`position${i} set ${this.state.bouncing[i]}`} style={this.state.top[i]} id = {this.state.animation[i]} > {word} </div>;
    });

    return (<div className="screen">
              <div className="instructions">
                <h1>{this.state.level}</h1>
              </div>

              <div className="game">
                {renderedArray}
                <h1 className={this.state.winOpacity > 0 ? "animated bounceIn" : 'noShow'}>Next Level</h1>
                <h1 className={this.state.finalOpacity > 0 ? "animated bounceIn" : 'noShow'}>HARVEY</h1>
                <h1 className={this.state.loseOpacity > 0 ? "animated bounceIn" : 'noShow'}>score</h1>
              </div>

              <div className="scoreboard">
                <h1>{this.state.points}</h1>
              </div>
            </div>);
  }
}

export default App;
