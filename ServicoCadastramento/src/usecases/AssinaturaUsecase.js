const moment = require('moment');

class AssinaturaUsecase {
  constructor(assinaturaDAO) {
    this.assinaturaDAO = assinaturaDAO;
  }

  async criarAssinatura({ clienteId, aplicativoId }) {
    const inicioVigencia = moment().format('YYYY-MM-DD');
    const fimVigencia = moment().add(7, 'days').format('YYYY-MM-DD');

    const assinatura = await this.assinaturaDAO.create({
      clienteId,
      aplicativoId,
      inicioVigencia,
      fimVigencia,
    });

    return assinatura;
  }

  async listarAssinaturas() {
    return this.assinaturaDAO.findAll();
  }

  async listarAssinaturasAtivas() {
    return this.assinaturaDAO.findAtivas();
  }

  async listarAssinaturasCanceladas() {
    return this.assinaturaDAO.findCanceladas();
  }

  async listarPorCliente(codcli) {
    return this.assinaturaDAO.findByCliente(codcli);
  }

  async listarPorAplicativo(codapp) {
    return this.assinaturaDAO.findByAplicativo(codapp);
  }

  async obterAssinaturaPorId(id) {
    return this.assinaturaDAO.findById(id);
  }

  async processarPagamento(codAssinatura, valorPago) {
    const assinatura = await this.obterAssinaturaPorId(codAssinatura);
    if (assinatura) {
      const fimVigenciaAtual = moment(assinatura.fim_vigencia);
      let novaFimVigencia;

      if (fimVigenciaAtual.isBefore(moment())) {
        novaFimVigencia = moment().add(30, 'days').format('YYYY-MM-DD');
      } else {
        novaFimVigencia = fimVigenciaAtual.add(30, 'days').format('YYYY-MM-DD');
      }

      await this.assinaturaDAO.updateFimVigencia(codAssinatura, novaFimVigencia);

      console.log(`Fim de vigência da assinatura ${codAssinatura} atualizado para ${novaFimVigencia}`);
    } else {
      console.error(`Assinatura ${codAssinatura} não encontrada`);
      throw new Error('Assinatura não encontrada');
    }
  }
}

module.exports = AssinaturaUsecase;