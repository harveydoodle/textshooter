import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // use for animations?
import './App.css';

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
      opacity: [],
      position: {left: 280.5},
      height: {top: 700},
      counter: 0
    };
    this.detectWord = this.detectWord.bind(this);
    this.wordMatch = this.wordMatch.bind(this);

    for (let i = 0; i < this.state.wordsArray.length; i++) {
      this.state.opacity.push({opacity:1});
      this.state.animation.push(`animateWord${i}`);
    }
  }

  // when page mounts, event handler will run
  componentDidMount() {
    window.addEventListener('keypress', this.detectWord);
  }

  componentDidUpdate() {
    if (this.state.counter > 2) {
      alert('level complete')
      // go to next level
    }
  }

  // matches typed word to given word in array
  wordMatch(word) { // word = word at each index of array.findIndex() below
    if (this.typedWord.includes(word)) return true;
  }

  // function runs when page mounts
  // detects character user types on keyboard and concats its in state
  detectWord(e) {
    const array     = this.state.wordsArray;
    // const newOp     = {opacity:0};
    // const newArray  = this.state.opacity; // resets each time
    const newAnim     = '';
    const newAnimationArr = this.state.animation;
    const c         = String.fromCharCode(e.keyCode);
    
    this.typedWord  = (this.typedWord += c.toLowerCase());
    let match = array.findIndex(this.wordMatch); // match = index of word user types
    
    if (match > -1) {
      // newArray.splice(match, 1, newOp);
      newAnimationArr.splice(match, 1, newAnim);

      this.setState({
        // opacity: newArray,
        animation: newAnimationArr,
        counter: this.state.counter + 1
      });
      
      this.typedWord = '';
      let refName = `word${match}`;

      // gets the location of word user types
      let aimWord       = ReactDOM.findDOMNode(this.refs[`${refName}`]);
      let wordLocation  = aimWord.getBoundingClientRect();
      this.setState({
        position: {left: (wordLocation.left - 410)},
        height: {top: (700 - wordLocation.top)}
      });
      console.log(this.state.animation);
    };
  }

  render() {
    let renderedArray = this.state.wordsArray.map((word, i)=>{
      return <div ref={`word${i}`} key={i} className={`position${i} set`} style={this.state.opacity[i]} id = {this.state.animation[i]} > {word} </div>;
    });

    return (<div className="game">
              {renderedArray}
              <div className="circle" style={this.state.position}></div>
              <div className="bullet" style={this.state.height}></div>
            </div>
            );
  }
}

export default App;
