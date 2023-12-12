import { Module } from '@nestjs/common';
import { ImageController } from './controller/image.controller';
import { ImageService } from './service/image/image.service';
import { Persistence as ImagePersistence } from './persistence/persistence';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from './entity/image.db/image.db';

@Module({
  imports: [MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }])],
  controllers: [ImageController],
  providers: [ImageService, ImagePersistence]
})
export class ImageModule {}
