import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Publication, PublicationSchema } from './publication.schema';
import { PublicationsController } from './publications.controller';
import { PublicationsService } from './publications.service';

@Module({
  controllers: [PublicationsController],
  providers: [PublicationsService],
  imports: [
    MongooseModule.forFeature([{ name: Publication.name, schema: PublicationSchema }]),
  ],
})
export class TarefasModule {}
