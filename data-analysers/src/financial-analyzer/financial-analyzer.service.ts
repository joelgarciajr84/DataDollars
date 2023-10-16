import { Injectable } from '@nestjs/common';
import { TRANSACTIONS_TYPES } from './topics';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class FinancialAnalyzerService {
  private static readonly ANOMALY_AMOUNT_TOO_HIGH = 'amount_too_high';
  private static readonly ANOMALY_AMOUNT_TOO_LOW = 'amount_too_low';
  private static readonly ANOMALY_INVESTMENT_TYPE_INVALID = 'investment_type_invalid';
  private static readonly ANOMALY_ATM_LOCATION_INVALID = 'atm_location_invalid';
  private static readonly STATUS_VALID = 'valid';
  private static readonly STATUS_INVALID = 'invalid';
  private static readonly TRANSACTION_AMOUNT_UPPER_LIMIT = 1000;
  private static readonly TRANSACTION_AMOUNT_LOWER_LIMIT = 55;
  private static readonly INVESTMENT_TYPE_BONDS = 'Bonds';
  private static readonly ATM_LOCATION_ATM789 = 'ATM789';

  constructor() {}

  public async analyzeTransaction(payload: any, clientKafka: ClientKafka) {
    const transactionType = payload.transaction_type;

    let result;
    let status;

    switch (transactionType) {
      case TRANSACTIONS_TYPES.CREDIT_CARD:
        result = this.checkAmount(payload);
        break;
      case TRANSACTIONS_TYPES.INVESTMENT:
        result = this.checkInvestmentType(payload);
        break;
      case TRANSACTIONS_TYPES.DEBIT_CARD:
        result = this.checkLocation(payload);
        break;
      case TRANSACTIONS_TYPES.CASH_WITHDRAWAL:
        result = this.checkLocation(payload);
        break;
      default:
        return;
    }

    status = result.status;
    const topic = `${transactionType}_${status}`;
    clientKafka.emit(topic, result.payload);
  }

  private checkInvestmentType(payload: any) {
    if (payload.investment_type === FinancialAnalyzerService.INVESTMENT_TYPE_BONDS) {
      this.logAnomaly(FinancialAnalyzerService.ANOMALY_INVESTMENT_TYPE_INVALID);
      return this.createResult(payload, FinancialAnalyzerService.STATUS_INVALID, FinancialAnalyzerService.ANOMALY_INVESTMENT_TYPE_INVALID);
    }

    return this.createResult(payload, FinancialAnalyzerService.STATUS_VALID);
  }

  private checkLocation(payload: any) {
    if (payload.atm_location === FinancialAnalyzerService.ATM_LOCATION_ATM789) {
      this.logAnomaly(FinancialAnalyzerService.ANOMALY_ATM_LOCATION_INVALID);
      return this.createResult(payload, FinancialAnalyzerService.STATUS_INVALID, FinancialAnalyzerService.ANOMALY_ATM_LOCATION_INVALID);
    }

    return this.createResult(payload, FinancialAnalyzerService.STATUS_VALID);
  }

  private checkAmount(payload: any) {
    if (payload.transaction_amount > FinancialAnalyzerService.TRANSACTION_AMOUNT_UPPER_LIMIT || payload.transaction_amount < FinancialAnalyzerService.TRANSACTION_AMOUNT_LOWER_LIMIT) {
      const anomaly = payload.transaction_amount > FinancialAnalyzerService.TRANSACTION_AMOUNT_UPPER_LIMIT ? FinancialAnalyzerService.ANOMALY_AMOUNT_TOO_HIGH : FinancialAnalyzerService.ANOMALY_AMOUNT_TOO_LOW;
      this.logAnomaly(anomaly);
      return this.createResult(payload, FinancialAnalyzerService.STATUS_INVALID, anomaly);
    }

    return this.createResult(payload, FinancialAnalyzerService.STATUS_VALID);
  }

  private logAnomaly(anomaly: string) {
    console.log('Anomaly detected: ' + anomaly);
  }

  private createResult(payload: any, status: string, anomaly?: string) {
    if (anomaly) {
      payload.anomaly = anomaly;
    }
    return { payload, status };
  }
}
