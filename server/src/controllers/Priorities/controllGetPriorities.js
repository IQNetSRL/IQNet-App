const { Priorities } = require("../../db.js");

const controllGetPriorities = async (req) => {
  const allPriorities = await Priorities.findAll();

  return allPriorities;
};

module.exports = controllGetPriorities;