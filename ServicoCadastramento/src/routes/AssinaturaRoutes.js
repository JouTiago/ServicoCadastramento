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
      let assinaturas;
      if (tipo === 'ATIVAS') {
        assinaturas = await assinaturaUsecase.listarAssinaturasAtivas();
      } else if (tipo === 'CANCELADAS') {
        assinaturas = await assinaturaUsecase.listarAssinaturasCanceladas();
      } else {
        assinaturas = await assinaturaUsecase.listarAssinaturas();
      }
      res.json(assinaturas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/assinaturas/cliente/:codcli', async (req, res) => {
    const { codcli } = req.params;

    if (!Number.isInteger(Number(codcli))) {
      return res.status(400).json({ error: 'codcli deve ser um número inteiro' });
    }

    try {
      const assinaturas = await assinaturaUsecase.listarPorCliente(codcli);
      res.json(assinaturas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/assinaturas/aplicativo/:codapp', async (req, res) => {
    const { codapp } = req.params;

    if (!Number.isInteger(Number(codapp))) {
      return res.status(400).json({ error: 'codapp deve ser um número inteiro' });
    }

    try {
      const assinaturas = await assinaturaUsecase.listarPorAplicativo(codapp);
      res.json(assinaturas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/assinaturas/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const assinatura = await assinaturaUsecase.obterAssinaturaPorId(id);
      if (assinatura) {
        res.json(assinatura);
      } else {
        res.status(404).json({ error: 'Assinatura não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};