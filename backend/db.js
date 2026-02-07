const mysql = require("mysql2");

const db = mysql.createPool({
  host: "mysql",
  user: "appuser",
  password: "rootpass",
  database: "shopdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;


function connectWithRetry() {
  const db = mysql.createConnection(config);

  db.connect(err => {
    if (err) {
      console.error("MySQL not ready... retrying in 5 seconds");
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("MySQL Connected");
      module.exports = db;
    }
  });
}

connectWithRetry();
