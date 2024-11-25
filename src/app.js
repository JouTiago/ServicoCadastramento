const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const UsecaseFactory = require('./factory/UsecaseFactory');
const clienteRoutes = require('./routes/ClienteRoutes');
const aplicativoRoutes = require('./routes/AplicativoRoutes');
const assinaturaRoutes = require('./routes/AssinaturaRoutes');
const pagamentoRoutes = require('./routes/PagamentoRoutes');
const validacaoRoutes = require('./routes/ValidacaoRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', clienteRoutes(UsecaseFactory.createClienteUsecase()));
app.use('/api', aplicativoRoutes(UsecaseFactory.createAplicativoUsecase()));
app.use('/api', assinaturaRoutes(UsecaseFactory.createAssinaturaUsecase()));
app.use('/api', pagamentoRoutes(UsecaseFactory.createPagamentoUsecase()));
app.use('/api', validacaoRoutes(UsecaseFactory.createValidacaoUsecase()));

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
  });

module.exports = app;