const controllPostInformation = require("../../controllers/Information/controllPostInformation.js");

const postInformation = async (req, res) => {
  try {
    const newInformation = await controllPostInformation(req);
    res.status(201).json([newInformation]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postInformation;
