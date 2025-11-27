import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  processPayment(@Body() paymentDto: PaymentDto) {
    return this.paymentService.processPayment(paymentDto);
  }
}
