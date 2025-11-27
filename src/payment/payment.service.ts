import { Inject, Injectable } from '@nestjs/common';
import { PaymentDto } from './dto/payment.dto';
import { YooCheckout } from '@a2seven/yoo-checkout';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('YOO_CHECKOUT') private readonly yooCheckout: YooCheckout,
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

    return {
      paymentUrl: payment.confirmation.confirmation_url,
    };
  }
}
