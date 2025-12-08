import { Body, Controller, Post } from '@nestjs/common';
import { PaymentDevService } from './payment.dev.service';
import { PaymentDto } from './dto/payment.dto';

@Controller('payments-dev')
export class PaymentDevController {
  constructor(private readonly devService: PaymentDevService) {}

  @Post()
  async createPayment(@Body() paymentDto: PaymentDto) {
    return this.devService.processPayment(paymentDto);
  }
}
