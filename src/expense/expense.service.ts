// src/expense/expense.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Expense } from '@prisma/client';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  getAllExpenses(): Promise<Expense[]> {
    return this.prisma.expense.findMany();
  }
}
