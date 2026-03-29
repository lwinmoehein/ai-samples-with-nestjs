import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'vector',
    length: 384,
  })
  description: number[];

  @Column({ default: 3 })
  stars: number;
}
