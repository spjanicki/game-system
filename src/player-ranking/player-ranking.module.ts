import { Module } from '@nestjs/common';
import { PlayerRankingService } from './player-ranking.service';
import { PlayerRankingController } from './player-ranking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/player/player.entity';
import { PlayerRanking } from './player-ranking.entity';

@Module({
  providers: [PlayerRankingService],
  controllers: [PlayerRankingController],
  imports: [
    TypeOrmModule.forFeature([Player]),
    TypeOrmModule.forFeature([PlayerRanking]),
  ],
})
export class PlayerRankingModule {}
