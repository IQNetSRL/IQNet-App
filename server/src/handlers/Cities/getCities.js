const controllGetCities = require("../../controllers/Cities/controllGetCities.js");

const getCities = async (req, res) => {
  try {
    const cities = await controllGetCities(req);
    res.status(200).json(cities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getCities;
