const controllGetInformation = require("../../controllers/Information/controllGetInformation.js");

const getInformation = async (req, res) => {
  try {
    const response = await controllGetInformation();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getInformation;
