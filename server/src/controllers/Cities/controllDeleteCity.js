const { Areas } = require('../../db.js');

const controllDeleteArea = async (id) => {
  const area = await Areas.findByPk(id);
  if (!area) {
    throw new Error('Area not found.');
  }

  await area.destroy();

  return { message: 'Area deleted successfully.' };
};

module.exports = controllDeleteArea;