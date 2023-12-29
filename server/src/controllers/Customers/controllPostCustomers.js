const { Customers } = require("../../db.js");
const data = process.env;

const controllPostCustomers = async (req) => {
  const result = req.body;

  for (const customer of result) {
    const existingCustomer = await Customers.findOne({
      where: { docNumber: customer.doc_number },
    });

    if (existingCustomer) {
      await existingCustomer.update({
        name: customer.name,
        address: customer.address,
        phones: customer.phones.map((phone) => phone.number),
        city: customer.city.name.length > 1 ? customer.city.name : null,
        docNumber: customer.doc_number,
        lastUpdated: new Date(),
      });
    } else {
      await Customers.create({
        name: customer.name,
        address: customer.address,
        phones: customer.phones.map((phone) => phone.number),
        city: customer.city.name.length > 1 ? customer.city.name : null,
        docNumber: customer.doc_number,
      });
    }
  }

  console.log(
    "Clientes insertados/actualizados correctamente en la base de datos."
  );
};

module.exports = controllPostCustomers;
