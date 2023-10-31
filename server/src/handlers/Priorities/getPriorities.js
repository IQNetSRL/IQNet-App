const controllGetPriorities = require("../../controllers/Priorities/controllGetPriorities.js");

const getPriorities = async (req, res) => {
  try {
    const response = await controllGetPriorities();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getPriorities;
