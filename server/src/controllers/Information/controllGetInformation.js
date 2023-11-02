const { Information } = require("../../db.js");

const controllGetInformation = async (req) => {
  const { informationId } = req.query;

  const where = {};

  if (!informationId) {
    const information = await Information.findAll();
    return information;
  }

  if (informationId) {
    where.id = informationId;
  }

  const information = await Information.findAll({
    where,
  });

  return information;
};

module.exports = controllGetInformation;