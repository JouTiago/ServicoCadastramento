class ClienteUsecase {
    constructor(clienteDAO) {
      this.clienteDAO = clienteDAO;
    }
  
    listarClientes() {
      return this.clienteDAO.findAll();
    }
  
    criarCliente(cliente) {
      return this.clienteDAO.create(cliente);
    }
    
  }
  
  module.exports = ClienteUsecase;
  