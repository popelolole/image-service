import { Image } from './image.db';

describe('ImageDb', () => {
  it('should be defined', () => {
    expect(new Image()).toBeDefined();
  });
});
