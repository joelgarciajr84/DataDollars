import { Controller, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, EventPattern } from '@nestjs/microservices';
import { microserviceConfig } from '../microserviceConfig';
import { FinancialAnalyzerService } from './financial-analyzer.service';
import { TOPICS, TRANSACTIONS_TYPES } from './topics';

@Controller('financial-analyzer')
export class FinancialAnalyzerController implements OnModuleInit {
  constructor(private financialAnalyzer: FinancialAnalyzerService) {}

  @Client(microserviceConfig)
  clientKafka: ClientKafka;
  onModuleInit() {
    const requestPatterns = TOPICS;

    requestPatterns.forEach((pattern) => {
      console.log('Subscribing to ' + pattern);
      this.clientKafka.subscribeToResponseOf(pattern);
    });
  }

  @EventPattern(TRANSACTIONS_TYPES.CREDIT_CARD)
  async handleCreditCardTransactions(payload: any) {
    this.financialAnalyzer.analyzeTransaction(payload, this.clientKafka);
  }

  @EventPattern(TRANSACTIONS_TYPES.INVESTMENT)
  async handleInvestmentTransactions(payload: any) {
    this.financialAnalyzer.analyzeTransaction(payload, this.clientKafka);
  }

  @EventPattern(TRANSACTIONS_TYPES.DEBIT_CARD)
  async handleDebitCardTransactions(payload: any) {
    this.financialAnalyzer.analyzeTransaction(payload, this.clientKafka);
  }

  @EventPattern(TRANSACTIONS_TYPES.CASH_WITHDRAWAL)
  async handleCashWithdrawals(payload: any) {
    this.financialAnalyzer.analyzeTransaction(payload, this.clientKafka);
  }
}
