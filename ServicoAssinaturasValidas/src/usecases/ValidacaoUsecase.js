const moment = require('moment');

class ValidacaoUsecase {
  constructor(cacheManager, assinaturaService) {
    this.cacheManager = cacheManager;
    this.assinaturaService = assinaturaService;
  }

  async validarAssinatura(codAssinatura) {
    let status = this.cacheManager.get(codAssinatura);
    if (status !== null) {
      return { codAssinatura, status, source: 'cache' };
    }

    try {
      const assinatura = await this.assinaturaService.obterAssinatura(codAssinatura);
      if (assinatura) {
        const fimVigencia = moment(assinatura.fim_vigencia);
        status = fimVigencia.isAfter(moment()) ? 'VALIDA' : 'INVALIDA';

        this.cacheManager.set(codAssinatura, status);

        return { codAssinatura, status, source: 'api' };
      } else {
        throw new Error('Assinatura não encontrada');
      }
    } catch (error) {
      throw new Error('Erro ao validar a assinatura: ' + error.message);
    }
  }

  async atualizarCache(event) {
    const { codAssinatura } = event;
    this.cacheManager.delete(codAssinatura);
    console.log(`Cache atualizado para a assinatura ${codAssinatura}`);
  }
}

module.exports = ValidacaoUsecase;