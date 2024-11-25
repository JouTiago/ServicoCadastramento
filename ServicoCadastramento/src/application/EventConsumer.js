const amqp = require('amqplib');
const moment = require('moment');

class EventConsumer {
  constructor(assinaturaUsecase) {
    this.assinaturaUsecase = assinaturaUsecase;
    this.init();
  }

  async init() {
    try {
      const connection = await amqp.connect('amqp://rabbitmq');
      const channel = await connection.createChannel();
      const queue = 'pagamentos_queue';

      await channel.assertQueue(queue, { durable: true });

      console.log(`ServicoCadastramento aguardando mensagens na fila ${queue}`);

      channel.consume(
        queue,
        async (msg) => {
          if (msg !== null) {
            try {
              const event = JSON.parse(msg.content.toString());
              console.log('Evento recebido no ServicoCadastramento:', event);

              const { codAssinatura, valorPago } = event;

              await this.assinaturaUsecase.processarPagamento(codAssinatura, valorPago);

              channel.ack(msg);
            } catch (error) {
              console.error('Erro ao processar mensagem:', error);
            }
          }
        },
        { noAck: false }
      );
    } catch (error) {
      console.error('Erro no EventConsumer do ServicoCadastramento:', error);
    }
  }
}

module.exports = EventConsumer;