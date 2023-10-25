const { Cities } = require("../../db.js");

const controllGetCities = async (req) => {
  const allCities = await Cities.findAll();

  return allCities;
};

module.exports = controllGetCities;