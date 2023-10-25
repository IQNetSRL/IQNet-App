const { Cities } = require("../../db");

const controllPostCities = async (req) => {
  const { name } = req.body;

  const existingCity = await Cities.findOne({
    where: { name: name },
  });

  if (existingCity) {
    return existingCity;
  }
  
  const newCity = await Cities.create({
    name: name,
  });

  return newCity;
};

module.exports = controllPostCities;