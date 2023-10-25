const controllDeleteCity = require("../../controllers/Cities/controllDeleteCity.js");

const deleteCity = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await controllDeleteCity(id);
    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = deleteCity;
