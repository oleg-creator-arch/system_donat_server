import { Injectable } from '@nestjs/common';
import { PaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentService {
  processPayment(paymentDto: PaymentDto) {
    console.log('Processing payment:', paymentDto);
    return {
      status: 'success',
      amount: paymentDto.amount,
      method: paymentDto.paymentMethod,
    };
  }
}
