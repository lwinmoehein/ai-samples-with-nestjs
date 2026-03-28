import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Feedback } from './feedbacks/feedbacks.entity';
import { FeedbacksService } from './feedbacks/feedbacks.service';

@Module({
  imports: [
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

    TypeOrmModule.forFeature([Feedback]),
  ],
  controllers: [AppController],
  providers: [AppService,FeedbacksService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
