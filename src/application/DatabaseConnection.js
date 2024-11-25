const mysql = require('mysql2/promise');

class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }

    this.connection = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'banco_teste',
      port: 3306,
      timezone: 'Z',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    DatabaseConnection.instance = this;
  }

  getConnection() {
    return this.connection;
  }
}

module.exports = new DatabaseConnection();
