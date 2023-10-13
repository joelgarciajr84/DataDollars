import { Controller, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, EventPattern } from '@nestjs/microservices';
import { microserviceConfig } from 'src/microserviceConfig';

@Controller('financial-analyzer')
export class FinancialAnalyzerController implements OnModuleInit {
  private client: ClientKafka;
  constructor() {}

  @Client(microserviceConfig)
  clientKafka: ClientKafka;
  onModuleInit() {
    const requestPatterns = [
      'credit_card_transactions',
      'investment_transactions',
      'debit_card_transactions',
      'cash_withdrawals',
    ];

    requestPatterns.forEach((pattern) => {
      console.log('Subscribing to ' + pattern);
      this.clientKafka.subscribeToResponseOf(pattern);
    });
  }

  @EventPattern('credit_card_transactions')
  async handleCreditCardTransactions(payload: any) {
    console.log(JSON.stringify(payload) + ' READED');
    this.clientKafka.emit('credit_card_transactions_valid', payload);

  }

  @EventPattern('investment_transactions')
  async handleInvestmentTransactions(payload: any) {
    console.log(JSON.stringify(payload) + ' READED');
    this.clientKafka.emit('investment_transactions_valid', payload);


  }

  @EventPattern('debit_card_transactions')
  async handleDebitCardTransactions(payload: any) {
    console.log(JSON.stringify(payload) + ' READED');
    this.clientKafka.emit('debit_card_transactions_valid', payload);

  }

  @EventPattern('cash_withdrawals')
  async handleCashWithdrawals(payload: any) {
    console.log(JSON.stringify(payload) + ' READED');
    this.clientKafka.emit('cash_withdrawals_valid', payload);

  }
}
