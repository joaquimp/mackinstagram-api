import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Publication } from './publication.schema';
import { PublicationsService } from './publications.service';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly service: PublicationsService) {}

  @Get()
  async readAll(): Promise<Publication[]> {
    return await this.service.readAll();
  }

  @Get(':id')
  async readById(@Param('id') id: string): Promise<Publication> {
    return this.service.readById(id);
  }

  @Post()
  async create(@Body() publication: Publication): Promise<Publication> {
    return await this.service.create(publication);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Publication> {
    return await this.service.delete(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() publication: Publication): Promise<Publication> {
    return await this.service.update(id, publication);
  }
}
