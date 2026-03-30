import { Body, Controller, Delete, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
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

    try {
      const note = await this.noteService.create(
        content,
        image
      );

      return {
        id: note.id,
        content: note.content,
        image: note.image ? Buffer.from(note.image).toString('base64') : null
      };
    } catch (error) {
      console.error('Note create error:', error);
      throw error;
    }
  }

  @Get("note")
  async getAll(){
    let results = await this.noteService.getAllNotes();

    let mappedResults = results.map(r=>{
      return {
        id:r.id,
        content:r.content,
        image:r.image?.toString('base64')
      }
    });

    return mappedResults;
  }

  @Get("note/search")
  async search(
    @Query('q') query: string,
  ){
    let results = await this.noteService.findRelevantContents(query);

    let mappedResults = results.map(r=>{
      return {
        id:r.id,
        content:r.content,
        image:r.image?.toString('base64')
      }
    });

    return mappedResults;
  }

  @Post("note/search")
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
      },
    }),
  }))
  async searchImage(
    @UploadedFile() image: Express.Multer.File
  ){
    let results = await this.noteService.findRelevantImages(image);

    let mappedResults = results.map(r=>{
      return {
        id:r.id,
        content:r.content,
        image:r.image?.toString('base64')
      }
    });

    return mappedResults;
  }

  @Delete("note")
  async delete(
    @Query('id') id: number,
  ){
    return await this.noteService.delete(id);
  }
}