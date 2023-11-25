const { Cities } = require('../../db.js');

const controllDeleteCity = async (id) => {
  const city = await Cities.findByPk(id);
  if (!city) {
    throw new Error('City not found.');
  }

  await city.destroy();

  return { message: 'City deleted successfully.' };
};

module.exports = controllDeleteCity;