import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class PaymentDto {
  @Type(() => Number)
  @IsNumber({}, { message: 'Amount must be a number' })
  @IsPositive({ message: 'Amount must be a positive number' })
  amount: number;

  @IsString()
  @IsNotEmpty({ message: 'Payment method is required' })
  @IsIn(['card', 'paypal', 'cash'], {
    message: 'Payment method must be one of card, paypal, cash',
  })
  paymentMethod: string;
}
