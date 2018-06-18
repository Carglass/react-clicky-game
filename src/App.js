import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      highscore: 0,
      currentLayout: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      clickedImages: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(clickedValue) {
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
      this.setState({ score: 0, clickedImages: [] });
      // TODO: currentlayout is modified randomly
    } else {
      // if no, the game goes on
      // the score is incremented by one
      // the clicked image is added to the clickedImages array
      this.setState({
        score: this.state.score + 1,
        clickedImages: this.state.clickedImages.concat(clickedValue)
      });

      // the currentLayout Array is randomly reorganized
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <div className="page-title">Clicky Game</div>
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
              {value}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
