const { Information } = require("../../db.js");

const controllGetInformation = async (req) => {
  const allInformation = await Information.findAll();

  return allInformation;
};

module.exports = controllGetInformation;