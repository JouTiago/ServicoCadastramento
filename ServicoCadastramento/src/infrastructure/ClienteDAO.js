class ClienteDAO {
  constructor(db) {
    this.db = db;
  }

  async findAll() {
    const [rows] = await this.db.query('SELECT * FROM cliente');
    return rows;
  }

  async findById(id) {
    const [rows] = await this.db.query('SELECT * FROM cliente WHERE codigo = ?', [id]);
    return rows[0];
  }

  async create(cliente) {
    const { nome, email } = cliente;
    const [result] = await this.db.query(
      'INSERT INTO cliente (nome, email) VALUES (?, ?)',
      [nome, email]
    );
    return { id: result.insertId, nome, email };
  }

  async update(id, cliente) {
    const { nome, email } = cliente;
    await this.db.query(
      'UPDATE cliente SET nome = ?, email = ? WHERE codigo = ?',
      [nome, email, id]
    );
    return { id, nome, email };
  }

  async delete(id) {
    await this.db.query('DELETE FROM cliente WHERE codigo = ?', [id]);
  }
}

module.exports = ClienteDAO;