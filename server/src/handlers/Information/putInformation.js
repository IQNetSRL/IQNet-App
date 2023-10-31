const controllPutInformation = require("../../controllers/Information/controllPutInformation.js");

const putInformation = async (req, res) => {
  try {
    const updatedInformation = await controllPutInformation(req);
    res.status(200).json(updatedInformation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = putInformation;