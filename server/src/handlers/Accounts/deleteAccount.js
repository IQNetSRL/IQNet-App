const controllDeleteAccount = require("../../controllers/Account/controllDeleteAccount.js");

const deleteAccount = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await controllDeleteAccount(id);
    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = deleteAccount;
