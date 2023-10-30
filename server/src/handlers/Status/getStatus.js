const controllGetStatus = require("../../controllers/Status/controllGetStatus.js");

const getStatus = async (req, res) => {
  try {
    const response = await controllGetStatus(req);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getStatus;
