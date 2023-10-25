const controllPostCities = require("../../controllers/Cities/controllPostCity.js");

const postCity = async (req, res) => {
  try {
    const newCity = await controllPostCities(req);
    res.status(201).json([newCity]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postCity;
