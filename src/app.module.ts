import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Feedback } from './feedbacks/feedback.entity';
import { FeedbackModule } from './feedbacks/feedbackModule';

@Module({
  imports: [
    // DB
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'rag_database',
      entities: [
        Feedback
      ],
      synchronize: true,
    }),

    // Features
    FeedbackModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
