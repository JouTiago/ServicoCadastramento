const express = require('express');

module.exports = (aplicativoUsecase) => {
  const router = express.Router();

  router.get('/aplicativos', async (req, res) => {
    try {
      const aplicativos = await aplicativoUsecase.listarAplicativos();
      res.json(aplicativos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post('/aplicativos', async (req, res) => {
    const { nome, custoMensal } = req.body;
    try {
      const aplicativo = await aplicativoUsecase.criarAplicativo({ nome, custoMensal });
      res.status(201).json(aplicativo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.patch('/aplicativos/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { custoMensal } = req.body;
    try {
      const atualizado = await aplicativoUsecase.atualizarCustoMensal(id, custoMensal);
      res.json(atualizado);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  return router;
};
