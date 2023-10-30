const { Status } = require("../../db");

const controllPostStatus = async (req) => {
  const { name, color } = req.body;

  const existinStatus = await Status.findOne({
    where: { name: name },
  });

  if (existinStatus) {
    return existinStatus;
  }

  const neStatus = await Status.create({
    name: name,
    color: color,
  });

  return neStatus;
};

module.exports = controllPostStatus;
