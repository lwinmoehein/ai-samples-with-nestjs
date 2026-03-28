import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { FeedbacksService } from './feedbacks/feedbacks.service';
import { CreateFeedbackDTO } from './feedbacks/feedbacks.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private readonly feedbackService:FeedbacksService) {}

  @Get()
  ping(): any {
    return this.appService.ping();
  }

  @Post("feedback")
  async createFeedback(@Body() createFeedbackDTO: CreateFeedbackDTO){
    return await this.feedbackService.create(
      createFeedbackDTO.title,
      createFeedbackDTO.description,
      createFeedbackDTO.stars,
    );
  }
}
