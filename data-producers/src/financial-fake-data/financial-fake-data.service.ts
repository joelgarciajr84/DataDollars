import { Injectable } from '@nestjs/common';
import { fakeMockData } from './fake_data/fakemockdata';
import { KafkaProducerService } from './kafka-producer-service.service';

@Injectable()
export class FinancialFakeDataService {
  constructor(private readonly kafkaProducerService: KafkaProducerService) {}

  public async sendFakeDataToKafka() {
    try {
      for (const transactionType in fakeMockData) {
        if (Object.prototype.hasOwnProperty.call(fakeMockData, transactionType)) {
          const transactions = fakeMockData[transactionType];
          await this.sendTransactionsToKafka(transactions);
        }
      }
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }



  private async sendTransactionsToKafka(transactions: any[]) {
    const producer = this.kafkaProducerService.getProducer();

    try {
      await producer.connect();
      for (const transaction of transactions) {
        const message = {
          value: JSON.stringify(transaction),
        };
        const topic = transaction.transaction_type;
        console.log(`Sending message to Kafka topic: ${topic}`)
        await producer.send({
          topic,
          messages: [message],
        });
      }
    } catch (error) {
        console.error(JSON.stringify(error));
        throw error;
    } finally {
     // await producer.disconnect();
    }
  }
}
