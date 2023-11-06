const { Categories } = require("../../db.js");

const controllGetCategories = async (req) => {
  if (req) {
    const { categoriesId } = req.query;

    const where = {};

    if (!categoriesId) {
      const categories = await Categories.findAll();
      return categories;
    }

    if (categoriesId) {
      where.id = categoriesId;
    }

    const categories = await Categories.findAll({
      where,
    });

    return categories;
  }

  const allCategories = await Categories.findAll();

  return allCategories;
};

module.exports = controllGetCategories;
