const api = require('../api');

async function getTodos(req, res) {
  try {
    // making the call to the api and getting the response
    const apiResponse = await api.get('/todos');

    // grrabbing the json data from the response
    const data = await apiResponse.data;

    // getting the filtered data
    const filteredData = data.map((d) => {
      // extracting the user id and all the other fields separately
      const { userId, ...rest } = d;

      // returning the object with all the rest properties, excluding the user id
      return rest;
    });

    // returning the filtered data
    res.status(200).json(filteredData);
  } catch (e) {
    // if there is an error then return an error message
    return res.status(500).json({
      status: false,
      message: 'Internal server error',
    });
  }
}

module.exports = getTodos;
