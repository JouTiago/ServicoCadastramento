const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const UsecaseFactory = require('./factory/UsecaseFactory');
const clienteRoutes = require('./routes/ClienteRoutes');
const aplicativoRoutes = require('./routes/AplicativoRoutes');
const assinaturaRoutes = require('./routes/AssinaturaRoutes');
const autenticacaoRoutes = require('./routes/AutenticacaoRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const EventConsumer = require('./application/EventConsumer');

const app = express();

app.use(bodyParser.json());

app.use(cors({
  origin: '*',
}));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use('/api', autenticacaoRoutes(UsecaseFactory.createUsuarioUsecase()));

app.use('/api', authMiddleware);

app.use('/api', clienteRoutes(UsecaseFactory.createClienteUsecase()));
app.use('/api', aplicativoRoutes(UsecaseFactory.createAplicativoUsecase()));
app.use('/api', assinaturaRoutes(UsecaseFactory.createAssinaturaUsecase()));

new EventConsumer(UsecaseFactory.createAssinaturaUsecase());

const PORT = 3000;
app.listen(PORT, () => console.log(`ServicoCadastramento rodando na porta ${PORT}`));