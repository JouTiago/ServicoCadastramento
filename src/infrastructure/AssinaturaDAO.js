class AssinaturaDAO {
  constructor(db) {
    this.db = db;
  }

  async create({ clienteId, aplicativoId, inicioVigencia, fimVigencia }) {
    const [result] = await this.db.query(
      "INSERT INTO assinatura (codApp, codCli, inicio_vigencia, fim_vigencia) VALUES (?, ?, ?, ?)",
      [aplicativoId, clienteId, inicioVigencia, fimVigencia]
    );
    return { id: result.insertId, clienteId, aplicativoId, inicioVigencia, fimVigencia };
  }  
  
  async findAll() {
    const [rows] = await this.db.query("SELECT * FROM assinatura");
    return rows;
  }

  async findByStatus(status) {
    let query;
    if (status === 'ATIVA') {
      query = "SELECT * FROM assinatura WHERE fim_vigencia > NOW()";
    } else if (status === 'CANCELADA') {
      query = "SELECT * FROM assinatura WHERE fim_vigencia <= NOW()";
    } else {
      throw new Error('Status inválido');
    }
    const [rows] = await this.db.query(query);
    return rows;
  }  

  async findByCliente(clienteId) {
    const [rows] = await this.db.query("SELECT * FROM assinatura WHERE codCli = ?", [clienteId]);
    return rows;
  }

  async findByAplicativo(aplicativoId) {
    const [rows] = await this.db.query("SELECT * FROM assinatura WHERE codApp = ?", [aplicativoId]);
    return rows;
  }

  async findById(id) {
    const [rows] = await this.db.query("SELECT * FROM assinatura WHERE codigo = ?", [id]);
    return rows.length ? rows[0] : null;
  }

  async updateFimVigencia(id, novaFimVigencia) {
    await this.db.query(
      "UPDATE assinatura SET fim_vigencia = ? WHERE codigo = ?",
      [novaFimVigencia, id]
    );
  }
}

module.exports = AssinaturaDAO;