const { Status } = require("../../db.js");

const controllGetStatus = async (req) => {
  const allStatus = await Status.findAll();

  return allStatus;
};

module.exports = controllGetStatus;