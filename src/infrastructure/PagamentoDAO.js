class PagamentoDAO {
    constructor(db) {
      this.db = db;
    }
  
    async create(pagamento) {
      const { codAssinatura, valorPago, dataPagamento } = pagamento;
      const [result] = await this.db.query(
        'INSERT INTO pagamento (codAssinatura, valor_pago, data_pagamento) VALUES (?, ?, ?)',
        [codAssinatura, valorPago, dataPagamento]
      );
      return { id: result.insertId, codAssinatura, valorPago, dataPagamento };
    }
  
    async findByAssinatura(codAssinatura) {
      const [rows] = await this.db.query(
        'SELECT * FROM pagamento WHERE codAssinatura = ?',
        [codAssinatura]
      );
      return rows;
    }
  }
  
  module.exports = PagamentoDAO;  