import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { Prisma } from '@prisma/client';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  create(@Body() data: Prisma.ExpenseCreateInput) {
    return this.expenseService.createExpense(data);
  }

  @Get()
  getAll() {
    return this.expenseService.getAllExpenses();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.getExpenseById(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Prisma.ExpenseUpdateInput,
  ) {
    return this.expenseService.updateExpense(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.deleteExpense(id);
  }
}
