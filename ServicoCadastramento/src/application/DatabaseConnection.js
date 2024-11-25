const mysql = require('mysql2/promise');

class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }

    try {
      this.connection = mysql.createPool({
        host: process.env.DB_HOST || 'mysql_cadastramento',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'banco_cadastramento',
        port: process.env.DB_PORT || 3306,
        timezone: 'Z',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });

      this.testConnection();

      DatabaseConnection.instance = this;
    } catch (error) {
      console.error('Erro ao criar o pool de conexões MySQL:', error);
      throw error;
    }
  }

  async testConnection() {
    try {
      const connection = await this.connection.getConnection();
      await connection.ping();
      console.log('Conexão com o banco de dados estabelecida com sucesso.');
      connection.release();
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados MySQL:', error);
      throw error;
    }
  }

  getConnection() {
    return this.connection;
  }
}

module.exports = new DatabaseConnection();