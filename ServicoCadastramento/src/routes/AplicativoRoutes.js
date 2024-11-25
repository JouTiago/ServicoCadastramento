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

  router.patch('/aplicativos/:idAplicativo', async (req, res) => {
    const { idAplicativo } = req.params;
    const { custoMensal } = req.body;

    if (!Number.isInteger(Number(idAplicativo))) {
      return res.status(400).json({ error: 'idAplicativo deve ser um número inteiro' });
    }

    if (typeof custoMensal !== 'number') {
      return res.status(400).json({ error: 'custoMensal deve ser um número' });
    }

    try {
      const aplicativoAtualizado = await aplicativoUsecase.atualizarCustoMensal(idAplicativo, custoMensal);
      
      if (!aplicativoAtualizado) {
        return res.status(404).json({ error: 'Aplicativo não encontrado' });
      }

      res.status(200).json(aplicativoAtualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
