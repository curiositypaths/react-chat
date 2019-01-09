import React, { Component } from "react";

const Join = ({ handleUserName, handleJoin, userName }) => (
  <div
    style={{
      width: 400,
      height: 200,
      margin: "auto"
    }}
  >
    <h1>Join the React Chat Room</h1>
    <form onSubmit={handleJoin}>
      <input
        style={{ fontSize: "2.4em" }}
        type="text"
        value={userName}
        onChange={handleUserName}
      />
    </form>
  </div>
);

export default Join;
