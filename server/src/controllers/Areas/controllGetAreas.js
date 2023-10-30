const { Areas } = require("../../db.js");

const controllGetAreas = async (req) => {
  const allAreas = await Areas.findAll();

  return allAreas;
};

module.exports = controllGetAreas;