import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { NoteService } from './note.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


@Controller()
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post('note')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
      },
    }),
  }))
  async create(
    @Body('content') content: string,
    @UploadedFile() image?: Express.Multer.File
  ){

    return await this.noteService.create(
      content,
      image
    );
  }

  @Get("note/search")
  async search(
    @Query('q') query: string,
  ){
    return this.noteService.findRelevantContext(query);
  }
}