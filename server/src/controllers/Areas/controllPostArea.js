const { Areas } = require("../../db");

const controllPostArea = async (req) => {
  const { name, color } = req.body;

  const existingArea = await Areas.findOne({
    where: { name: name },
  });

  if (existingArea) {
    return existingArea;
  }

  const newArea = await Areas.create({
    name: name,
    color: color,
  });

  return newArea; 
};

module.exports = controllPostArea;
