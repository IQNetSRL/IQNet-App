const { Areas } = require("../../db.js");

const controllGetAreas = async (req) => {
  if (req) {
    const { areaId } = req.query;

    const where = {};
  
    if (!areaId) {
      const areas = await Areas.findAll();
      return areas;
    }
  
    if (areaId) {
      where.id = areaId;
    }
  
    const areas = await Areas.findAll({
      where,
    });
  
    return areas;
  }

  const allAreas = await Areas.findAll();

  return allAreas;
};

module.exports = controllGetAreas;