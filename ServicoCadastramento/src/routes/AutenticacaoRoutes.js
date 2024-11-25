const express = require('express');

module.exports = (usuarioUsecase) => {
  const router = express.Router();

  router.post('/registrar', async (req, res) => {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
      return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
    }

    try {
      const novoUsuario = await usuarioUsecase.registrar(usuario, senha);
      res.status(201).json({ id: novoUsuario.id, usuario: novoUsuario.usuario });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.post('/login', async (req, res) => {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
      return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
    }

    try {
      const token = await usuarioUsecase.login(usuario, senha);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  });

  return router;
};