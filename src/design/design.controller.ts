import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DesignService } from './design.service.js';
import type { IAppResponse, IItemDesign } from '../common/interfaces/index.js';

@Controller('design')
export class DesignController {
  constructor(private readonly designService: DesignService) {}

  @Get()
  getDesigns(
    @Query('all') all: boolean = false,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 1
  ): IAppResponse<IItemDesign[]> {
    return all
      ? this.designService.getDesigns()
      : this.designService.getDesignByPage(page, limit);
  }

  @Get(':id')
  getDesignById(
    @Param('id', ParseIntPipe) id: number
  ): IAppResponse<IItemDesign | null> {
    return this.designService.getDesignById(id);
  }

  @Post()
  createDesign(@Body() design: IItemDesign): IAppResponse<IItemDesign> {
    return this.designService.createDesign(design);
  }

  @Patch(':id')
  updateDesign(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedDesign: Partial<IItemDesign>
  ): IAppResponse<IItemDesign | null> {
    return this.designService.updateDesign(id, updatedDesign);
  }

  @Delete(':id')
  deleteDesign(
    @Param('id', ParseIntPipe) id: number
  ): IAppResponse<VoidFunction> {
    return this.designService.deleteDesign(id);
  }
}
