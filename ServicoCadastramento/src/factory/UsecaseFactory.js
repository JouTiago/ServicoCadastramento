const DAOFactory = require('./DAOFactory');
const ClienteUsecase = require('../usecases/ClienteUsecase');
const AplicativoUsecase = require('../usecases/AplicativoUsecase');
const AssinaturaUsecase = require('../usecases/AssinaturaUsecase');
const UsuarioUsecase = require('../usecases/UsuarioUsecase');


const UsecaseFactory = {
  createClienteUsecase: () => new ClienteUsecase(DAOFactory.createClienteDAO()),
  createAplicativoUsecase: () => new AplicativoUsecase(DAOFactory.createAplicativoDAO()),
  createAssinaturaUsecase: () => new AssinaturaUsecase(DAOFactory.createAssinaturaDAO()),
  createUsuarioUsecase: () => new UsuarioUsecase(DAOFactory.createUsuarioDAO()),
  getAplicativoUsecase() {
    const aplicativoDAO = this.daoFactory.getAplicativoDAO();
    return new AplicativoUsecase(aplicativoDAO);
  },
};

module.exports = UsecaseFactory;