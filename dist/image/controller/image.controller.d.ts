/// <reference types="multer" />
import { ImageService } from '../service/image/image.service';
import { ImageDto } from '../dto/image.dto/image.dto';
export declare class ImageController {
    private readonly imageService;
    constructor(imageService: ImageService);
    getAllImages(): Promise<ImageDto[]>;
    getImageById(id: string): Promise<ImageDto>;
    uploadImage(imageData: ImageDto, file: Express.Multer.File): Promise<ImageDto>;
    updateImage(id: string, file: Express.Multer.File, req: any): Promise<ImageDto>;
}
