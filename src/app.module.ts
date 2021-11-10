import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TarefasModule } from './publications/publications.module';

const mongodb = process.env.MONGODB;

@Module({
  controllers: [],
  imports: [
    MongooseModule.forRoot(mongodb), 
    TarefasModule,
  ]
})
export class AppModule {}
