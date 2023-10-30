const { Status } = require('../../db.js');

const controllDeleteStatus = async (id) => {
  const status = await Status.findByPk(id);
  if (!status) {
    throw new Error('Status not found.');
  }

  await status.destroy();

  return { message: 'Status deleted successfully.' };
};

module.exports = controllDeleteStatus;