import { Controller, Post, Req, HttpCode } from '@nestjs/common';
import type { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentStatus } from '@prisma/client';

interface YooWebhookObject {
  id: string;
  amount?: { value: string; currency: string };
}

type YooWebhookEvent = 'payment.succeeded' | 'payment.canceled';

interface YooWebhookBody {
  event: YooWebhookEvent;
  object: YooWebhookObject;
}

interface RawBodyRequest extends Request {
  rawBody?: string;
}

@Controller('payments')
export class PaymentWebhookController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('notification')
  @HttpCode(200)
  async handleWebhook(@Req() req: RawBodyRequest) {
    const rawBody = req.rawBody;
    if (!rawBody) {
      console.log('Missing raw body');
      return { ok: false };
    }

    let body: YooWebhookBody;
    try {
      body = JSON.parse(rawBody) as YooWebhookBody;
    } catch (err) {
      console.log('Invalid JSON body', err);
      return { ok: false };
    }

    const { event, object } = body;
    if (!object?.id) {
      console.log('Missing payment ID');
      return { ok: false };
    }

    let newStatus: PaymentStatus | null = null;
    switch (event) {
      case 'payment.succeeded':
        newStatus = PaymentStatus.succeeded;
        break;
      case 'payment.canceled':
        newStatus = PaymentStatus.canceled;
        break;
      default:
        console.log('Unknown event type:', event);
        return { ok: false };
    }

    if (newStatus) {
      try {
        await this.prisma.payment.update({
          where: { paymentId: object.id },
          data: { status: newStatus },
        });
        console.log(`Payment ${object.id} status updated to ${newStatus}`);
      } catch (err) {
        console.log('Error updating payment in DB:', err);
        return { ok: false };
      }
    }

    return { ok: true };
  }
}
