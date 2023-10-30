const controllDeleteCategory = require("../../controllers/Categories/controllDeleteCategory.js");

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await controllDeleteCategory(id);
    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = deleteCategory;
