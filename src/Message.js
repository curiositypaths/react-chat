import React from "react";

const Message = ({ message: { body, author }, currentUser }) => {
  const direction = currentUser === author ? "right" : "left";

  return (
    <div style={{ padding: 15 }}>
      <p align={direction}>{body}</p>
    </div>
  );
};

export default Message;
