const mysql = require('mysql2');

// Create DB connection using env variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'mysql',   // <- use 'mysql', not 'localhost'
  user: process.env.DB_USER || 'appuser',
  password: process.env.DB_PASSWORD || 'rootpass',
  database: process.env.DB_NAME || 'shopdb',
  port: process.env.DB_PORT || 3306
});

// Verify connection
connection.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err.message);
    process.exit(1);  // stop backend if DB not reachable
  } else {
    console.log('MySQL connected successfully!');
  }
});

module.exports = connection;
