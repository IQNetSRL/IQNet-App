const { Accounts } = require("../../db");

const controllPutAccount = async (req) => {
  const { level } = req.body;

  const { id } = req.params;

  const existingAccount = await Accounts.findOne({ where: { id: id } });

  if (!existingAccount) {
    throw new Error("Registro no encontrado");
  }

  existingAccount.level = level;

  await existingAccount.save();

  return existingAccount;
};

module.exports = controllPutAccount;
