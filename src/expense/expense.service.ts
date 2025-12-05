// src/expense/expense.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Expense, Prisma } from '@prisma/client';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  createExpense(data: Prisma.ExpenseCreateInput): Promise<Expense> {
    return this.prisma.expense.create({ data });
  }

  getAllExpenses(): Promise<Expense[]> {
    return this.prisma.expense.findMany();
  }

  getExpenseById(id: number): Promise<Expense | null> {
    return this.prisma.expense.findUnique({ where: { id } });
  }

  updateExpense(id: number, data: Prisma.ExpenseUpdateInput): Promise<Expense> {
    return this.prisma.expense.update({ where: { id }, data });
  }

  deleteExpense(id: number): Promise<Expense> {
    return this.prisma.expense.delete({ where: { id } });
  }
}
