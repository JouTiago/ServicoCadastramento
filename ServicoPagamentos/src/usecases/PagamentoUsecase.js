const moment = require('moment');

class PagamentoUsecase {
  constructor(pagamentoDAO, eventPublisher, assinaturaService, paymentService) {
    this.pagamentoDAO = pagamentoDAO;
    this.eventPublisher = eventPublisher;
    this.assinaturaService = assinaturaService;
    this.paymentService = paymentService;
  }

  async criarPagamento({ codAssinatura, valorPago, dataPagamento }) {
    try {
      const assinatura = await this.assinaturaService.obterAssinatura(codAssinatura);

      if (!assinatura) {
        throw new Error('Assinatura não encontrada');
      }

      console.log(`Assinatura ${codAssinatura} validada com sucesso.`);
    } catch (error) {
      throw new Error('Erro ao validar a assinatura: ' + error.message);
    }

    const paymentResult = await this.paymentService.processPayment({
      codAssinatura,
      valorPago,
      dataPagamento,
    });

    if (!paymentResult.success) {
      throw new Error('Pagamento falhou no gateway de pagamento.');
    }

    const pagamento = await this.pagamentoDAO.create({
      codAssinatura,
      valorPago,
      dataPagamento,
    });

    await this.eventPublisher.publish('pagamentos_queue', {
      codAssinatura,
      valorPago,
      dataPagamento,
      transactionId: paymentResult.transactionId,
    });

    return pagamento;
  }
}

module.exports = PagamentoUsecase;