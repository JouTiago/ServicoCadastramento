const express = require('express');
const ValidacaoRoutes = require('./routes/ValidacaoRoutes');
const EventConsumer = require('./application/EventConsumer');
const ValidacaoUsecase = require('./usecases/ValidacaoUsecase');
const CacheManager = require('./infrastructure/CacheManager');
const AssinaturaService = require('./services/AssinaturaService');

function main() {
  const app = express();

  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  const cacheManager = CacheManager;
  const assinaturaService = new AssinaturaService();
  const validacaoUsecase = new ValidacaoUsecase(cacheManager, assinaturaService);

  app.use('/', ValidacaoRoutes(validacaoUsecase));

  new EventConsumer(validacaoUsecase);

  const PORT = 5000;
  app.listen(PORT, () => console.log(`ServicoAssinaturasValidas rodando na porta ${PORT}`));
}

main();
