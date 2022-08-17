import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../player/player.entity';
import { Repository } from 'typeorm';
import { PlayerRanking } from './player-ranking.entity';
import { PlayerService } from '../player/player.service';
import { GameResultDto } from './dto/game-result.dto';

@Injectable()
export class PlayerRankingService {
  constructor(
    private playerService: PlayerService,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    @InjectRepository(PlayerRanking)
    private playerRankingRepository: Repository<PlayerRanking>,
  ) {}

  async setPlayerRanking(gameResultDto: GameResultDto): Promise<void> {
    const { winnerId, loserId } = gameResultDto;

    const winnerRanking = this.getPlayerRanking(winnerId);
    const loserRanking = this.getPlayerRanking(loserId);

    // TODO : Implement
  }

  async getPlayerRankingShort(userId: string): Promise<number> {
    const player = this.playerService.getPlayerById(userId);
    return null;
  }

  async getPlayerRanking(userId: string): Promise<PlayerRanking> {
    const player = this.playerService.getPlayerById(userId);

    // if userId !exist --> error

    // fetch playuer ranking

    // if !playerRank --> create and return PlayerRanking

    // else return playerRank
    return null;
  }

  async processPlayerRanking(playerRankingDto: GameResultDto): Promise<any> {
    return null;
  }
}
