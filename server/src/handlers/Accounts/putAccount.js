const controllPutAccount = require("../../controllers/Accounts/controllPutAccount.js");

const putAccount = async (req, res) => {
  try {
    const updatedAccount = await controllPutAccount(req);
    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = putAccount;
