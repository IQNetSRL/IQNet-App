const { Accounts } = require("../../db");

const controllPostAccount = async (req) => {
  const { name } = req.body;

  const existingAccount = await Accounts.findOne({
    where: { name: name },
  });

  if (existingAccount) {
    return existingAccount;
  }
  
  const newAccount = await Accounts.create({
    name: name,
  });

  return newAccount;
};

module.exports = controllPostAccount;