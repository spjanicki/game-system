import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PlayerLeague } from './player-league.enum';

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  rating: number;

  @Column()
  currentLeague: PlayerLeague; // Will facilitate the match making.

  @Column()
  isLoggedIn: boolean; // will stay true for the perks of the tech test

  @Column()
  creationDate: Date;
}
