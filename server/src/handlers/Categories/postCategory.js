const controllPostCategory = require("../../controllers/Categories/controllPostCategory.js");

const postCategory = async (req, res) => {
  try {
    const newArea = await controllPostCategory(req);
    res.status(201).json([newArea]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postCategory;
