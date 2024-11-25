class ClienteDAO {
  constructor(db) {
    this.db = db;
  }

  async findAll() {
    const [rows] = await this.db.query('SELECT * FROM cliente');
    return rows;
  }

  async create(cliente) {
    const { nome, email } = cliente;
    const [result] = await this.db.query(
      'INSERT INTO cliente (nome, email) VALUES (?, ?)',
      [nome, email]
    );
    return { id: result.insertId, nome, email };
  }
}

module.exports = ClienteDAO;