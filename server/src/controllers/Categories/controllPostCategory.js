const { Categories } = require("../../db");

const controllPostCategory = async (req) => {
  const { name, color } = req.body;

  const existingCategory = await Categories.findOne({
    where: { name: name },
  });

  if (existingCategory) {
    return existingCategory;
  }

  const newCategory = await Categories.create({
    name: name,
    color: color,
  });

  return newCategory;
};

module.exports = controllPostCategory;
