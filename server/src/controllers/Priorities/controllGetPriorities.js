const { Priorities } = require("../../db.js");

const controllGetPriorities = async (req) => {
  const { prioritiesId } = req.query;

  const where = {};

  if (!prioritiesId) {
    const priorities = await Priorities.findAll();
    return priorities;
  }

  if (prioritiesId) {
    where.id = prioritiesId;
  }

  const priorities = await Priorities.findAll({
    where,
  });

  return priorities;
};

module.exports = controllGetPriorities;