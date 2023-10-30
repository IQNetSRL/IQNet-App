const controllDeleteArea = require("../../controllers/Areas/controllDeleteArea.js");

const deleteArea = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await controllDeleteArea(id);
    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = deleteArea;
