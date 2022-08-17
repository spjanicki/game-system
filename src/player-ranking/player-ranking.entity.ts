import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlayerRanking {
  @PrimaryGeneratedColumn('uuid') // Necessary?
  id: string;

  @Column()
  userId: string;

  @Column()
  wins: number;

  @Column()
  losses: number;

  @Column()
  draws: number;

  // Columns necessary for Glicko calculation
  @Column()
  rating: number;

  @Column()
  tau: string;

  @Column()
  rd: string;

  @Column()
  vol: string;
}
