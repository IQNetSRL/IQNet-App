const { Priorities } = require("../../db.js");

const controllGetPriorities = async (req) => {
  if (req) {
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
  }

  const allPriorities = await Priorities.findAll();

  return allPriorities;
};

module.exports = controllGetPriorities;
