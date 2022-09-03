import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentMethodDocument = PaymentMethod & Document;

@Schema({ timestamps: true })
export class PaymentMethod {
  @Prop({ required: true })
  paymentMethodName: string;

  @Prop({ required: true })
  discountPercentage: number;
}

export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);
