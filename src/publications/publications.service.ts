import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Publication, PublicationDocument } from './publication.schema';

@Injectable()
export class PublicationsService {
  constructor( 
    @InjectModel(Publication.name) private model: Model<PublicationDocument>,
  ) {}

  async readAll(): Promise<Publication[]> {
    return await this.model.find().exec();
  }

  async readById(id: string): Promise<Publication> {
    if (Types.ObjectId.isValid(id)) {
      const resposta = await this.model.findById(id);

      if (resposta) return resposta;

      throw new NotFoundException(
        `Publicação com o id ${id} não encontrada`,
      );
    }
    throw new BadRequestException(`O ID ${id} não é válido`);
  }

  async create(publication: Publication): Promise<Publication> {
    const created = new this.model(publication);
    return await created.save();
  }

  async delete(id: string): Promise<Publication> {
    let publication = await this.readById(id);
    await this.model.findByIdAndDelete(id);
    return publication;
  }

  async update(id: string, publication: Publication): Promise<Publication> {
    if (Types.ObjectId.isValid(id)) {
      await this.model.findByIdAndUpdate(id, publication);
      return await this.readById(id);
    }

    throw new BadRequestException(`O ID ${id} não é válido`);
  }
}
