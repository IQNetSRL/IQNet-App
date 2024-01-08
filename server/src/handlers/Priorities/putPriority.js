const controllPutPriority = require("../../controllers/Priorities/controllPutPriority.js");

const putPriority = async (req, res) => {
  try {
    const updatedPriority = await controllPutPriority(req);
    res.status(200).json(updatedPriority);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = putPriority;
