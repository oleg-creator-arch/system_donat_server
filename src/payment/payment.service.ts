import { Inject, Injectable } from '@nestjs/common';
import { PaymentDto } from './dto/payment.dto';
import { YooCheckout } from '@a2seven/yoo-checkout';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentMethod, PaymentStatus } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('YOO_CHECKOUT') private readonly yooCheckout: YooCheckout,
    private readonly prisma: PrismaService,
  ) {}

  async processPayment(paymentDto: PaymentDto) {
    const payment = await this.yooCheckout.createPayment({
      amount: { value: paymentDto.amount.toString(), currency: 'RUB' },
      payment_method_data: { type: paymentDto.paymentMethod },
      confirmation: {
        type: 'redirect',
        return_url: process.env.PAYMENT_RETURN_URL,
      },
      capture: true,
      description: `Payment via ${paymentDto.paymentMethod}`,
    });

    await this.prisma.payment.create({
      data: {
        paymentId: payment.id,
        amount: paymentDto.amount,
        method: paymentDto.paymentMethod as PaymentMethod,
        status: PaymentStatus.pending,
      },
    });

    return {
      paymentUrl: payment.confirmation.confirmation_url,
    };
  }

  async getStatistics() {
    const totalCollected = await this.prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: 'succeeded' },
    });

    const totalExpenses = await this.prisma.expense.aggregate({
      _sum: { amount: true },
    });

    return {
      collected: totalCollected._sum.amount || 0,
      expenses: totalExpenses._sum.amount || 0,
    };
  }
}
