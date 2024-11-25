const axios = require('axios');

class PaymentService {
  constructor() {
    this.paymentGatewayUrl = process.env.PAYMENT_GATEWAY_URL || 'https://api.paymentgateway.com/process';
  }

  async processPayment(pagamento) {
    const { codAssinatura, valorPago, dataPagamento } = pagamento;

    try {
      const response = await axios.post(this.paymentGatewayUrl, {
        codAssinatura,
        valorPago,
        dataPagamento,
      }, {
        timeout: 5000, 
      });

      if (response.status === 200 && response.data.success) {
        console.log(`Pagamento processado com sucesso para assinatura ${codAssinatura}.`);
        return { success: true, transactionId: response.data.transactionId };
      } else {
        console.error(`Falha no processamento do pagamento para assinatura ${codAssinatura}.`);
        throw new Error('Falha no processamento do pagamento.');
      }
    } catch (error) {
      console.error(`Erro ao processar pagamento para assinatura ${codAssinatura}:`, error.message);
      throw new Error('Erro ao processar pagamento.');
    }
  }
}

module.exports = PaymentService;
