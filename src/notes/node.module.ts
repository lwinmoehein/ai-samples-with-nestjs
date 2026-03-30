import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteController } from './note.controller';
import { Note } from './note.entity';
import { NoteService } from './note.service';
import { EmbeddingModule } from '../embeddings/embedding.module';

@Module({
  imports: [
    // DB
    TypeOrmModule.forFeature([Note]),

    EmbeddingModule
  ],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NodeModule {
  constructor() {}
}
