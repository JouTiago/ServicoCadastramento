const DAOFactory = require('../factory/DAOFactory');
const UsuarioUsecase = require('../usecases/UsuarioUsecase');

const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido' });
  }

  try {
    const usuarioUsecase = new UsuarioUsecase(DAOFactory.createUsuarioDAO());
    const usuario = await usuarioUsecase.usuarioDAO.findByToken(token);

    if (!usuario) {
      return res.status(401).json({ error: 'Token de autenticação inválido' });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.error('Erro no middleware de autenticação:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

module.exports = authMiddleware;