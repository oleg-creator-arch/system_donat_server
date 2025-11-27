import type { IPaymentMethodType } from '@a2seven/yoo-checkout';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

const validPaymentMethods: IPaymentMethodType[] = [
  'bank_card',
  'sberbank',
  'tinkoff_bank',
  'sbp',
];

export class PaymentDto {
  @Type(() => Number)
  @IsInt({ message: 'Amount must be an integer' })
  @IsPositive({ message: 'Amount must be a positive number' })
  @Min(10, { message: 'Amount must be at least 10' })
  amount: number;

  @IsString()
  @IsNotEmpty({ message: 'Payment method is required' })
  @IsIn(validPaymentMethods, {
    message: 'Payment method must be one of card, paypal, cash',
  })
  paymentMethod: IPaymentMethodType;
}
