class ClienteUsecase {
    constructor(clienteDAO) {
      this.clienteDAO = clienteDAO;
    }
  
    async listarClientes() {
      return this.clienteDAO.findAll();
    }
  
    async criarCliente(cliente) {
      return this.clienteDAO.create(cliente);
    }
  
    async obterClientePorId(id) {
      return this.clienteDAO.findById(id);
    }
  
    async atualizarCliente(id, cliente) {
      return this.clienteDAO.update(id, cliente);
    }
  
    async deletarCliente(id) {
      return this.clienteDAO.delete(id);
    }
  }
  
  module.exports = ClienteUsecase;  