const express = require('express');

module.exports = (validacaoUsecase) => {
  const router = express.Router();

  router.get('/validacoes/:codAssinatura', async (req, res) => {
    const { codAssinatura } = req.params;

    if (!Number.isInteger(Number(codAssinatura))) {
      return res.status(400).json({ error: 'codAssinatura deve ser um número inteiro' });
    }
    
    try {
      const validacao = await validacaoUsecase.validarAssinatura(codAssinatura);
      res.status(200).json(validacao);
    } catch (error) {
      if (error.message.includes('não encontrada')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  });

  return router;
};