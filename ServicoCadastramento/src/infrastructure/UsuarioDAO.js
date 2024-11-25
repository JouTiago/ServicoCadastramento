class UsuarioDAO {
    constructor(db) {
      this.db = db;
    }

    async findByUsuario(usuario) {
      const [rows] = await this.db.query('SELECT * FROM usuario WHERE usuario = ?', [usuario]);
      return rows[0] || null;
    }

    async create(usuario) {
      const { usuario: nomeUsuario, senha } = usuario;
      const [result] = await this.db.query(
        'INSERT INTO usuario (usuario, senha) VALUES (?, ?)',
        [nomeUsuario, senha]
      );
      return { id: result.insertId, usuario: nomeUsuario };
    }
   
    async setToken(id, token) {
      await this.db.query(
        'UPDATE usuario SET token = ? WHERE id = ?',
        [token, id]
      );
    }
 
    async findByToken(token) {
      const [rows] = await this.db.query('SELECT * FROM usuario WHERE token = ?', [token]);
      return rows[0] || null;
    }
  }
  
  module.exports = UsuarioDAO;  