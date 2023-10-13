import { Module } from '@nestjs/common';
import { FinancialFakeDataModule } from './financial-fake-data/financial-fake-data.module';

@Module({
  imports: [FinancialFakeDataModule],
  providers: [],
})
export class AppModule {}
