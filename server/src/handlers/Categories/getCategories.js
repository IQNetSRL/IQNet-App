const controllGetCategories = require("../../controllers/Categories/controllGetCategories.js");

const getCategories = async (req, res) => {
  try {
    const response = await controllGetCategories();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getCategories;
