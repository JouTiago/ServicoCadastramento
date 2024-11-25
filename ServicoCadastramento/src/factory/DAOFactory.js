const DatabaseConnection = require('../application/DatabaseConnection');
const ClienteDAO = require('../infrastructure/ClienteDAO');
const AplicativoDAO = require('../infrastructure/AplicativoDAO');
const AssinaturaDAO = require('../infrastructure/AssinaturaDAO');
const UsuarioDAO = require('../infrastructure/UsuarioDAO');


const DAOFactory = {
  createClienteDAO: () => new ClienteDAO(DatabaseConnection.getConnection()),
  createAssinaturaDAO: () => new AssinaturaDAO(DatabaseConnection.getConnection()),
  createAplicativoDAO: () => new AplicativoDAO(DatabaseConnection.getConnection()),
  createUsuarioDAO: () => new UsuarioDAO(DatabaseConnection.getConnection()),
  getAplicativoDAO() {
    return new AplicativoDAO(this.databaseConnection);
  },
};

module.exports = DAOFactory;
