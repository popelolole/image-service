import { Injectable, NotFoundException  } from '@nestjs/common';
import { ImageDto } from 'src/image/dto/image.dto/image.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from 'src/image/entity/image.db/image.db';
import { Persistence } from 'src/image/persistence/persistence';

@Injectable()
export class ImageService {
  constructor(private readonly persistence: Persistence) {}

  async getAllImages(): Promise<ImageDto[]> { 
    const images = await this.persistence.getAllImages();  
    
    if (!images || images.length == 0) {
      throw new NotFoundException('Images not found!');
    }

    return images;
  }

  async getImageById(id: string): Promise<ImageDto> { 
    const image = await this.persistence.getImageById(id);  
    
    if (!image) {
      throw new NotFoundException('Image not found!');
    }

    return image;
  }

  async uploadImage(imageDto: ImageDto): Promise<ImageDto> {
    const createdImage = await this.persistence.uploadImage(imageDto);
    return createdImage;
  }

  async updateImage(imageDto: ImageDto): Promise<ImageDto> {
    const newImage = await this.persistence.updateImage(imageDto);
    return newImage;
  }
}
