const { Users } = require("../../db.js");

const controllGetUsers = async (req) => {
  const allUsers = await Users.findAll();

  return allUsers;
};

module.exports = controllGetUsers;