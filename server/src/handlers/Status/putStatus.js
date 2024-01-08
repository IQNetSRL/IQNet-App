const controllPutStatus = require("../../controllers/Status/controllPutStatus.js");

const putStatus = async (req, res) => {
  try {
    const updatedStatus = await controllPutStatus(req);
    res.status(200).json(updatedStatus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = putStatus;
