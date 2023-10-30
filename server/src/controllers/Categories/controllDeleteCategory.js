const { Categories } = require('../../db.js');

const controllDeleteCategory = async (id) => {
  const category = await Categories.findByPk(id);
  if (!category) {
    throw new Error('Category not found.');
  }

  await category.destroy();

  return { message: 'Category deleted successfully.' };
};

module.exports = controllDeleteCategory;