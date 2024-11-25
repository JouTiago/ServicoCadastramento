const moment = require('moment');

class AssinaturaUsecase {
  constructor(assinaturaDAO, validacaoDAO) {
    this.assinaturaDAO = assinaturaDAO;
    this.validacaoDAO = validacaoDAO;
  }

  async criarAssinatura({ clienteId, aplicativoId }) {
    // Format the start and end dates using moment
    const inicioVigencia = moment().format('YYYY-MM-DD');
    const fimVigencia = moment().add(7, 'days').format('YYYY-MM-DD');

    // Create the subscription in the database
    const assinatura = await this.assinaturaDAO.create({
      clienteId,
      aplicativoId,
      inicioVigencia,
      fimVigencia,
    });

    // Create the validation entry for the subscription
    await this.validacaoDAO.create({
      codAssinatura: assinatura.id,
      status: 'VALIDA',
    });

    return assinatura;
  }

  async listarAssinaturas({ tipo }) {
    if (tipo === "ATIVAS") {
      return this.assinaturaDAO.findByStatus("ATIVA");
    } else if (tipo === "CANCELADAS") {
      return this.assinaturaDAO.findByStatus("CANCELADA");
    }
    return this.assinaturaDAO.findAll();
  }

  async listarPorCliente(clienteId) {
    return this.assinaturaDAO.findByCliente(clienteId);
  }

  async listarPorAplicativo(aplicativoId) {
    return this.assinaturaDAO.findByAplicativo(aplicativoId);
  }
}

module.exports = AssinaturaUsecase;