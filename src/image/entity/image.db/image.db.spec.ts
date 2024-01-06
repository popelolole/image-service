import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from './image.db';

describe('Image Model', () => {
  let imageModel: Model<ImageDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Image.name),
          useValue: Model,
        },
      ],
    }).compile();

    imageModel = module.get<Model<ImageDocument>>(getModelToken(Image.name));
  });

  it('should be defined', () => {
    expect(imageModel).toBeDefined();
  });

  describe('findById', () => {
    it('should find an image by ID', async () => {
      const imageData = {
        id: '1',
        name: 'Image1',
        uploaded_by_id: 'user1',
        data: Buffer.from('image data'),
      };
      jest.spyOn(imageModel, 'findById').mockReturnValueOnce({ exec: jest.fn().mockResolvedValueOnce(imageData) } as any);

      const result = await imageModel.findById('1').exec();
      expect(result).toEqual(imageData);
    });

    it('should return null when no image is found', async () => {
      jest.spyOn(imageModel, 'findById').mockReturnValueOnce({ exec: jest.fn().mockResolvedValueOnce(null) } as any);

      const result = await imageModel.findById('2').exec();
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new image', async () => {
      const imageData = {
        id: '1',
        name: 'Image1',
        uploaded_by_id: 'user1',
        data: Buffer.from('image data'),
      };
      jest.spyOn(imageModel, 'create').mockResolvedValueOnce(imageData as any);

      const result = await imageModel.create(imageData);
      expect(result).toEqual(imageData);
    });
  });

});
