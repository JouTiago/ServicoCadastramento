const express = require("express");

module.exports = (validacaoUsecase) => {
  const router = express.Router();

  router.get("/validacoes/:codAssinatura", async (req, res) => {
    const { codAssinatura } = req.params;
    try {
      const validacao = await validacaoUsecase.validarAssinatura(codAssinatura);
      res.status(200).json(validacao);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};