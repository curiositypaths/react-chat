import React, { Component } from "react";
import Message from "./Message";
import ChatInput from "./ChatInput";

export default class ChatWindow extends Component {
  state = {
    messages: [],
    subscriptionId: null
  };

  chatWindowRef = React.createRef();

  loadMessages = messages => this.setState({ messages });

  fetchMessages = () => {
    console.log("Requesting updated messages list");
    return fetch("http://localhost:3000/messages")
      .then(r => r.json())
      .then(this.loadMessages);
  };

  subscribeToMessages = () => {
    const subscriptionId = setInterval(this.fetchMessages, 300);
    this.setState({ subscriptionId });
  };

  componentDidMount() {
    this.fetchMessages().then(this.subscribeToMessages);
  }

  componentDidUpdate() {
    const domChatWindow = this.chatWindowRef.current;
    domChatWindow.scrollTop = domChatWindow.scrollHeight;
  }

  componentWillUnmount() {
    clearInterval(this.state.subscriptionId);
    this.setState({ subscriptionId: null });
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
          ref={this.chatWindowRef}
        >
          <div>{messagesElements}</div>
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
