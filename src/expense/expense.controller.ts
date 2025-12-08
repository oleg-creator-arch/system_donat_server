import { Controller, Get } from '@nestjs/common';
import { ExpenseService } from './expense.service';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  getAll() {
    return this.expenseService.getAllExpenses();
  }
}
