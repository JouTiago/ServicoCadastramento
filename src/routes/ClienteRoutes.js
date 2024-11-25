const express = require('express');

module.exports = (clienteUsecase) => {
  const router = express.Router();

  router.get('/clientes', async (req, res) => {
    try {
      const clientes = await clienteUsecase.listarClientes();
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post('/clientes', async (req, res) => {
    const { nome, email } = req.body;
    try {
      const cliente = await clienteUsecase.criarCliente({ nome, email });
      res.status(201).json(cliente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
};
