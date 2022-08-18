import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerRanking } from './player-ranking.entity';
import { PlayerService } from '../player/player.service';
import { GameResultDto } from './dto/game-result.dto';
import { GlickoInitialValues } from './glicko-initial-values.enum';

@Injectable()
export class PlayerRankingService {
  constructor(
    private playerService: PlayerService,
    @InjectRepository(PlayerRanking)
    private playerRankingRepository: Repository<PlayerRanking>,
  ) {}

  async setPlayerRanking(gameResultDto: GameResultDto): Promise<void> {
    const { winnerId, loserId } = gameResultDto;

    const winnerRanking = await this.getPlayerRanking(winnerId);
    const loserRanking = await this.getPlayerRanking(loserId);

    // TODO : Implement
  }

  async getPlayerRanking(playerId: string): Promise<PlayerRanking> {
    await this.playerService.getPlayerById(playerId);

    const playerRanking = await this.playerRankingRepository.findOne({
      where: { userId: playerId },
    });

    if (!playerRanking) {
      return await this.createNewPlayerRanking(playerId);
    }

    return playerRanking;
  }

  async createNewPlayerRanking(id: string): Promise<PlayerRanking> {
    const playerRanking = {
      userId: id,
      wins: 0,
      losses: 0,
      draws: 0,
      rating: GlickoInitialValues.RATING,
      tau: GlickoInitialValues.TAU.toString(),
      rd: GlickoInitialValues.RD.toString(),
      vol: GlickoInitialValues.VOL.toString(),
    };

    return await this.playerRankingRepository.save(playerRanking);
  }
}
