const controllPostArea = require("../../controllers/Areas/controllPostArea.js");

const postArea = async (req, res) => {
  try {
    const newArea = await controllPostArea(req);
    res.status(201).json([newArea]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postArea;
