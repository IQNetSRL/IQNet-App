const controllDeleteUser = require("../../controllers/Users/controllDeleteUser.js");

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await controllDeleteUser(id);
    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = deleteUser;
