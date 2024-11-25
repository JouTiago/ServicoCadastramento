class AssinaturaService {
  constructor(httpClient) {
    this.httpClient = httpClient || axios.create({
      baseURL: 'http://servicocadastramento:3000',
      timeout: 5000,
   });
  }

  async obterAssinatura(codAssinatura) {
    try {
      if (!codAssinatura) {
        console.error('codAssinatura está indefinido ou nulo.');
        throw new Error('codAssinatura inválido.');
      }

      console.log('Chamando API com codAssinatura:', codAssinatura);
      const response = await this.httpClient.get(`/api/assinaturas/${codAssinatura}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter assinatura ${codAssinatura}:`, error.message);
      throw new Error(`Erro ao validar a assinatura: ${error.message}`);
    }
  }
}

module.exports = AssinaturaService;