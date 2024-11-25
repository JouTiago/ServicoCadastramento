const Logger = require('../application/Logger');
const moment = require('moment');

class ValidacaoAssinaturaUsecase {
  constructor(validacaoDAO, cacheManager, eventEmitter) {
    this.validacaoDAO = validacaoDAO;
    this.cacheManager = cacheManager;
    this.eventEmitter = eventEmitter;

    this.eventEmitter.on('pagamento:registrado', this.atualizarCache.bind(this));
  }

  async validarAssinatura(codAssinatura) {
    // Consultar no cache
    const cacheStatus = this.cacheManager.get(codAssinatura);
    if (cacheStatus) {
      Logger.log('Validação', {
        codAssinatura,
        status: cacheStatus,
        mensagem: 'Validação encontrada no cache',
      });
      return { status: cacheStatus };
    }

    // Consultar no banco
    const assinaturaValidacao = await this.validacaoDAO.findByAssinatura(codAssinatura);
    if (!assinaturaValidacao) {
      Logger.log('Validação', {
        codAssinatura,
        status: 'INVALIDA',
        mensagem: 'Assinatura inválida encontrada no banco',
      });
      return { status: 'INVALIDA' };
    }

    // Atualizar o cache
    this.cacheManager.set(codAssinatura, assinaturaValidacao.status);

    Logger.log('Validação', {
      codAssinatura,
      status: assinaturaValidacao.status,
      mensagem: 'Status da validação atualizado no cache',
    });

    return assinaturaValidacao;
  }

  async atualizarCache({ codAssinatura, novaFimVigencia }) {
    const agora = moment();
    const fimVigenciaDate = moment(novaFimVigencia, 'YYYY-MM-DD');
    const status = fimVigenciaDate.isAfter(agora) ? 'VALIDA' : 'INVALIDA';
  
    await this.validacaoDAO.updateStatus(codAssinatura, status);
  
    this.cacheManager.set(codAssinatura, status);
  
    Logger.log('Cache', {
      codAssinatura,
      status,
      mensagem: 'Cache atualizado após evento de pagamento',
    });
  }
}

module.exports = ValidacaoAssinaturaUsecase;
