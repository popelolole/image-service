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
  imports: [ImageModule, MongooseModule.forRoot('mongodb://vm.cloud.cbh.kth.se:2525',{dbName: 'item-db'}),
    KeycloakConnectModule.register({
      authServerUrl: 'https://raven-keycloak.vm-app.cloud.cbh.kth.se/',
      realm: 'raven',
      clientId: 'image-service',
      secret: 'xNjlkqj8o1jFPsBA4Mdv34EN3SF04BOW',
    })],
  controllers: [AppController],
  providers: [AppService, {provide: APP_GUARD, useClass: AuthGuard}],
})
export class AppModule {}
