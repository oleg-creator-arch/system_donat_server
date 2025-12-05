import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { YooCheckout } from '@a2seven/yoo-checkout';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PaymentWebhookController } from './payment.webhook.controller';

@Module({
  imports: [PrismaModule],
  controllers: [PaymentController, PaymentWebhookController],
  providers: [
    PaymentService,
    {
      provide: 'YOO_CHECKOUT',
      useFactory: () => {
        const shopId = process.env.SHOPID;
        const secretKey = process.env.SECRETYOUKASSA;

        if (!shopId || !secretKey) {
          throw new Error(
            'Missing SHOPID or SECRETYOUKASSA in environment variables',
          );
        }

        return new YooCheckout({ shopId, secretKey });
      },
    },
  ],
  exports: ['YOO_CHECKOUT', PaymentService],
})
export class PaymentModule {}
