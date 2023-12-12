import { Controller, Get, Post, Body, UploadedFile, UseInterceptors, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from '../service/image/image.service';
import { ImageDto } from '../dto/image.dto/image.dto';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  async getAllImages() {
    return this.imageService.getAllImages();
  }

  @Get('/:id')
  async getImageById(@Param('id') id: string) {
    return this.imageService.getImageById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@Body('name') name: string, @UploadedFile() file: Express.Multer.File) {
    console.log(file);
    let image = new ImageDto();
    image.name = name;
    image.data = file.buffer;
    return this.imageService.uploadImage(image);
  }
}
