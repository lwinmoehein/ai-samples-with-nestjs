
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { EmbeddingService } from '../embeddings/embedding.service';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
    private embeddingService:EmbeddingService
  ) {}

  async create(content:string,imageAttachment?: Express.Multer.File):Promise<Note>{
    let vectorContent = await this.embeddingService.generateVector(content);

    let imageAttachmentVector:number[] | undefined = undefined;

    if(imageAttachment){
      imageAttachmentVector = await this.embeddingService.generateImageVector(imageAttachment);
    }

    return this.noteRepository.save({
      content: content,
      image:imageAttachment?.buffer,
      content_embedding: vectorContent,
      image_embedding:imageAttachmentVector,
    })
  }

  async findRelevantContext(queryText: string) {
    const queryVector = await this.embeddingService.generateVector(queryText);
    const vectorString = `[${queryVector.join(',')}]`;

    return await this.noteRepository
      .createQueryBuilder('f')
      .orderBy('f.content_embedding <=> :targetVector', 'ASC')
      .setParameter('targetVector', vectorString)
      .limit(1)
      .getMany();
  }
}
