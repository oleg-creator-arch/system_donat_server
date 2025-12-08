import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { YooCheckout } from '@a2seven/yoo-checkout';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PaymentWebhookController } from './payment.webhook.controller';
import { PaymentDevController } from './payment.dev.controller copy';
import { PaymentDevService } from './payment.dev.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    PaymentController,
    PaymentWebhookController,
    PaymentDevController,
  ],
  providers: [
    PaymentService,
    PaymentDevService,
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
    {
      provide: 'YOO_CHECKOUT_DEV',
      useFactory: () => {
        const shopId = process.env.SHOPID_DEV;
        const secretKey = process.env.SECRETYOUKASSA_DEV;

        if (!shopId || !secretKey) {
          throw new Error('Missing SHOPID_DEV or SECRETYOUKASSA_DEV');
        }

        return new YooCheckout({ shopId, secretKey });
      },
    },
  ],
  exports: ['YOO_CHECKOUT', PaymentService],
})
export class PaymentModule {}
