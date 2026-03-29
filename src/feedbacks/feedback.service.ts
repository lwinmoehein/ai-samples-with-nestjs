
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';
import { EmbeddingService } from '../embeddings/embedding.service';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbacksRepository: Repository<Feedback>,
    private embeddingsService:EmbeddingService
  ) {}

  async create(title:string,description:string,stars:number):Promise<Feedback>{
    let vectorDescription = await this.embeddingsService.generateVector(description);

    return this.feedbacksRepository.save({
      title: title,
      description: vectorDescription,
      stars: stars
    })
  }

  findAll(): Promise<Feedback[]> {
    return this.feedbacksRepository.find();
  }

  findOne(id: number): Promise<Feedback | null> {
    return this.feedbacksRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.feedbacksRepository.delete(id);
  }

  async findRelevantContext(queryText: string) {
    const queryVector = await this.embeddingsService.generateVector(queryText);
    const vectorString = `[${queryVector.join(',')}]`;

    return await this.feedbacksRepository
      .createQueryBuilder('f')
      .orderBy('f.description <=> :targetVector', 'ASC')
      .setParameter('targetVector', vectorString)
      .limit(1)
      .getMany();
  }
}
