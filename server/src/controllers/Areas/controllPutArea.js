const { Areas } = require("../../db");

const controllPutArea = async (req) => {
  const { color, name } = req.body;

  const { id } = req.params;

  const existingArea = await Areas.findOne({ where: { id: id } });

  if (!existingArea) {
    throw new Error("Registro no encontrado");
  }

  existingArea.color = color;
  existingArea.name = name;

  await existingArea.save();

  return existingArea;
};

module.exports = controllPutArea;
