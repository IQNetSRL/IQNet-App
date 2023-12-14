const { Customers } = require("../../db.js");
const data = process.env;

const controllPostCustomers = async () => {
  const token = data.AUTHORIZATION;
  const clientId = data.CLIENT_ID;
  const key = data.API_KEY;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("api-key", key);
  myHeaders.append("client-id", clientId);
  myHeaders.append("login-type", "api");
  myHeaders.append("username", "api");
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "http://iqnetcomunicaciones.com/api/customers/customers_list",
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

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
  } catch (error) {
    console.error("Error:", error.message);
  }
};

module.exports = controllPostCustomers;
