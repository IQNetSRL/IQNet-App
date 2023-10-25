const controllGetUsers = require("../../controllers/Users/controllGetUsers.js");

const getUsers = async (req, res) => {
  try {
    const reviews = await controllGetUsers(req);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getUsers;
