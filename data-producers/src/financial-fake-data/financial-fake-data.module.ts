import { Module } from '@nestjs/common';
import { FinancialFakeDataService } from './financial-fake-data.service';
import { FinancialFakeDataController } from './financial-fake-data.controller';
import { KafkaProducerService } from './kafka-producer-service.service';

@Module({
  providers: [FinancialFakeDataService, KafkaProducerService],
  controllers: [FinancialFakeDataController]
})
export class FinancialFakeDataModule {}
