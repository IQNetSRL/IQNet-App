const { Accounts } = require('../../db.js');

const controllDeleteAccount = async (id) => {
  const account = await Accounts.findByPk(id);
  if (!account) {
    throw new Error('Account not found.');
  }

  await account.destroy();

  return { message: 'Account deleted successfully.' };
};

module.exports = controllDeleteAccount;