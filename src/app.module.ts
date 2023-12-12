import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from './image/image.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ImageModule, MongooseModule.forRoot('mongodb://localhost:32000',{dbName: 'item-db'})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
