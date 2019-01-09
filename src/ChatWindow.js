import React, { Component } from "react";
import Message from "./Message";
import ChatInput from "./ChatInput";

export default class ChatWindow extends Component {
  state = {
    messages: []
  };

  loadMessages = messages => this.setState({ messages });

  fetchMessages = () => {
    return fetch("http://localhost:3000/messages")
      .then(r => r.json())
      .then(this.loadMessages);
  };

  subscribeToMessages = () => {
    setInterval(this.fetchMessages, 300);
  };

  componentDidMount() {
    this.fetchMessages().then(this.subscribeToMessages);
  }

  getSnapshotBeforeUpdate() {
    console.log("hi");
  }

  render() {
    const {
      props: { handleSignOut, currentUser },
      state: { messages }
    } = this;

    const messagesElements = messages.map((m, i) => (
      <Message key={i} message={m} currentUser={currentUser} />
    ));

    return (
      <div>
        <h1 align="center">React Chat</h1>
        <div
          style={{
            width: 300,
            height: 500,
            margin: "auto",
            border: "1px solid black",
            position: "relative",
            overflow: "scroll",
            position: "relative"
          }}
        >
          <div style={{ position: "absolute", bottom: 0 }}>
            {messagesElements}
          </div>
        </div>
        <div
          style={{
            width: 300,
            margin: "auto",
            position: "relative",
            overflow: "scroll",
            border: "1px solid black"
          }}
        >
          <ChatInput currentUser={currentUser} />
        </div>

        <h1 onClick={handleSignOut} style={{ color: "grey" }} align="center">
          Goodbye
        </h1>
      </div>
    );
  }
}
