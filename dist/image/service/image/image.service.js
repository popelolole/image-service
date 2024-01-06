"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const common_1 = require("@nestjs/common");
const persistence_1 = require("../../persistence/persistence");
let ImageService = class ImageService {
    constructor(persistence) {
        this.persistence = persistence;
    }
    async getAllImages() {
        const images = await this.persistence.getAllImages();
        if (!images || images.length == 0) {
            throw new common_1.NotFoundException('Images not found!');
        }
        return images;
    }
    async getImageById(id) {
        const image = await this.persistence.getImageById(id);
        if (!image) {
            throw new common_1.NotFoundException('Image not found!');
        }
        return image;
    }
    async uploadImage(imageDto) {
        const createdImage = await this.persistence.uploadImage(imageDto);
        return createdImage;
    }
    async updateImage(imageDto) {
        const newImage = await this.persistence.updateImage(imageDto);
        return newImage;
    }
};
exports.ImageService = ImageService;
exports.ImageService = ImageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [persistence_1.Persistence])
], ImageService);
//# sourceMappingURL=image.service.js.map