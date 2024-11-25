const express = require('express');
const moment = require('moment');

module.exports = (pagamentoUsecase) => {
  const router = express.Router();

  router.post('/pagamentos', async (req, res) => {
    const { codAssinatura, valorPago } = req.body;
    const dataPagamento = moment().format('YYYY-MM-DD');
    try {
      const pagamento = await pagamentoUsecase.criarPagamento({
        codAssinatura,
        valorPago,
        dataPagamento,
      });
      res.status(201).json(pagamento);
    } catch (error) {
      if (error.message.includes('Assinatura não encontrada')) {
        res.status(404).json({ error: error.message });
      } else if (error.message.includes('Pagamento falhou')) {
        res.status(502).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  });

  return router;
};