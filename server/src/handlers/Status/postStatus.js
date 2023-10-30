const controllPostStatus = require("../../controllers/Status/controllPostStatus.js");

const postStatus = async (req, res) => {
  try {
    const newStatus = await controllPostStatus(req);
    res.status(201).json([newStatus]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postStatus;
