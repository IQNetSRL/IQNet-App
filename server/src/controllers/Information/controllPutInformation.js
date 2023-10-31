const { Information } = require("../../db");

const controllPutInformation = async (req) => {
  const { id, client, address, text, comment } = req.body;

  const existingInformation = await Information.findByPk(id);

  if (!existingInformation) {
    throw new Error("Registro no encontrado");
  }

  existingInformation.client = client;
  existingInformation.address = address;
  existingInformation.text = text;
  existingInformation.comment = comment;

  await existingInformation.save();

  return existingInformation;
};

module.exports = controllPutInformation;