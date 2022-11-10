const api = require('../api');

// function to get the user data
async function getUserData(id) {
  // making the request to get the user information
  const userResponse = await api.get(`/users/${id}`);

  // extracting the user data from the response
  const userData = userResponse.data;

  // returning the user data
  return userData;
}

// function to get the todos for the current user
async function getUserTodos(id) {
  // making an api call to get all the todos
  const todosResponse = await api.get('/todos');

  // getting the todos from the response
  const todos = todosResponse.data;

  // getting the todos for the current user
  let userTodos = todos.filter((todo) => {
    // returning where the todo's user id matches current user's id
    return todo.userId.toString() === id; // converting the user id fetched from the api to a string for easy comparison
  });

  // mapping the userTodos
  userTodos = userTodos.map((t) => {
    // getting the properties
    const { userId, id: todoId, title, completed } = t;

    // reorganizing the data and returning
    return {
      id: todoId,
      title,
      userId,
      completed,
    };
  });

  // returning the userTodos
  return userTodos;
}

async function getUser(req, res) {
  try {
    // extracting the id from the request
    const { id } = req.params;

    // getting the user data
    let userData = await getUserData(id);

    // getting the user todos
    const userTodos = await getUserTodos(id);

    // grabbing the properties of the userData separately so that they can be organized and returned accordingly
    const { id: userId, name, email, phone, ...rest } = userData;

    // reordering userData
    userData = {
      id: userId,
      name,
      email,
      phone,
      todos: userTodos,
      ...rest,
    };

    // sending the data back
    res.status(200).json(userData);
  } catch (e) {
    // getting the error data
    const { status, statusText: message } = e.response;

    // sending the error response
    res.status(500).json({
      status,
      message,
    });
  }
}

module.exports = getUser;
