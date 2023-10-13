import { Module } from '@nestjs/common';
import { FinancialAnalyzerController } from './financial-analyzer.controller';

@Module({
  providers: [],
  controllers: [FinancialAnalyzerController]
})
export class FinancialAnalyzerModule {}
