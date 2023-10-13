import { Injectable, Logger } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class KafkaProducerService {
  private kafka: Kafka;
  private producer: Producer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'nestjs-kafka-producer',
      brokers: ['kafka:9092'],
    });

    this.producer = this.kafka.producer();
  }

  async connect() {
    try {
      await this.producer.connect();
    //  await this.createTopics();
      Logger.log('Connected to Kafka producer.');
    } catch (error) {
      Logger.error('Error connecting to Kafka producer', error);
      throw error;
    }
  }

  getProducer() {
    return this.producer;
  }

  async sendToKafka(topic: string, message: string) {
    const producerRecord: ProducerRecord = {
      topic,
      messages: [{ value: message }],
    };

    try {
      await this.producer.send(producerRecord);
      Logger.log(`Sent message to Kafka topic: ${topic}`);
    } catch (error) {
      Logger.error(`Error sending message to Kafka topic: ${topic}`, error);
    }
  }

  async disconnect() {
    try {
      await this.producer.disconnect();
      Logger.log('Disconnected from Kafka producer.');
    } catch (error) {
      Logger.error('Error disconnecting from Kafka producer', error);
    }
  }
}
