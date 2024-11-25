const Logger = require('../application/Logger');
const moment = require('moment');

class PagamentoUsecase {
  constructor(pagamentoDAO, assinaturaDAO, eventEmitter) {
    this.pagamentoDAO = pagamentoDAO;
    this.assinaturaDAO = assinaturaDAO;
    this.eventEmitter = eventEmitter;
  }

  async criarPagamento({ codAssinatura, valorPago, dataPagamento }) {
    // Registrar o pagamento no banco
    const pagamento = await this.pagamentoDAO.create({
      codAssinatura,
      valorPago,
      dataPagamento,
    });

    Logger.log('Pagamento', {
      codAssinatura,
      valorPago,
      dataPagamento,
      mensagem: 'Pagamento registrado com sucesso',
    });

    // Atualizar a validade da assinatura
    const assinatura = await this.assinaturaDAO.findById(codAssinatura);
    if (assinatura) {
      // Remove the format string when parsing
      const fimVigencia = moment(assinatura.fim_vigencia);
      if (!fimVigencia.isValid()) {
        throw new Error('Data de fim de vigência inválida');
      }

      // Add 30 days
      const novaFimVigencia = fimVigencia.add(30, 'days').format('YYYY-MM-DD');

      await this.assinaturaDAO.updateFimVigencia(codAssinatura, novaFimVigencia);

      Logger.log('Assinatura', {
        codAssinatura,
        novaFimVigencia,
        mensagem: 'Fim de vigência atualizado após pagamento',
      });

      // Emit event
      this.eventEmitter.emit('pagamento:registrado', {
        codAssinatura,
        novaFimVigencia,
      });
    } else {
      throw new Error('Assinatura não encontrada');
    }

    return pagamento;
  }
}

module.exports = PagamentoUsecase;