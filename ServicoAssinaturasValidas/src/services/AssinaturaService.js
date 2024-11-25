const axios = require('axios');

class AssinaturaService {
  constructor(httpClient) {
    this.httpClient = httpClient || axios.create({
      baseURL: process.env.CADASTRAMENTO_URL || 'http://servicocadastramento:3000',
      timeout: 5000,
    });
  }

  async obterAssinatura(codAssinatura) {
    const response = await this.httpClient.get(`/api/assinaturas/${codAssinatura}`);
    return response.data;
  }
}

module.exports = AssinaturaService;