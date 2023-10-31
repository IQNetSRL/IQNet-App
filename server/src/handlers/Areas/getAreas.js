const controllGetAreas = require("../../controllers/Areas/controllGetAreas.js");

const getAreas = async (req, res) => {
  try {
    const response = await controllGetAreas();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getAreas;
