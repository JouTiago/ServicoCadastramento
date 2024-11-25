const DAOFactory = require("./DAOFactory");
const ClienteUsecase = require("../usecases/ClienteUsecase");
const AplicativoUsecase = require("../usecases/AplicativoUsecase");
const AssinaturaUsecase = require("../usecases/AssinaturaUsecase");
const PagamentoUsecase = require("../usecases/PagamentoUsecase");
const ValidacaoAssinaturaUsecase = require("../usecases/ValidacaoAssinaturaUsecase");
const CacheManager = require('../infrastructure/CacheManager');

const UsecaseFactory = {
  createClienteUsecase: () => new ClienteUsecase(DAOFactory.createClienteDAO()),
  createAplicativoUsecase: () => new AplicativoUsecase(DAOFactory.createAplicativoDAO()),
  createAssinaturaUsecase: () =>
    new AssinaturaUsecase(
      DAOFactory.createAssinaturaDAO(),
      DAOFactory.createValidacaoDAO()
    ),
  createPagamentoUsecase: () =>
    new PagamentoUsecase(
      DAOFactory.createPagamentoDAO(),
      DAOFactory.createAssinaturaDAO(),
      DAOFactory.getEventEmitter()
    ),
  createValidacaoUsecase: () =>
    new ValidacaoAssinaturaUsecase(
      DAOFactory.createValidacaoDAO(),
      CacheManager,
      DAOFactory.getEventEmitter()
    ),
};

module.exports = UsecaseFactory;