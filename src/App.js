import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Flexbox from "flexbox-react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lyrics: "Freude, schöner Götterfunken\nTochter aus Elysium,",
      translation: "Joy, beautiful spark of divinity,\nDaughter from Elysium,"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  processLyrics = (lyrics, translation) => {};

  updateState = (name, event) => {
    let state = this.state;
    state[name] = event.target.value;
    this.setState(state);
  };

  handleSubmit(event) {
    this.updateState("result", { target: { value: "Hello World" } });
    event.preventDefault();
  }

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
          <Flexbox flexDirection="row" minWidth="100vh">
            <Flexbox flexGrow={1}>
              <textarea
                cols={60}
                rows={30}
                className="lyrics"
                value={this.state.lyrics}
                onChange={event => this.updateState("lyrics", event)}
              />
            </Flexbox>
            <Flexbox flexGrow={1}>
              <textarea
                cols={60}
                rows={30}
                className="translation"
                value={this.state.translation}
                onChange={event => this.updateState("translation", event)}
              />
            </Flexbox>
          </Flexbox>
          <input type="submit" value="Submit" />
          <textarea
            cols={60}
            rows={30}
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
