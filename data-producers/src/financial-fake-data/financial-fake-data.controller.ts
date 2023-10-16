import { Controller, Get } from '@nestjs/common';
import { FinancialFakeDataService } from './financial-fake-data.service';

@Controller()
export class FinancialFakeDataController {
  constructor(
    private readonly financialFakeDataService: FinancialFakeDataService,
  ) {}

  @Get('generate-financial-fake-data')
  async sendFakeFinancialDataToKafka() {
    await this.financialFakeDataService.sendFakeDataToKafka();
    return {
      message: 'Fake financial data sent to Kafka',
    };
  }
}
