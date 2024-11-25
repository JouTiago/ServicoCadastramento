const express = require('express');

module.exports = (assinaturaUsecase) => {
  const router = express.Router();

  router.post('/assinaturas', async (req, res) => {
    const { clienteId, aplicativoId } = req.body;
    try {
      const assinatura = await assinaturaUsecase.criarAssinatura({ clienteId, aplicativoId });
      res.status(201).json(assinatura);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.get('/assinaturas', async (req, res) => {
    const { tipo } = req.query;
    try {
      const assinaturas = await assinaturaUsecase.listarAssinaturas({ tipo });
      res.json(assinaturas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/assinaturas/cliente/:clienteId', async (req, res) => {
    const clienteId = parseInt(req.params.clienteId, 10);
    try {
      const assinaturas = await assinaturaUsecase.listarPorCliente(clienteId);
      res.json(assinaturas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/assinaturas/aplicativo/:aplicativoId', async (req, res) => {
    const aplicativoId = parseInt(req.params.aplicativoId, 10);
    try {
      const assinaturas = await assinaturaUsecase.listarPorAplicativo(aplicativoId);
      res.json(assinaturas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};