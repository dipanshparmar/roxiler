const axios = require('axios').default;

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

module.exports = api;
