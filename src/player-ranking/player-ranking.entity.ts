import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlayerRanking {
  @PrimaryGeneratedColumn('uuid') // Necessary?
  id: string;

  @Column()
  userId: string;

  @Column()
  rating: number;

  @Column()
  wins: number;

  @Column()
  losses: number;

  @Column()
  draws: number;
}
