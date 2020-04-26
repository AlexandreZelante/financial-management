import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(transactions: Transaction[]): Promise<Balance> {
    const valorInicial: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const income = transactions.reduce((accumulator, currentValue) => {
      if (currentValue.type === 'income') {
        const transaction = {
          income: accumulator.income += currentValue.value,
          outcome: accumulator.outcome,
          total: accumulator.total += currentValue.value,
        };
        return transaction;
      }

      if (currentValue.type === 'outcome') {
        const transaction = {
          income: accumulator.income,
          outcome: accumulator.outcome += currentValue.value,
          total: accumulator.total -= currentValue.value,
        };
        return transaction;
      }

      return accumulator;
    }, valorInicial);

    return income;
  }
}

export default TransactionsRepository;
