import { Controller, Get, Post, Body, UploadedFile, UseInterceptors, Param, BadRequestException } from '@nestjs/common';
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
  async uploadImage(@Body() imageData: ImageDto, @UploadedFile() file: Express.Multer.File) {
    console.log(file);
    if(imageData === undefined) return BadRequestException;
    imageData.data = file.buffer;
    imageData.id = null;
    return this.imageService.uploadImage(imageData);
  }

  @Post('/update/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    console.log(file);
    let imageData = new ImageDto();
    imageData.id = id;
    imageData.data = file.buffer;
    return this.imageService.updateImage(imageData);
  }
}
