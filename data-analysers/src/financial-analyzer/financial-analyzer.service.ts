import { Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Kafka, Consumer, Producer, logLevel } from 'kafkajs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FinancialAnalyzerService {
  private kafka: Kafka;
  private consumer: Consumer;
  private producer: Producer;
  client: ClientKafka;

  // constructor(client: ClientKafka) {
  //   this.kafka = new Kafka({
  //     clientId: 'financial-analyzer',
  //     brokers: ['kafka:9092'],
  //   });
  //   this.client = client;
    

  // //CREATE GROUPD ID
  //   const groupId = uuidv4();
  //   this.consumer = this.kafka.consumer({groupId});
  //   this.producer = this.kafka.producer();
  //   this.detect_anomalies('credit_card_transactions');
  //   this.detect_anomalies('investment_transactions');
  //   this.detect_anomalies('debit_card_transactions');
  //   this.detect_anomalies('cash_withdrawals');
  // }

  async onModuleInit() {
    this.client.subscribeToResponseOf('credit_card_transactions');
    await this.client.connect();
  }
  

  private async detect_anomalies(topic_name:string) {

    if(!this.consumer){
      await this.consumer.connect();
    }
    await this.consumer.subscribe({ topic:topic_name});
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const data = JSON.parse(message.value.toString());
        const analysisResult = this.analyzeFinancialData(data);
        console.log('Analisando dados financeiros')

        const topic = analysisResult.isAnomaly ? 'anomaly_alerts' : 'normal_data';

        await this.produceToTopic('alerts', analysisResult.data);
      },
    });
  }

  async stop() {
    await this.consumer.disconnect();
    await this.producer.disconnect();
  }

  private analyzeFinancialData(data) {
    // Realize a análise dos dados aqui para detectar anomalias
    const isAnomaly = false; // Defina isso com base na análise

    return {
      isAnomaly,
      data,
    };
  }

  private async produceToTopic(topic: string, data: any) {
    await this.producer.connect();
    await this.producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(data) }]
    });
    await this.producer.disconnect();
  }
}
