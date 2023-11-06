const { Status } = require("../../db.js");

const controllGetStatus = async (req) => {
  if (req) {
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
  }

  const allStatus = await Status.findAll();

  return allStatus;
};

module.exports = controllGetStatus;
