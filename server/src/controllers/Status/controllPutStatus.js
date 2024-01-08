const { Status } = require("../../db");

const controllPutStatus = async (req) => {
  const { color, name } = req.body;

  const { id } = req.params;

  const existingStatus = await Status.findOne({ where: { id: id } });

  if (!existingStatus) {
    throw new Error("Registro no encontrado");
  }

  existingStatus.color = color;
  existingStatus.name = name;

  await existingStatus.save();

  return existingStatus;
};

module.exports = controllPutStatus;
