class AssinaturaDAO {
  constructor(db) {
    this.db = db;
  }

  async create(assinatura) {
    const { clienteId, aplicativoId, inicioVigencia, fimVigencia } = assinatura;
    const [result] = await this.db.query(
      'INSERT INTO assinatura (codApp, codCli, inicio_vigencia, fim_vigencia) VALUES (?, ?, ?, ?)',
      [aplicativoId, clienteId, inicioVigencia, fimVigencia]
    );
    return { codigo: result.insertId, clienteId, aplicativoId, inicioVigencia, fimVigencia };
  }

  async findAll() {
    const [rows] = await this.db.query('SELECT * FROM assinatura');
    return rows;
  }

  async findAtivas() {
    const [rows] = await this.db.query('SELECT * FROM assinatura WHERE fim_vigencia > CURDATE()');
    return rows;
  }

  async findCanceladas() {
    const [rows] = await this.db.query('SELECT * FROM assinatura WHERE fim_vigencia <= CURDATE()');
    return rows;
  }

  async findByCliente(codcli) {
    const [rows] = await this.db.query('SELECT * FROM assinatura WHERE codCli = ?', [codcli]);
    return rows;
  }

  async findByAplicativo(codapp) {
    const [rows] = await this.db.query('SELECT * FROM assinatura WHERE codApp = ?', [codapp]);
    return rows;
  }

  async findById(id) {
    const [rows] = await this.db.query('SELECT * FROM assinatura WHERE codigo = ?', [id]);
    return rows[0] || null;
  }

  async updateFimVigencia(codigo, novaFimVigencia) {
    await this.db.query(
      'UPDATE assinatura SET fim_vigencia = ? WHERE codigo = ?',
      [novaFimVigencia, codigo]
    );
  }
}

module.exports = AssinaturaDAO;