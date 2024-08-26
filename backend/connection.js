const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user:'host',
  password:'',
  database: 'customers'
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database as id ' + connection.threadId);
});

module.exports = connection;
