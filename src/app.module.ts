import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Note } from './notes/note.entity';
import { NodeModule } from './notes/node.module';

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
  constructor(private dataSource: DataSource) {}
}
