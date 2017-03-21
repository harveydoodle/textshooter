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
      currentLevel: 1, // level player is currently on
      scoreboard: [], // top 5 players' scores, put object in array? or make separate array for players' names
      wordsArray: ['woof', // list of words to shoot
                   'bark', 
                   'fart', 
                   'bone', 
                   'treat', 
                   'fur', 
                   'stinky', 
                   'park', 
                   'harvey', 
                   'poop'],
      animation: [],
      // opacity: [],
      bouncing: [],
      position: {left: 0},
      top: [],
      counter: 0
    };
    this.detectWord = this.detectWord.bind(this);
    this.wordMatch = this.wordMatch.bind(this);

    for (let i = 0; i < this.state.wordsArray.length; i++) {
      this.state.top.push({top:0});
      this.state.animation.push(`animateWord${i}`);
      this.state.bouncing.push('');
    }
  }

  // when page mounts, event handler will run
  componentDidMount() {
    window.addEventListener('keypress', this.detectWord);
  }

  componentDidUpdate() {
    // if (this.state.counter > 2) {
    //   alert('level complete')
      // go to next level
    // }
  }

  // matches typed word to given word in array
  wordMatch(word) { // word = word at each index of array.findIndex() below
    if (this.typedWord.includes(word)) return true;
  }

  // function runs when page mounts
  // detects character user types on keyboard and concats its in state
  detectWord(e) {
    const array     = this.state.wordsArray;
    const topPosition     = {top: 0};
    const newArray  = this.state.top; // resets each time
    const falling   = '';
    const newFall   = this.state.animation;
    const bounce    = 'animated bounceOut';
    const newAnim   = this.state.bouncing;
    const c         = String.fromCharCode(e.keyCode);
    
    this.typedWord  = (this.typedWord += c.toLowerCase());
    let match = array.findIndex(this.wordMatch); // match = index of word user types
    
    if (match > -1) {
      this.typedWord = '';
      let refName = `word${match}`;

      // gets the location of word user types
      let aimWord       = ReactDOM.findDOMNode(this.refs[`${refName}`]);
      let wordLocation  = aimWord.getBoundingClientRect();

      let topPosition = {top: wordLocation.top + 30};

      newArray.splice(match, 1, topPosition);
      newAnim.splice(match, 1, bounce);
      newFall.splice(match, 1, falling);

      this.setState({
        top: newArray,
        bouncing: newAnim,
        animation: newFall,
        counter: this.state.counter + this.state.wordsArray[match].length
      });
    };
  }

  render() {
    let renderedArray = this.state.wordsArray.map((word, i)=>{
      return <div ref={`word${i}`} key={i} className={`position${i} set ${this.state.bouncing[i]}`} style={this.state.top[i]} id = {this.state.animation[i]} > {word} </div>;
    });

    return (<div className="game">
              {renderedArray}
              {/*<div className="circle" style={this.state.position}></div>*/}
              <h1 className="animated bounce">{this.state.counter}</h1>
            </div>
            );
  }
}

export default App;
