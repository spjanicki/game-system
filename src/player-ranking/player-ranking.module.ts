import { Module } from '@nestjs/common';
import { PlayerRankingService } from './player-ranking.service';
import { PlayerRankingController } from './player-ranking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../player/player.entity';
import { PlayerRanking } from './player-ranking.entity';
import { PlayerService } from '../player/player.service';
import { PlayerModule } from 'src/player/player.module';

@Module({
  providers: [PlayerRankingService, PlayerService],
  controllers: [PlayerRankingController],
  imports: [
    TypeOrmModule.forFeature([Player]),
    TypeOrmModule.forFeature([PlayerRanking]),
    PlayerModule,
  ],
})
export class PlayerRankingModule {}
