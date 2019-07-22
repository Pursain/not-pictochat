import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ChatWindow from "./components/ChatWindow";
import Lobby from "./components/Lobby";

export class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route
            exact
            path="/"
            render={props => (
              <React.Fragment>
                <Lobby />
              </React.Fragment>
            )}
          />
          <Route path="/chat" render={props => <ChatWindow />} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
