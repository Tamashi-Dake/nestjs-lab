import { Injectable } from '@nestjs/common';
import { IAppResponse, IItemDesign } from '../common/interfaces/index.js';

const sampleDesigns: IItemDesign[] = [
  {
    id: 1,
    name: 'Sample Design',
    description: 'This is a sample design',
    price: 19.99,
    imageUrl: 'https://example.com/sample-design.jpg',
  },
  {
    id: 2,
    name: 'Another Design',
    description: 'This is another design',
    price: 29.99,
    imageUrl: 'https://example.com/another-design.jpg',
  },
  {
    id: 3,
    name: 'Third Design',
    description: 'This is the third design',
    price: 39.99,
    imageUrl: 'https://example.com/third-design.jpg',
  },
];

@Injectable()
export class DesignService {
  getDesigns(): IAppResponse<IItemDesign[]> {
    return {
      status: 200,
      data: sampleDesigns,
    };
  }
  getDesignById(id: number): IAppResponse<IItemDesign | null> {
    const result = sampleDesigns.find((design) => design.id === id);

    return result
      ? {
          status: 200,
          data: result,
        }
      : {
          status: 404,
          error: 'Design not found',
          data: null,
        };
  }
  getDesignByPage(page: number, limit: number): IAppResponse<IItemDesign[]> {
    const startIndex = (page - 1) * limit; // page is 1-based, so we subtract 1 to get the correct index. i.g. page 1 = 0 + limit =10 => startIndex = 0 - 10
    const endIndex = startIndex + limit;
    return {
      status: 200,
      data: sampleDesigns.slice(startIndex, endIndex),
    };
  }
  createDesign(design: IItemDesign): IAppResponse<IItemDesign> {
    sampleDesigns.push(design);
    return {
      status: 201,
      data: design,
    };
  }
  updateDesign(
    id: number,
    updatedDesign: Partial<IItemDesign>
  ): IAppResponse<IItemDesign | null> {
    const index = sampleDesigns.findIndex((design) => design?.id === id);
    if (index === -1) {
      return { status: 404, error: 'Design not found', data: null };
    }
    const updated = { ...sampleDesigns[index], ...updatedDesign, id };
    sampleDesigns[index] = updated;
    return { status: 200, data: updated };
  }
  deleteDesign(id: number): IAppResponse<VoidFunction> {
    const isDesignListHasThisItem = sampleDesigns.findIndex(
      (design) => design.id === id
    );
    if (isDesignListHasThisItem !== -1) {
      sampleDesigns.splice(isDesignListHasThisItem, 1);
      return {
        status: 200,
        message: 'Design deleted successfully',
      };
    }
    return {
      status: 404,
      error: 'Design not found',
    };
  }
}
