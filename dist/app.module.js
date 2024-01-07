"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const image_module_1 = require("./image/image.module");
const mongoose_1 = require("@nestjs/mongoose");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const core_1 = require("@nestjs/core");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [image_module_1.ImageModule, mongoose_1.MongooseModule.forRoot('mongodb://vm.cloud.cbh.kth.se:2525', { dbName: 'item-db' }),
            nest_keycloak_connect_1.KeycloakConnectModule.register({
                authServerUrl: 'https://raven-keycloak.vm-app.cloud.cbh.kth.se/',
                realm: 'raven',
                clientId: 'image-service',
                secret: 'xNjlkqj8o1jFPsBA4Mdv34EN3SF04BOW',
            })],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, { provide: core_1.APP_GUARD, useClass: nest_keycloak_connect_1.AuthGuard }],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map