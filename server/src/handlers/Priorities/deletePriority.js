const controllDeletePriority = require("../../controllers/Priorities/controllDeletePriority.js");

const deletePriority = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await controllDeletePriority(id);
    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = deletePriority;
