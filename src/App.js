import React, { Component } from "react";
import "./App.css";

const links = [
  "images/debruyne.jpg",
  "images/iniesta.jpg",
  "images/kane.jpg",
  "images/messi.jpg",
  "images/muller.jpg",
  "images/neymar.jpg",
  "images/ochoa.jpg",
  "images/pogba.jpg",
  "images/ronaldo.jpg",
  "images/salah.jpg",
  "images/son.jpg",
  "images/suarez.jpg"
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      highscore: 0,
      currentLayout: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      clickedImages: [],
      gameStatus: "playing"
    };

    this.handleClick = this.handleClick.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.updateApp = this.updateApp.bind(this);
  }

  shuffle(array) {
    var shuffledArray = array.slice();
    var tmp,
      current,
      top = shuffledArray.length;
    if (top)
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = shuffledArray[current];
        shuffledArray[current] = shuffledArray[top];
        shuffledArray[top] = tmp;
      }
    return shuffledArray;
  }

  updateApp(clickedValue) {
    // check if the new click is amongst the clicked images
    if (this.state.clickedImages.some(element => element === clickedValue)) {
      // if yes, the game is lost
      // the result is displayed
      console.log(this.state.score);
      // if it is higher than the high score, the high score is set to the current score
      if (this.state.score > this.state.highscore) {
        this.setState({ highscore: this.state.score });
      }
      // the current score is reset to 0
      // clickedImages is reset to []
      // TODO: currentlayout is modified randomly
      let newLayout = this.shuffle(this.state.currentLayout);
      this.setState({
        clickedImages: [],
        currentLayout: newLayout,
        gameStatus: "lost"
      });
    } else if (this.state.score === 11) {
      this.setState({
        score: 12,
        highscore: 12,
        clickedImages: [],
        gameStatus: "won"
      });
    } else {
      // if no, the game goes on
      // the score is incremented by one
      // the clicked image is added to the clickedImages array
      // the currentLayout Array is randomly reorganized
      let newLayout = this.shuffle(this.state.currentLayout);
      this.setState({
        score: this.state.score + 1,
        clickedImages: this.state.clickedImages.concat(clickedValue),
        currentLayout: newLayout
      });
    }
  }

  handleClick(clickedValue) {
    if (this.state.gameStatus !== "playing") {
      this.setState(
        { score: 0, gameStatus: "playing" },
        // has to put it in the callback to be sure the setState are done AFTER this one
        this.updateApp.bind(this, this.clickedValue)
      );
    } else {
      this.updateApp(clickedValue);
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <div className="page-title">World Cup Clicky Game</div>
          <div className="final-results">
            {this.state.gameStatus === "lost"
              ? `You lost :(, and you scored ${
                  this.state.score
                } points, click on any image to try again!`
              : this.state.gameStatus === "won"
                ? `You won!!! Congrats, you can click on any image to try again`
                : ""}
          </div>
          <div className="scores">
            <div className="current-score">Score: {this.state.score}</div>
            <div className="current-score">
              High Score: {this.state.highscore}
            </div>
          </div>
        </header>
        <div className="game-zone">
          {this.state.currentLayout.map(value => (
            <div
              className="click-block"
              key={value}
              onClick={() => this.handleClick(value)}
            >
              <img
                className="player-img"
                src={links[value - 1]}
                alt={links[value - 1]}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
