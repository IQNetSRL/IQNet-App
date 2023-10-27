const controllGetUsers = require("../../controllers/Users/controllGetUsers.js");

const getUsers = async (req, res) => {
  try {
    const users = await controllGetUsers(req);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getUsers;
