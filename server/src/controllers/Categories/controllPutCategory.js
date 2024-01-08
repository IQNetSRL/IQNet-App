const { Categories } = require("../../db");

const controllPutCategory = async (req) => {
  const { color, name } = req.body;

  const { id } = req.params;

  const existingCategory = await Categories.findOne({ where: { id: id } });

  if (!existingCategory) {
    throw new Error("Registro no encontrado");
  }

  existingCategory.color = color;
  existingCategory.name = name;

  await existingCategory.save();

  return existingCategory;
};

module.exports = controllPutCategory;
