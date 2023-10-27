const { Accounts } = require("../../db.js");

const controllGetAccounts = async (req) => {
  const allAccounts = await Accounts.findAll();

  return allAccounts;
};

module.exports = controllGetAccounts;