const express = require('express');
const bodyParser = require('body-parser');
const PagamentoRoutes = require('./routes/PagamentoRoutes');
const PagamentoUsecase = require('./usecases/PagamentoUsecase');
const DAOFactory = require('./factory/DAOFactory');
const EventPublisher = require('./application/EventPublisher');
const AssinaturaService = require('./services/AssinaturaService');
const PaymentService = require('./application/PaymentService');

function main() {
  const app = express();

  app.use(bodyParser.json());

  const pagamentoDAO = DAOFactory.createPagamentoDAO();
  const eventPublisher = new EventPublisher();
  const assinaturaService = new AssinaturaService();
  const paymentService = new PaymentService();
  const pagamentoUsecase = new PagamentoUsecase(pagamentoDAO, eventPublisher, assinaturaService, paymentService);

  app.use('/api', PagamentoRoutes(pagamentoUsecase));

  const PORT = 4000;
  app.listen(PORT, () => console.log(`ServicoPagamentos rodando na porta ${PORT}`));
}

main();