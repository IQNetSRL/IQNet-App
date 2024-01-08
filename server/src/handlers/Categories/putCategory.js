const controllPutCategory = require("../../controllers/Categories/controllPutCategory.js");

const putCategory = async (req, res) => {
  try {
    const updatedCategory = await controllPutCategory(req);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = putCategory;
