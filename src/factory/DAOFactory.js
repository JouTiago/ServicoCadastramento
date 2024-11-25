const DatabaseConnection = require("../application/DatabaseConnection");
const ClienteDAO = require("../infrastructure/ClienteDAO");
const AplicativoDAO = require("../infrastructure/AplicativoDAO");
const AssinaturaDAO = require("../infrastructure/AssinaturaDAO");
const PagamentoDAO = require("../infrastructure/PagamentoDAO");
const ValidacaoDAO = require("../infrastructure/ValidacaoDAO");
const EventEmitter = require("../application/EventEmitter");

const DAOFactory = {
  createClienteDAO: () => new ClienteDAO(DatabaseConnection.getConnection()),
  createAplicativoDAO: () => new AplicativoDAO(DatabaseConnection.getConnection()),
  createAssinaturaDAO: () => new AssinaturaDAO(DatabaseConnection.getConnection()),
  createPagamentoDAO: () => new PagamentoDAO(DatabaseConnection.getConnection()),
  createValidacaoDAO: () => new ValidacaoDAO(DatabaseConnection.getConnection()),
  getEventEmitter: () => EventEmitter,
};

module.exports = DAOFactory;