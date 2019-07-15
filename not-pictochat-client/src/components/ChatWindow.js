import React, { Component } from "react";
import { Container, Row, Button, Col, InputGroup, Form } from "react-bootstrap";
import Message from "./Message";
import uuid from "uuid";
import io from "socket.io-client";

export class ChatWindow extends Component {
  socket = io("http://localhost:4000");
  id = uuid.v4();

  addMsg = (sender, message) => {
    const newMsg = {
      id: uuid.v4(),
      sender,
      message
    };
    this.setState({ msgs: [...this.state.msgs, newMsg] });
  };

  componentDidMount() {
    this.socket.on(
      "message",
      function(data) {
        this.addMsg(data.sender, data.msg);
      }.bind(this)
    );
  }

  containerStyle = {
    padding: "20px",
    backgroundColor: "#f4f4f4"
  };

  inputStyle = {};

  messageBoxStyle = {
    backgroundColor: "#fff",
    overflowY: "scroll",
    height: "80vh"
  };

  state = {
    msgs: []
  };

  submitted = e => {
    e.preventDefault();
    const data = e.target.hello.value;
    e.target.hello.value = "";
    console.log(data);

    // send message over socket
    this.addMsg(this.id, data);

    this.socket.emit("message", { sender: this.id, msg: data });
  };

  displayMessages = () => {
    return this.state.msgs.map(msg => (
      <Message id={msg.id} sender={msg.sender} message={msg.message} />
    ));
  };

  render() {
    return (
      <Container style={this.containerStyle}>
        <Row key="123">
          <Col>Hello</Col>
        </Row>
        <Container style={this.messageBoxStyle}>
          {this.displayMessages()}
        </Container>
        <Row key="423">
          <Col>
            <Form onSubmit={this.submitted}>
              <InputGroup style={this.inputStyle}>
                <Form.Control name="hello" placeholder="Some text" />
                <InputGroup.Append>
                  <Button type="submit">Send</Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ChatWindow;
