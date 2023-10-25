const controllGetCities = require("../../controllers/Cities/controllGetCities.js");

const getCities = async (req, res) => {
  try {
    const reviews = await controllGetCities(req);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getCities;
