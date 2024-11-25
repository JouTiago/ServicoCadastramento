const express = require('express');

module.exports = (pagamentoUsecase) => {
  const router = express.Router();

  router.post('/pagamentos', async (req, res) => {
    const { codAssinatura, valorPago, dataPagamento } = req.body;
    try {
      const pagamento = await pagamentoUsecase.criarPagamento({
        codAssinatura,
        valorPago,
        dataPagamento,
      });
      res.status(201).json(pagamento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
};