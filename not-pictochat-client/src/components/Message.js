import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";

export class Message extends Component {
  render() {
    const { id, sender, message } = this.props;
    return (
      <Row key={id}>
        <Col>{sender}</Col>
        <Col>{message}</Col>
      </Row>
    );
  }
}

export default Message;
