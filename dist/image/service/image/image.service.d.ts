import { ImageDto } from 'src/image/dto/image.dto/image.dto';
import { Persistence } from '../../persistence/persistence';
export declare class ImageService {
    private readonly persistence;
    constructor(persistence: Persistence);
    getAllImages(): Promise<ImageDto[]>;
    getImageById(id: string): Promise<ImageDto>;
    uploadImage(imageDto: ImageDto): Promise<ImageDto>;
    updateImage(imageDto: ImageDto): Promise<ImageDto>;
}
