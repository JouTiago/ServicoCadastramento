const crypto = require('crypto');

class UsuarioUsecase {
  constructor(usuarioDAO) {
    this.usuarioDAO = usuarioDAO;
  }

  async registrar(usuario, senha) {
    const usuarioExistente = await this.usuarioDAO.findByUsuario(usuario);
    if (usuarioExistente) {
      throw new Error('Usuário já existe');
    }

    const senhaHash = this.hashSenha(senha);
    const novoUsuario = await this.usuarioDAO.create({ usuario, senha: senhaHash });
    return novoUsuario;
  }
  
  async login(usuario, senha) {
    const user = await this.usuarioDAO.findByUsuario(usuario);
    if (!user) {
      throw new Error('Usuário ou senha inválidos');
    }

    const senhaValida = this.verificarSenha(senha, user.senha);
    if (!senhaValida) {
      throw new Error('Usuário ou senha inválidos');
    }

    const token = this.gerarToken();
    await this.usuarioDAO.setToken(user.id, token);
    return token;
  }
 
  hashSenha(senha) {
    return crypto.createHash('sha256').update(senha).digest('hex');
  }
  
  verificarSenha(senha, hash) {
    const senhaHash = this.hashSenha(senha);
    return senhaHash === hash;
  }

  gerarToken() {
    return crypto.randomBytes(16).toString('hex');
  }
}

module.exports = UsuarioUsecase;