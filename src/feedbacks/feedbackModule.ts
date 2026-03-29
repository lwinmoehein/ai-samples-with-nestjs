import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { FeedbackController } from './feedback.controller';
import { Feedback } from './feedback.entity';
import { FeedbackService } from './feedback.service';
import { EmbeddingModule } from '../embeddings/embedding.module';

@Module({
  imports: [
    // DB
    TypeOrmModule.forFeature([Feedback]),

    // Features
    EmbeddingModule
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {
  constructor(private dataSource: DataSource) {}
}
