/* eslint-disable no-await-in-loop */
import csvParse from 'csv-parse';
import fs from 'fs';
import path from 'path';
import { getCustomRepository, getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class ImportTransactionsService {
  async loadCSV(filePath: string): Promise<any> {
    const readCSVStream = fs.createReadStream(filePath);

    const parseStream = csvParse({
      from_line: 2,
      ltrim: true,
      rtrim: true,
    });

    const parseCSV = readCSVStream.pipe(parseStream);

    const lines: any = [];

    parseCSV.on('data', line => {
      lines.push(line);
    });

    await new Promise(resolve => {
      parseCSV.on('end', resolve);
    });

    return lines;
  }

  async execute(filepath: string): Promise<Transaction[]> {
    const csvFilePath = path.resolve(filepath);

    const data = await this.loadCSV(csvFilePath);

    const transactionsRepository = getCustomRepository(TransactionsRepository);

    // const [title, type, value, category] = data[0];
    const transactions: Transaction[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const transactionLine of data) {
      const [title, type, value, category] = transactionLine;

      // const title: string = transactionLine[0];
      // const type: 'income' | 'outcome' = transactionLine[1];
      // const value: number = transactionLine[2];
      // const category: string = transactionLine[3];

      // Parte do category
      const categoryRepository = getRepository(Category);
      // eslint-disable-next-line no-await-in-loop
      const checkCategoryExists = await categoryRepository.findOne({
        where: { title: category },
      });

      let category_id = null;

      if (!checkCategoryExists) {
        const newCategory = categoryRepository.create({
          title: category,
        });

        await categoryRepository.save(newCategory);

        // console.log('apos new category', newCategory);

        category_id = newCategory.id;
      } else {
        category_id = checkCategoryExists.id;
      }

      // ------

      const transaction = transactionsRepository.create({
        title,
        type,
        value,
        category_id,
      });

      transactions.push(transaction);

      await transactionsRepository.save(transaction);
    }
    return transactions;
  }
}

export default ImportTransactionsService;
