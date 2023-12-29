const controllPostCustomers = require("../../controllers/Customers/controllPostCustomers.js");

const postCustomers = async (req, res) => {
  try {
    const newCustomer = await controllPostCustomers(req);
    res.status(201).json([newCustomer]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postCustomers;