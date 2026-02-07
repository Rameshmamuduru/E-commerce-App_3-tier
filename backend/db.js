const mysql = require("mysql2");
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let connection;

async function connectWithRetry(retries = 10, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      connection = mysql.createConnection({
        host: process.env.DB_HOST || "mysql",
        user: process.env.DB_USER || "appuser",
        password: process.env.DB_PASSWORD || "rootpass",
        database: process.env.DB_NAME || "shopdb",
        port: process.env.DB_PORT || 3306,
      });

      // Await the connection
      await new Promise((resolve, reject) => {
        connection.connect((err) => {
          if (err) return reject(err);
          resolve();
        });
      });

      console.log("MySQL connected successfully!");
      return;
    } catch (err) {
      console.log(`DB connection failed, retrying in ${delay / 1000}s... (${i + 1}/${retries})`);
      await wait(delay);
    }
  }

  console.error("Could not connect to MySQL after multiple retries. Exiting.");
  process.exit(1);
}

connectWithRetry();

module.exports = {
  query: (...args) => connection.query(...args),
};
