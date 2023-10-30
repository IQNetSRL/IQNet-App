const controllPostPriority = require("../../controllers/Priorities/controllPostPriority.js");

const postPriority = async (req, res) => {
  try {
    const newPriority = await controllPostPriority(req);
    res.status(201).json([newPriority]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postPriority;
