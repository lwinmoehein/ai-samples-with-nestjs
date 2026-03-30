import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({
    type: 'bytea',
    nullable: true
  })
  image: Buffer;

  @Column({
    type: 'vector',
    length: 384,
  })
  content_embedding: number[];

  @Column({
    type: 'vector',
    length: 512,
    nullable:true
  })
  image_embedding: number[];
}
