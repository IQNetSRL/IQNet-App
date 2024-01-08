const controllPutArea = require("../../controllers/Areas/controllPutArea.js");

const putArea = async (req, res) => {
  try {
    const updatedArea = await controllPutArea(req);
    res.status(200).json(updatedArea);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = putArea;
