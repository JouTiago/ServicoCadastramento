const DatabaseConnection = require('../application/DatabaseConnection');
const PagamentoDAO = require('../infrastructure/PagamentoDAO');

const DAOFactory = {
  createPagamentoDAO: () => new PagamentoDAO(DatabaseConnection.getConnection()),
};

module.exports = DAOFactory;
