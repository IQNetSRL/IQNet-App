const { Customers } = require("../../db.js");

const controllPostCustomers = async () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("api-key", "9ad4e9eb-ef39-4205-a3a2-d310bf713c6d");
  myHeaders.append("client-id", "774");
  myHeaders.append("login-type", "api");
  myHeaders.append("username", "api");
  myHeaders.append(
    "Authorization",
    "Bearer 7829|Cd0aMh7SHum0UkQN2jpPA3dFDxDJ6rfZirt9Q2p7"
  );

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
