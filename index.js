const express = require('express');
const app = express();
const getTodos = require('./controllers/todosController');
const getUser = require('./controllers/userController');

// initializing routes
app.get('/todos', getTodos);
app.get('/user/:id', getUser);
app.all('*', (req, res) => {
  return res.status(404).json({
    'success': false,
    'message': `We know nothing about the ${req.url} route`
  })
})

app.listen(5000, () => console.log('server started'));
