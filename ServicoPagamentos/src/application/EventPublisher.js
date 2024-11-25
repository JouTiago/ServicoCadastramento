const amqp = require('amqplib');

class EventPublisher {
  constructor() {
    this.channel = null;
    this.initialize();
  }

  async initialize() {
    try {
      const connection = await amqp.connect('amqp://rabbitmq');
      this.channel = await connection.createChannel();
      console.log('Conexão com RabbitMQ estabelecida');
    } catch (error) {
      console.error('Erro ao conectar com RabbitMQ:', error);
    }
  }

  async publish(queue, message) {
    if (!this.channel) {
      console.error('Canal AMQP não está inicializado');
      return;
    }
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
    console.log(`Mensagem publicada na fila ${queue}:`, message);
  }
}

module.exports = EventPublisher;