const { Priorities } = require("../../db");

const controllPostPriority = async (req) => {
  const { name, color } = req.body;

  const existingPriority = await Priorities.findOne({
    where: { name: name },
  });

  if (existingPriority) {
    return existinPriority;
  }

  const newPriority = await Priorities.create({
    name: name,
    color: color,
  });

  return newPriority;
};

module.exports = controllPostPriority;
