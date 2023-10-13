import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FinancialAnalyzerModule } from './financial-analyzer/financial-analyzer.module';

@Module({
  imports: [FinancialAnalyzerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
