class ValidacaoDAO {
  constructor(db) {
    this.db = db;
  }

  async create({ codAssinatura, status }) {
    await this.db.query(
      'INSERT INTO validacao (codAssinatura, status) VALUES (?, ?)',
      [codAssinatura, status]
    );
  }

  async findByAssinatura(codAssinatura) {
    const [rows] = await this.db.query(
      'SELECT * FROM validacao WHERE codAssinatura = ?',
      [codAssinatura]
    );
    return rows.length ? rows[0] : null;
  }

  async updateStatus(codAssinatura, status) {
    await this.db.query(
      'UPDATE validacao SET status = ? WHERE codAssinatura = ?',
      [status, codAssinatura]
    );
  }
}

module.exports = ValidacaoDAO;