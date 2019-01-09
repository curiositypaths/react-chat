import React, { Component } from "react";
import { PostMessage } from "./Helpers";

const defaultState = { body: "" };

export default class ChatInput extends Component {
  state = defaultState;

  handleChange = ({ target: { value: body } }) => this.setState({ body });

  resetInput = () => this.setState(defaultState);

  handleSubmit = e => {
    const {
      state: { body },
      props: { currentUser: author }
    } = this;
    e.preventDefault();
    PostMessage({
      author,
      body
    }).then(this.resetInput);
  };

  render() {
    const {
      state: { body },
      handleChange,
      handleSubmit
    } = this;
    return (
      <form onSubmit={handleSubmit}>
        <input
          style={{
            fontSize: "1.8rem",
            border: "1px solid top",
            outlineWidth: 0
          }}
          type="text"
          value={body}
          onChange={handleChange}
        />
      </form>
    );
  }
}
