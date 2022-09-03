import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum PurchaseType {
  MySelf,
  GiftToOther,
}

export type EVocherDocument = EVocher & Document;

@Schema({ timestamps: true })
export class EVocher {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  expiryDate: Date;

  @Prop({ required: true })
  imageURL: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  totalAvaliableQuantity: number;

  @Prop({ type: String, enum: PurchaseType })
  purchaseType: string;
}
