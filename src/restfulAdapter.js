const generateRestfulAdapter = apiBaseAddress => {
  const parseResponse = response => response.json();
  const headers = {
    "Content-Type": "application/json"
  };

  return {
    index: () => {
      return fetch(apiBaseAddress).then(parseResponse);
    },

    create: body => {
      const config = {
        method: "POST",
        headers,
        body: JSON.stringify(body)
      };

      return fetch(apiBaseAddress, config).then(parseResponse);
    },

    update: (id, body) => {
      const config = {
        method: "PATCH",
        headers,
        body: JSON.stringify(body)
      };

      return fetch(`${apiBaseAddress}/${id}`, config).then(parseResponse);
    },
    delete: id =>
      fetch(`${apiBaseAddress}/${id}`, { method: "DELETE" }).then(parseResponse)
  };
};

const messageInTheBottleAPIAdapter = generateRestfulAdapter(
  "http://fetch-message-in-the-bottle.herokuapp.com/api/v2/messages"
);

messageInTheBottleAPIAdapter.index().then(console.log);
messageInTheBottleAPIAdapter
  .create({ message: { message: "Hi", real_name: "J" } })
  .then(console.log);

export default generateRestfulAdapter;
