const server = require("./src/server.js");
const { conn } = require("./src/db.js");
const cron = require("node-cron");
const controllPostCustomers = require("./src/controllers/Customers/controllPostCustomers.js");
const port = process.env.PORT;

conn.sync({ force: false }).then(() => {
  server.listen(port, () => {
    console.log(`%s listening at ${port}`);
    cron.schedule("0 0 * * *", () => {
      controllPostCustomers();
    });
  });
});
