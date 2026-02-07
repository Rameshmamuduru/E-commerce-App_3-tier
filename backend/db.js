const mysql = require('mysql2/promise'); // using promise version for easier async

// Simple delay function
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function connectWithRetry(retries = 5, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'mysql',   // <- service name in Docker Compose
        user: process.env.DB_USER || 'appuser',
        password: process.env.DB_PASSWORD || 'rootpass',
        database: process.env.DB_NAME || 'shopdb',
        port: process.env.DB_PORT || 3306
      });

      console.log('✅ MySQL connected successfully!');
      return connection; // return connection to use in app
    } catch (err) {
      console.log(`❌ DB connection failed, retrying in ${delay/1000}s... (${i+1}/${retries})`);
      await wait(delay);
    }
  }

  console.error('❌ Could not connect to MySQL after multiple retries. Exiting.');
  process.exit(1);
}

module.exports = connectWithRetry;
