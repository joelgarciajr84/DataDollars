import { randomUUID } from "crypto";

export const fakeMockData = {
  credit_card_transactions: [
    {
      id: randomUUID(),
      transaction_type: 'credit_card',
      card_holder_name: 'João Silva',
      card_number: '**** **** **** 1234',
      transaction_amount: 150.0,
      merchant_name: 'Loja A',
      timestamp: new Date().toISOString(),
    },
    {
      id: randomUUID(),
      transaction_type: 'credit_card',
      card_holder_name: 'Maria Oliveira',
      card_number: '**** **** **** 5678',
      transaction_amount: 2000.0, // Valor anormalmente alto
      merchant_name: 'Loja B',
      timestamp: new Date().toISOString(),
    },
    {
      id: randomUUID(),
      transaction_type: 'credit_card',
      card_holder_name: 'José Santos',
      card_number: '**** **** **** 9012',
      transaction_amount: 2.0, // Valor anormalmente baixo
      merchant_name: 'Loja C',
      timestamp: new Date().toISOString(),
    },
  ],
  investment_transactions: [
    {
      id: randomUUID(),
      transaction_type: 'investment',
      account_holder: 'Maria Santos',
      investment_type: 'Stocks',
      transaction_amount: 500.0,
      company_name: 'Tech Corp',
      timestamp: new Date().toISOString(),
    },
    {
      id: randomUUID(),
      transaction_type: 'investment',
      account_holder: 'João Silva',
      investment_type: 'Bonds', // Tipo de investimento anormal
      transaction_amount: 50000.0, // Valor anormalmente alto
      company_name: 'Bond Co.',
      timestamp: new Date().toISOString(),
    },
  ],
  debit_card_transactions: [
    {
      id: randomUUID(),
      transaction_type: 'debit_card',
      card_holder_name: 'Carlos Oliveira',
      card_number: '**** **** **** 5678',
      transaction_amount: 75.0,
      merchant_name: 'Supermart',
      timestamp: new Date().toISOString(),
    },
    {
      id: randomUUID(),
      transaction_type: 'debit_card',
      card_holder_name: 'Ana Rodrigues',
      card_number: '**** **** **** 4321',
      transaction_amount: 1200.0, // Valor anormalmente alto
      merchant_name: 'Luxury Boutique',
      timestamp: new Date().toISOString(),
    },
  ],
  cash_withdrawals: [
    {
      id: randomUUID(),
      transaction_type: 'cash_withdrawal',
      account_holder: 'Ana Rodrigues',
      transaction_amount: 50.0,
      atm_location: 'ATM123',
      timestamp: new Date().toISOString(),
    },
    {
      id: randomUUID(),
      transaction_type: 'cash_withdrawal',
      account_holder: 'Carlos Oliveira',
      transaction_amount: 10.0, // Valor anormalmente baixo
      atm_location: 'ATM456',
      timestamp: new Date().toISOString(),
    },
    {
      id: randomUUID(),
      transaction_type: 'cash_withdrawal',
      account_holder: 'José Santos',
      transaction_amount: 500.0,
      atm_location: 'ATM789', // Local de saque anormal
      timestamp: new Date().toISOString(),
    },
  ],
};
