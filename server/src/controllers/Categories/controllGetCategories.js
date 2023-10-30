const { Categories } = require("../../db.js");

const controllGetCategories = async (req) => {
  const allCategories = await Categories.findAll();

  return allCategories;
};

module.exports = controllGetCategories;