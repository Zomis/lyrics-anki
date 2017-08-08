import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lyrics: "Freude, schöner Götterfunken\nTochter aus Elysium,",
      translation: "Joy, beautiful spark of divinity,\nDaughter from Elysium,"
    };
  }

  processLyrics = (lyrics, translation) => {};

  updateState = (name, event) => {
    console.log("Update " + name + " to " + event);
    let state = this.state;
    state[name] = event.target.value;
    this.setState(state);
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to lyrics-anki</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <form onSubmit={this.handleSubmit}>
          <textarea
            className="lyrics"
            value={this.state.lyrics}
            onChange={event => this.updateState("lyrics", event)}
          />
          <textarea
            className="translation"
            value={this.state.translation}
            onChange={event => this.updateState("translation", event)}
          />
          <textarea
            className="result"
            value={this.state.result}
            onChange={event => this.updateState("result", event)}
          />
        </form>
      </div>
    );
  }
}

export default App;
