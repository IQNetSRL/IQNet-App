const { Priorities } = require('../../db.js');

const controllDeletePriority = async (id) => {
  const priority = await Priorities.findByPk(id);
  if (!priority) {
    throw new Error('Priority not found.');
  }

  await priority.destroy();

  return { message: 'Priority deleted successfully.' };
};

module.exports = controllDeletePriority;