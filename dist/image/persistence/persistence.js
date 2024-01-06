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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Persistence = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const image_db_1 = require("../entity/image.db/image.db");
const image_dto_1 = require("../dto/image.dto/image.dto");
let Persistence = class Persistence {
    constructor(imageModel) {
        this.imageModel = imageModel;
    }
    async getAllImages() {
        const images = await this.imageModel.find();
        return images.map((image) => this.mapToDto(image));
    }
    async getImageById(id) {
        const image = await this.imageModel.findById(id);
        return this.mapToDto(image);
    }
    async uploadImage(imageDto) {
        const image = new this.imageModel({ name: imageDto.name, data: imageDto.data });
        await image.save();
        return this.mapToDto(image);
    }
    async updateImage(imageDto) {
        const image = await this.imageModel.findByIdAndUpdate(imageDto.id, { data: imageDto.data });
        return this.mapToDto(image);
    }
    mapToDto(image) {
        let imageDto = new image_dto_1.ImageDto();
        imageDto.id = image._id;
        imageDto.name = image.name;
        imageDto.uploaded_by_id = image.uploaded_by_id;
        imageDto.data = image.data;
        return imageDto;
    }
};
exports.Persistence = Persistence;
exports.Persistence = Persistence = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(image_db_1.Image.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], Persistence);
//# sourceMappingURL=persistence.js.map