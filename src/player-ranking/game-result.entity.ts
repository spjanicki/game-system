import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// TODO : Add userConfirmation to be sure the outcome of the game is right.
@Entity()
export class GameResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  winnerId: string;

  @Column()
  loserId: string;

  @Column()
  isConsummed: boolean;

  @Column()
  date: Date;

  //   @Column()
  //   matchId: string; Not yet implemented the match making
}
