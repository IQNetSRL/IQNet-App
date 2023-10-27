const controllPostAccount = require("../../controllers/Accounts/controllPostAccount.js");

const postAccount = async (req, res) => {
  try {
    const newAccount = await controllPostAccount(req);
    res.status(201).json([newAccount]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postAccount;