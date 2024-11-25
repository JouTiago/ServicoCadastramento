class AplicativoUsecase {
    constructor(aplicativoDAO) {
      this.aplicativoDAO = aplicativoDAO;
    }
  
    async listarAplicativos() {
      return this.aplicativoDAO.findAll();
    }
  
    async criarAplicativo(aplicativo) {
      return this.aplicativoDAO.create(aplicativo);
    }
  
    async obterAplicativoPorId(id) {
      return this.aplicativoDAO.findById(id);
    }
  
    async atualizarAplicativo(id, aplicativo) {
      return this.aplicativoDAO.update(id, aplicativo);
    }
  
    async deletarAplicativo(id) {
      return this.aplicativoDAO.delete(id);
    }

    async atualizarCustoMensal(idAplicativo, novoCusto) {
      const aplicativo = await this.aplicativoDAO.obterPorId(idAplicativo);
      if (!aplicativo) {
        throw new Error('Aplicativo não encontrado');
      }  
      const aplicativoAtualizado = await this.aplicativoDAO.atualizarCustoMensal(idAplicativo, novoCusto);
      return aplicativoAtualizado;
    }
  
  }
  
  module.exports = AplicativoUsecase;  