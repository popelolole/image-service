import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from './image/image.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ImageModule, MongooseModule.forRoot(process.env.MONGODB_URL || 'mongodb://localhost:27017',{dbName: process.env.MONGODB_DATABASE || 'item-db'}),
    KeycloakConnectModule.register({
      authServerUrl: process.env.KEYCLOAK_URL || 'http://localhost:8080',
      realm: process.env.KEYCLOAK_REALM || 'raven',
      clientId: process.env.KEYCLOAK_CLIENT_ID || 'image-service',
      secret: process.env.KEYCLOAK_CLIENT_SECRET || '',
    })],
  controllers: [AppController],
  providers: [AppService, {provide: APP_GUARD, useClass: AuthGuard}],
})
export class AppModule {}
