class AplicativoDAO {
  constructor(db) {
    this.db = db;
  }

  async findAll() {
    const [rows] = await this.db.query('SELECT * FROM app');
    return rows;
  }

  async create(aplicativo) {
    const { nome, custoMensal } = aplicativo;
    const [result] = await this.db.query(
      'INSERT INTO app (nome, custo_mensal) VALUES (?, ?)',
      [nome, custoMensal]
    );
    return { id: result.insertId, nome, custoMensal };
  }

  async updateCost(id, custoMensal) {
    await this.db.query('UPDATE app SET custo_mensal = ? WHERE codigo = ?', [
      custoMensal,
      id,
    ]);
    return { id, custoMensal };
  }
}

module.exports = AplicativoDAO;