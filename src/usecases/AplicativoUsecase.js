class AplicativoUsecase {
    constructor(aplicativoDAO) {
      this.aplicativoDAO = aplicativoDAO;
    }
  
    listarAplicativos() {
      return this.aplicativoDAO.findAll();
    }
  
    criarAplicativo(aplicativo) {
      return this.aplicativoDAO.create(aplicativo);
    }
  
    atualizarCustoMensal(id, custoMensal) {
      return this.aplicativoDAO.updateCost(id, custoMensal);
    }
  }
  
  module.exports = AplicativoUsecase;
  