import { Inject, Injectable } from '@nestjs/common';
import { YooCheckout } from '@a2seven/yoo-checkout';
import { PaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentDevService {
  constructor(
    @Inject('YOO_CHECKOUT_DEV')
    private readonly yooCheckoutDev: YooCheckout,
  ) {}

  async processPayment(paymentDto: PaymentDto) {
    const payment = await this.yooCheckoutDev.createPayment({
      amount: { value: paymentDto.amount.toString(), currency: 'RUB' },
      payment_method_data: { type: paymentDto.paymentMethod },
      confirmation: {
        type: 'redirect',
        return_url: process.env.PAYMENT_RETURN_URL,
      },
      capture: true,
      description: `Dev payment via ${paymentDto.paymentMethod}`,
    });

    return {
      paymentUrl: payment.confirmation.confirmation_url,
    };
  }
}
