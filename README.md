API para Gestão de Aplicações

Tecnologias Utilizadas
•	Linguagem de Programação: JavaScript;
•	Ambiente de Execução: Node.js;
•	Framework Web: Express.js;
•	Banco de Dados: MySQL com mysql2;
•	Mensageria: RabbitMQ com amqplib;
•	Cliente HTTP: Axios;
•	Manipulação de Datas: Moment.js;
•	Containerização: Docker;
•	Orquestração de Containers: Docker Compose;
•	Qualidade de Código: ESLint;
•	Gerenciamento de CORS: CORS;
•	Análise de Corpo de Requisição: body-parser;
•	Design Pattern: Clean Architecture com princípios SOLID.

Configuração do Ambiente de Desenvolvimento
Requisitos
1.	Ferramentas Necessárias:
•	Docker, juntamente com o Docker Compose instalados;
•	Node.js (versão 18 ou superior) e npm.

2.	Configuração de Ambiente:

•	Habilitar Virtualização:
	Abra o Gerenciador de Tarefas do Windows (Ctrl + Shift + Esc) e vá para a aba “Desempenho”. Verifique se a virtualização está habilitada;
 
	Caso a virtualização esteja desabilitada, acesse a BIOS do seu computador durante a inicialização (geralmente pressionando teclas como F2, F10, DEL) e habilite a opção de virtualização (VT-x para Intel ou AMD-V para AMD). Salve as alterações e reinicie o computador;

•	Verificar Instalação do Docker:
	Abra o terminal (Prompt de Comando, PowerShell ou terminal do seu editor de código) e execute o comando: docker –version. A resposta deve exibir a versão do Docker instalada, confirmando que ele está funcionando corretamente;

•	Passos para Inicializar o Ambiente:
•	Certifique-se de que você possui os seguintes arquivos e diretórios no diretório raiz do projeto (servicocadastramento):
o	docker-compose.yml

o	Diretórios dos serviços: ServicoAssinaturasValidas, ServicoCadastramento, ServicoPagamentos

o	Outros arquivos essenciais como package.json em cada serviço e os scripts SQL  banco_cadastramentos.sql e banco_pagamentos.sql em seus respectivos diretórios.

•	No terminal do editor de código de sua escolha, navegue até o diretório raiz do projeto: cd ........ /servicocadastramento;

•	Inicializar os Serviços com Docker Compose:
o	No diretório raiz do projeto, execute o comando: docker-compose up –build;

o	Aguarde até que todos os serviços estejam em execução. Você verá mensagens de log indicando que o MySQL, RabbitMQ e os serviços da aplicação estão rodando.

•	Para confirmar, acesse o MySQL dentro do container com o comando: docker exec -it mysql_pagamentos mysql -u root -p

•	Quando solicitado a senha, ela será a mesma contida no arquivo “docker-compose.yml” (password);
 
•	Confirme se os bancos foram criados executando dentro do cliente MySQL com o comando: SHOW DATABASES;
 
•	Caso as portas 3306(MySQL), 3000(ServicoCadastramento), 4000(ServicoPagamentos) ou  5000(ServicoAssinaturasValidas) já estejam em uso no seu sistema, você precisará alterar as configurações no arquivo docker-compose.yml e nos arquivos de configuração dos respectivos serviços (DatabaseConnection.js, etc.) para utilizar portas livres. 

•	Caso os scripts SQL (banco_cadastramentos.sql e banco_pagamentos.sql) não tenham sido executados automaticamente durante a inicialização dos containers, você pode rodá-los manualmente do container SQL:
o	docker exec -i mysql_cadastramento mysql -u root -p banco_cadastramento < ./banco_cadastramentos.sql

o	docker exec -i mysql_pagamentos mysql -u root -p banco_pagamentos < ./banco_pagamentos.sql

•	Com todos os containers rodando, verifique se os serviços estão acessíveis através das portas configuradas:
o	ServicoCadastramento: http://localhost:3000
o	ServicoPagamentos: http://localhost:4000
o	ServicoAssinaturasValidas: http://localhost:5000

Estrutura de Pastas e Arquivos
•	application/: Camada responsável por gerenciar conexões com o banco de dados, publicação de eventos e serviços de pagamento.

•	domain/: Camada de modelos de dados que representam entidades como Pagamento. Essa camada atua como intermediária entre a lógica de negócios e as interfaces externas. Esta camada define a estrutura e as regras de negócio fundamentais.

•	factory/: Fábricas para criar DAOs, promovendo a criação desacoplada e facilitando a manutenção. Utilizar factories promove o desacoplamento entre as classes e facilita a manutenção e a escalabilidade do código.

•	infrastructure/: Implementações de DAOs para interação com o banco de dados. Esta camada lida com detalhes técnicos, como consultas SQL e gerenciamento de conexões.

•	 routes/: Definição das rotas da API. Esta camada gerencia como as requisições são direcionadas dentro da aplicação.

•	services/: Serviços auxiliares, como integração com o serviço de assinaturas. Esta camada encapsula lógica que pode ser reutilizada por múltiplos casos de uso.

•	usecases/: Casos de uso que encapsulam a lógica de negócios para processamento de pagamentos. Esta camada orquestra a interação entre DAOs, serviços e outros componentes para realizar operações complexas.

•	app.js: Arquivo principal que configura e inicia o serviço.

•	Dockerfile: Configuração do ambiente Docker, instalando dependências e definindo o ponto de entrada de cada micro-serviço.
Endpoints
1.	Registrar um Novo Usuário

•	Endpoint: POST /api/registrar
•	Descrição: Registra um novo usuário na aplicação, permitindo que ele acesse os serviços disponíveis.
•	Parâmetros: Nenhum.

•	Requisição:
{
  "usuario": "admin",
  "senha": "senha123"
}

•	Resposta:
{
  "id": 1,
  "usuario": "admin"
}



2.	Login de Usuário

•	Endpoint: POST /api/login
•	Descrição: Autentica um usuário registrado e retorna um token de acesso para uso em requisições protegidas
•	Parâmetros: Nenhum

•	Requisição:
{
  "usuario": "admin",
  "senha": "senha123"
}

•	Resposta:
{
  "token": "abc123def456ghi789jkl012mno345pq"
}

3.	Listar Todos os Clientes

•	Endpoint: GET /api/clientes
•	Descrição: Retorna uma lista de todos os clientes cadastrados na aplicação
•	Parâmetros (Header): Authorization: token
Exemplo de token: “abc123def456ghi789jkl012mno345pq”

•	Requisição: Corpo vazio

•	Resposta:
[
  {
    "id": 1,
    "nome": "Cliente 1",
    "email": "cliente1@email.com"
  },
  {
    "id": 2,
    "nome": "Cliente 2",
    "email": "cliente2@email.com"
  }
]

4.	Criar um Novo Cliente

•	Endpoint: POST /api/clientes
•	Descrição: Cria um novo cliente na aplicação com os dados fornecidos.
•	Parâmetros (Header): Authorization: token
Exemplo de token: “abc123def456ghi789jkl012mno345pq”

•	Requisição: 
{
  "nome": "Cliente 3",
  "email": "cliente3@email.com"
}

•	Resposta:
{
  "id": 3,
  "nome": "Cliente 3",
  "email": "cliente3@email.com"
}
5.	Listar Todos os Aplicativos

•	Endpoint: GET /api/aplicativos
•	Descrição: Retorna uma lista de todos os aplicativos disponíveis para assinatura.
•	Parâmetros (Header): Authorization: token
Exemplo de token: “abc123def456ghi789jkl012mno345pq”

•	Requisição: Corpo vazio

•	Resposta:
[
  {
    "id": 1,
    "nome": "App A",
    "custoMensal": 19.99
  },
  {
    "id": 2,
    "nome": "App B",
    "custoMensal": 29.99
  }
]

6.	Criar um Novo Aplicativo

•	Endpoint: POST /api/aplicativos
•	Descrição: Adiciona um novo aplicativo à plataforma, permitindo que os clientes possam assinar.
•	Parâmetros (Header): Authorization: token
Exemplo de token: “abc123def456ghi789jkl012mno345pq”
•	Requisição: 
{
  "nome": "App C",
  "custoMensal": 39.99
}

•	Resposta:
{
  "id": 3,
  "nome": "App C",
  "custoMensal": 39.99
}

7.	Criar uma Nova Assinatura

•	Endpoint: POST /api/assinaturas
•	Descrição: Cria uma nova assinatura para um cliente em um aplicativo específico.
•	Parâmetros (Header): Authorization: token
Exemplo de token: “abc123def456ghi789jkl012mno345pq”

•	Requisição: 
{
  "clienteId": 1,
  "aplicativoId": 2
}

•	Resposta:
{
  "id": 101,
  "clienteId": 1,
  "aplicativoId": 2,
  "inicioVigencia": "2024-04-01",
  "fimVigencia": "2024-04-08"
}



8.	Listar Todas as Assinaturas

•	Endpoint: GET /api/assinaturas?tipo=ATIVAS ou
                             GET /api/assinaturas?tipo=CANCELADAS
•	Descrição: Retorna uma lista de todas as assinaturas existentes. Pode filtrar por tipo.
•	Parâmetros (Header): Authorization: token
Exemplo de token: “abc123def456ghi789jkl012mno345pq”
(tipo) opcional: Tipo de assinaturas a serem listadas: ATIVAS ou CANCELADAS.

•	Requisição: Corpo vazio

•	Resposta:
[
  {
    "id": 101,
    "clienteId": 1,
    "aplicativoId": 2,
    "inicioVigencia": "2024-04-01",
    "fimVigencia": "2024-04-08"
  },
  {
    "id": 102,
    "clienteId": 2,
    "aplicativoId": 1,
    "inicioVigencia": "2024-03-15",
    "fimVigencia": "2024-03-22"
  }
]


9.	 Listar Assinaturas por Cliente

•	Endpoint: GET /api/assinaturas/cliente/:codcli
•	Descrição: Retorna todas as assinaturas associadas a um cliente específico.
•	Parâmetros (Header): Authorization: token
Exemplo de token: “abc123def456ghi789jkl012mno345pq”
(:codcli) - Código único do cliente. (coluna clienteId)

•	Requisição: Corpo vazio

•	Resposta:
[
  {
    "id": 101,
    "clienteId": 1,
    "aplicativoId": 2,
    "inicioVigencia": "2024-04-01",
    "fimVigencia": "2024-04-08"
  }
]


10.	Listar Assinaturas por  Aplicativo

•	Endpoint: GET /api/assinaturas/aplicativo/:codapp
•	Descrição: Retorna todas as assinaturas associadas a um aplicativo específico.
•	Parâmetros (Header): Authorization: token
Exemplo de token: “abc123def456ghi789jkl012mno345pq”
(:codapp) - Código único do aplicativo. (coluna aplicativoId)

•	Requisição: Corpo vazio

•	Resposta:
[
  {
    "id": 101,
    "clienteId": 1,
    "aplicativoId": 2,
    "inicioVigencia": "2024-04-01",
    "fimVigencia": "2024-04-08"
  }
]


11.	Obter Assinatura por ID

•	Endpoint: GET /api/assinaturas/:id
•	Descrição: Retorna os detalhes de uma assinatura específica pelo seu ID.
•	Parâmetros (Header): Authorization: token
Exemplo de token: “abc123def456ghi789jkl012mno345pq”
(:id) - ID único da assinatura. (coluna id)

•	Requisição: Corpo vazio

•	Resposta:
{
  "id": 101,
  "clienteId": 1,
  "aplicativoId": 2,
  "inicioVigencia": "2024-04-01",
  "fimVigencia": "2024-04-08"
}


12.	Obter Validação de Assinatura por Código

•	Endpoint: GET /api/validacoes/:codAssinatura
•	Descrição: Retorna a validação de uma assinatura específica com base no seu código.
•	Parâmetros (Header): Authorization: token
Exemplo de token: “abc123def456ghi789jkl012mno345pq”
(:codAssinatura) - Código único da assinatura a ser validada.. (coluna codAssinatura)

•	Requisição: Corpo vazio

•	Resposta:
{
  "codAssinatura": 123,
  "status": "VALIDA",
  "source": "cache"
}


13.	 Processar um Pagamento

•	Endpoint: POST /api/pagamentos
•	Descrição: Registra e processa um pagamento para uma assinatura específica.
•	Parâmetros: Nenhum
•	Requisição: 
{
  "codAssinatura": 101,
  "valorPago": 29.99
}
•	Resposta:
{
  "id": 501,
  "codAssinatura": 101,
  "valorPago": 29.99,
  "dataPagamento": "2024-04-15"
}
