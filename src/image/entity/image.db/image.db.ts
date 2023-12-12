import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type ImageDocument = HydratedDocument<Image>;

@Schema()
export class Image extends Document {
  @Prop({name: `_id`})
  id: string;

  @Prop()
  name: string;

  @Prop()
  uploaded_by_id: string;

  @Prop({ type: Buffer })
  data: Buffer;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
