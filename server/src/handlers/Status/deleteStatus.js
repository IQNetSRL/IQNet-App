const controllDeleteStatus = require("../../controllers/Status/controllDeleteStatus.js");

const deleteStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await controllDeleteStatus(id);
    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = deleteStatus;
