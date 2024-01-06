import { Test, TestingModule } from '@nestjs/testing';
import { ImageService } from './image.service';
import { Persistence } from '../../persistence/persistence';
import { NotFoundException } from '@nestjs/common';

describe('ImageService', () => {
  let imageService: ImageService;
  let persistence: Persistence;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImageService,
        {
          provide: Persistence,
          useValue: {
            getAllImages: jest.fn(),
            getImageById: jest.fn(),
            uploadImage: jest.fn(),
            updateImage: jest.fn(),
          },
        },
      ],
    }).compile();

    imageService = module.get<ImageService>(ImageService);
    persistence = module.get<Persistence>(Persistence);
  });

  it('should be defined', () => {
    expect(imageService).toBeDefined();
  });

  describe('getAllImages', () => {
    it('should return images', async () => {
      const imagesMock = [{ id: '1', name: 'Image1', data: null, uploaded_by_id: null }, { id: '2', name: 'Image2', data: null, uploaded_by_id: null }];
      jest.spyOn(persistence, 'getAllImages').mockResolvedValueOnce(imagesMock);

      const result = await imageService.getAllImages();
      expect(result).toEqual(imagesMock);
    });

    it('should throw NotFoundException when no images are found', async () => {
      jest.spyOn(persistence, 'getAllImages').mockResolvedValueOnce([]);

      await expect(imageService.getAllImages()).rejects.toThrow(NotFoundException);
    });
  });

  describe('getImageById', () => {
    it('should return an image by ID', async () => {
      const imageMock = { id: '1', name: 'Image1', data: null, uploaded_by_id: null };
      jest.spyOn(persistence, 'getImageById').mockResolvedValueOnce(imageMock);

      const result = await imageService.getImageById('1');
      expect(result).toEqual(imageMock);
    });

    it('should throw NotFoundException when no image is found', async () => {
      jest.spyOn(persistence, 'getImageById').mockResolvedValueOnce(null);

      await expect(imageService.getImageById('2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('uploadImage', () => {
    it('should upload an image', async () => {
      const imageDtoMock = { id: '1', name: 'Image1', data: null, uploaded_by_id: null };
      jest.spyOn(persistence, 'uploadImage').mockResolvedValueOnce(imageDtoMock);

      const result = await imageService.uploadImage(imageDtoMock);
      expect(result).toEqual(imageDtoMock);
    });
  });

  describe('updateImage', () => {
    it('should update an image', async () => {
      const imageDtoMock = { id: '1', name: 'Image1', data: null, uploaded_by_id: null };
      jest.spyOn(persistence, 'updateImage').mockResolvedValueOnce(imageDtoMock);

      const result = await imageService.updateImage(imageDtoMock);
      expect(result).toEqual(imageDtoMock);
    });
  });
});
