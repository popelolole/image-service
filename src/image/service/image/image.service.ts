import { Injectable } from '@nestjs/common';
import { ImageDto } from 'src/image/dto/image.dto/image.dto';

@Injectable()
export class ImageService {
  getAllImages(): string {
    return 'Hello World!';
  }

  uploadImage(imageDto: ImageDto): string {
    return 'File created successfully';
  }
}
