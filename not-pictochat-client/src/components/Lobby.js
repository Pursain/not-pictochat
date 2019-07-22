import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Rooms from "./Rooms";
import uuid from "uuid";

export class Lobby extends Component {
  state = {
    rooms: [],
    selectedRoom: null,
    redirect: false
  };

  componentDidMount() {
    //query backend for existing rooms
    let arr = [];

    for (let i = 0; i < 20; i++) {
      arr.push({
        id: uuid.v4(),
        name: uuid.v4(),
        people: ((i * 7) % 15) + 1
      });
    }
    this.setState({
      rooms: arr
    });
  }

  selectRoom = id => {
    this.setState({ selectedRoom: id });
    console.log(id);
  };

  joinRoom = () => {
    console.log("changeRoom to:", this.state.selectedRoom);
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/chat" />;
    }
    return (
      <div className="container">
        <div className="row dark-primary-color p-2 mt-4">
          <div className="col align-middle">
            <h3 className="text-center text-primary-color">
              Choose a Chat Room to join
            </h3>
          </div>
        </div>
        <div className="row bg-light">
          <div
            className="col"
            style={{ overflowY: "scroll", maxHeight: "70vh" }}
          >
            <Rooms
              rooms={this.state.rooms}
              selectRoom={this.selectRoom}
              selectedRoom={this.state.selectedRoom}
            />
          </div>
        </div>
        <div className="row dark-primary-color p-2">
          <div className="col text-right">
            <button className="btn accent-button">Create Room</button>
          </div>
          <div className="col text-left">
            {this.state.selectedRoom != null ? (
              <button className="btn accent-button" onClick={this.joinRoom}>
                Join Room
              </button>
            ) : (
              <button className="btn accent-button disabled">Join Room</button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Lobby;
