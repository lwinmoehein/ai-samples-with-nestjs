import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDTO } from './feedback.dto';


@Controller()
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post("feedback")
  async createFeedback(@Body() createFeedbackDTO: CreateFeedbackDTO){
    return await this.feedbackService.create(
      createFeedbackDTO.title,
      createFeedbackDTO.description,
      createFeedbackDTO.stars,
    );
  }

  @Get("feedback/search")
  async search(
    @Query('q') query: string,
  ){
    return this.feedbackService.findRelevantContext(query);
  }
}