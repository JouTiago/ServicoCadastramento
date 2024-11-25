class AplicativoDAO {
  constructor(db) {
    this.db = db;
  }

  async findAll() {
    const [rows] = await this.db.query('SELECT * FROM app');
    return rows;
  }

  async findById(id) {
    const [rows] = await this.db.query('SELECT * FROM app WHERE codigo = ?', [id]);
    return rows[0];
  }

  async create(aplicativo) {
    const { nome, custoMensal } = aplicativo;
    const [result] = await this.db.query(
      'INSERT INTO app (nome, custo_mensal) VALUES (?, ?)',
      [nome, custoMensal]
    );
    return { id: result.insertId, nome, custoMensal };
  }

  async update(id, aplicativo) {
    const { nome, custoMensal } = aplicativo;
    await this.db.query(
      'UPDATE app SET nome = ?, custo_mensal = ? WHERE codigo = ?',
      [nome, custoMensal, id]
    );
    return { id, nome, custoMensal };
  }

  async delete(id) {
    await this.db.query('DELETE FROM app WHERE codigo = ?', [id]);
  }

  async obterPorId(idAplicativo) {
    const [rows] = await this.db.execute('SELECT * FROM app WHERE codigo = ?', [idAplicativo]);
    return rows[0];
  }

  async atualizarCustoMensal(idAplicativo, novoCusto) {
    const [result] = await this.db.execute(
      'UPDATE app SET custo_mensal = ? WHERE codigo = ?',
      [novoCusto, idAplicativo]
    );

    if (result.affectedRows === 0) {
      return null;
    }

    return this.obterPorId(idAplicativo);
  }
}

module.exports = AplicativoDAO;  