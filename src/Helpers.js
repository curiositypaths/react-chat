export const PostMessage = messageData => {
  const reqConfig = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(messageData)
  };

  return fetch("http://localhost:3000/messages", reqConfig).then(r => r.json());
};
