import React, { Component } from "react";
import ChatWindow from "./ChatWindow";
import Join from "./Join";

const defaultState = {
  userName: "",
  joined: false
};

class ChatContainer extends Component {
  state = defaultState;

  handleUserName = e => {
    const {
      target: { value: userName }
    } = e;
    this.setState({ userName });
  };

  handleJoin = () => {
    const {
      state: { userName }
    } = this;

    if (userName) {
      this.setState({ joined: true });
    }
  };

  handleSignOut = () => {
    this.setState(defaultState);
  };

  render() {
    const {
      state: { userName, joined },
      handleUserName,
      handleJoin,
      handleSignOut,
      state
    } = this;

    console.log("In ChatContainer. State is :", state);

    return joined ? (
      <ChatWindow handleSignOut={handleSignOut} currentUser={userName} />
    ) : (
      <Join
        handleUserName={handleUserName}
        handleJoin={handleJoin}
        userName={userName}
      />
    );
  }
}

export default ChatContainer;
