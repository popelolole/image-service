import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from '../entity/image.db/image.db';
import { ImageDto } from '../dto/image.dto/image.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class Persistence {
  constructor(@InjectModel(Image.name) private imageModel: Model<Image>) {}

  async getAllImages(): Promise<ImageDto[]> {
    const images = await this.imageModel.find();
    return images.map((image) => this.mapToDto(image));
  }

  async getImageById(id: string): Promise<ImageDto> {
    const image = await this.imageModel.findById(id);
    return this.mapToDto(image);
  }

  async uploadImage(imageDto: ImageDto): Promise<ImageDto> {
    const image = new this.imageModel({ name: imageDto.name, data: imageDto.data });
    await image.save();
    return this.mapToDto(image);
  }

  async updateImage(imageDto: ImageDto): Promise<ImageDto> {
    const image = await this.imageModel.findByIdAndUpdate(imageDto.id, {data: imageDto.data});
    return this.mapToDto(image);
  }

  private mapToDto(image: Image): ImageDto {
    let imageDto = new ImageDto();
    imageDto.id = image._id;
    imageDto.name = image.name;
    imageDto.uploaded_by_id = image.uploaded_by_id;
    imageDto.data = image.data;
    return imageDto;
  }
}
