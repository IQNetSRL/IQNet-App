const { Priorities } = require("../../db");

const controllPutPriority = async (req) => {
  const { color, name } = req.body;

  const { id } = req.params;

  const existingPriority = await Priorities.findOne({ where: { id: id } });

  if (!existingPriority) {
    throw new Error("Registro no encontrado");
  }

  existingPriority.color = color;
  existingPriority.name = name;

  await existingPriority.save();

  return existingPriority;
};

module.exports = controllPutPriority;
