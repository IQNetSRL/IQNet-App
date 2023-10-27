const controllGetAccounts = require("../../controllers/Accounts/controllGetAccounts.js");

const getAccounts = async (req, res) => {
  try {
    const accounts = await controllGetAccounts(req);
    res.status(200).json(accounts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getAccounts;
