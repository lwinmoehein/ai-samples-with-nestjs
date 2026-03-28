
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedbacks.entity';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(Feedback)
    private feedbacksRepository: Repository<Feedback>,
  ) {}

  create(title:string,description:string,stars:number):Promise<Feedback>{
    return this.feedbacksRepository.save({
      title: 'test',
      description: [1, 2, 3],
      stars: 3
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
}
