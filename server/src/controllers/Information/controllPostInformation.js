const { Information } = require("../../db");

const controllPostInformation = async (req) => {
  const { client, address, text, comment } = req.body;

  const newInformation = await Information.create({
    client: client,
    address: address,
    text: text,
    comment: comment,
  });

  return newInformation; 
};

module.exports = controllPostInformation;
