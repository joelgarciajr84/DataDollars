import { Module } from '@nestjs/common';
import { FinancialAnalyzerController } from './financial-analyzer.controller';
import { FinancialAnalyzerService } from './financial-analyzer.service';

@Module({
  providers: [
    FinancialAnalyzerService,
  ],
  controllers: [FinancialAnalyzerController],
})
export class FinancialAnalyzerModule {}
