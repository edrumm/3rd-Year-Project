
const data = {
  username: "placeholder_user_1",
  password: "myPass123$"
};

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  fetch('/api/test', options)
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));
