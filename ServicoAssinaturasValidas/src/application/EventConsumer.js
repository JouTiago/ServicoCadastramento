const amqp = require('amqplib');

class EventConsumer {
  constructor(validacaoUsecase) {
    this.validacaoUsecase = validacaoUsecase;
    this.queue = 'pagamentos_queue';
    this.connection = null;
    this.channel = null;
    this.isConsuming = false;
    this.init();
  }

  async init() {
    try {
      console.log(`Inicializando EventConsumer para a fila ${this.queue}...`);

      this.connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://rabbitmq');
      this.channel = await this.connection.createChannel();

      await this.channel.assertQueue(this.queue, { durable: true });

      console.log(`Aguardando mensagens na fila ${this.queue}...`);
      this.startConsuming();
    } catch (error) {
      console.error('Erro ao inicializar o EventConsumer:', error);
      this.reconnect();
    }
  }

  async startConsuming() {
    try {
      if (this.isConsuming) return;

      this.isConsuming = true;
      this.channel.consume(
        this.queue,
        async (msg) => {
          if (msg !== null) {
            try {
              const event = JSON.parse(msg.content.toString());
              console.log('Evento recebido:', event);

              await this.validacaoUsecase.atualizarCache(event);

              this.channel.ack(msg);
              console.log(`Mensagem processada e removida da fila ${this.queue}`);
            } catch (error) {
              console.error('Erro ao processar mensagem:', error);
              this.channel.nack(msg, false, false);
            }
          }
        },
        { noAck: false }
      );
    } catch (error) {
      console.error('Erro ao iniciar o consumo de mensagens:', error);
      this.reconnect();
    }
  }

  async reconnect() {
    console.log('Tentando reconectar ao RabbitMQ...');
    this.isConsuming = false;

    setTimeout(() => {
      this.init();
    }, 5000);
  }
}

module.exports = EventConsumer;