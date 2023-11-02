const { Status } = require("../../db.js");

const controllGetStatus = async (req) => {
  const { statusId } = req.query;

  const where = {};

  if (!statusId) {
    const status = await Status.findAll();
    return status;
  }

  if (statusId) {
    where.id = statusId;
  }

  const status = await Status.findAll({
    where,
  });

  return status;
};

module.exports = controllGetStatus;