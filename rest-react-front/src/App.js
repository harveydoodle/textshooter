import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
      // styles: {animation: expand 5s linear},
      opacity: [],
      position: {left:270}
    };
    this.detectWord = this.detectWord.bind(this);
    this.wordMatch = this.wordMatch.bind(this);
    // this.findCoordinates = this.findCoordinates.bind(this);

    for (let i = 0; i < this.state.wordsArray.length; i++) {
      this.state.opacity.push({opacity:1});
    }
  }

  // when page mounts, event handler will run
  componentDidMount() {
    window.addEventListener('keypress', this.detectWord);
  }

  // matches typed word to given word in array
  wordMatch(word) { // word = word at each index of array.findIndex() below
    if (this.typedWord.includes(word)) return true;
  }

  // function runs when page mounts
  // detects character user types on keyboard and concats its in state
  detectWord(e) {
    const array     = this.state.wordsArray;
    const opacity    = this.state.opacity;
    const newOp     = {opacity:0};
    const newArray  = this.state.opacity; // resets each time
    const c         = String.fromCharCode(e.keyCode);
    
    this.typedWord  = (this.typedWord += c.toLowerCase());
    let match = array.findIndex(this.wordMatch); // match = index of word user types
    
    if (match > -1) {
      newArray.splice(match, 1, newOp);
      this.setState({
        opacity: newArray
      });
      this.typedWord = '';
      let refName = `word${match}`;

      // gets the location of word user types
      let aimWord       = ReactDOM.findDOMNode(this.refs[`${refName}`]);
      let wordLocation  = aimWord.getBoundingClientRect();
      // console.log(wordLocation);
      this.setState({
        position: {left: (wordLocation.left-500)}
      });


    };
  }

  render() {
    let renderedArray = this.state.wordsArray.map((word, i)=>{
      return <div ref={`word${i}`} key={i} className={`position${i} set`} style={this.state.opacity[i]}> {word} </div>;
    });

    return (<div className="game">
    {renderedArray}
    <div className="circle" style={this.state.position} ></div>
    </div>);
  }
}

export default App;
