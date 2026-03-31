import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Note } from './notes/note.entity';
import { NodeModule } from './notes/node.module';
import * as dotenv from 'dotenv';
import * as process from 'node:process';
dotenv.config();

@Module({
  imports: [
    // DB
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Note
      ],

      synchronize: true,
    }),

    // Features
    NodeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    console.log(process.env);
  }
}
