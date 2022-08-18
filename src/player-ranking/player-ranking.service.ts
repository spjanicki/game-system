import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerRanking } from './player-ranking.entity';
import { PlayerService } from '../player/player.service';
import { GameResultDto } from './dto/game-result.dto';
import { GlickoInitialValues } from './glicko-initial-values.enum';
import {
  GameStatus,
  GlickoCalculationClassUtils,
} from 'src/utils/glicko-calculation';
import { Player as GlickoPlayer } from 'glicko-two';

@Injectable()
export class PlayerRankingService {
  constructor(
    private playerService: PlayerService,
    @InjectRepository(PlayerRanking)
    private playerRankingRepository: Repository<PlayerRanking>,
  ) {}

  async setPlayerRanking(gameResultDto: GameResultDto): Promise<void> {
    const { winnerId, loserId, isTie } = gameResultDto;

    // Get player rankings
    let winnerRanking = await this.getPlayerRanking(winnerId);
    let winnerOutput: GlickoPlayer;

    let loserRanking = await this.getPlayerRanking(loserId);
    let loserOutput: GlickoPlayer;

    if (isTie) {
      // handle
    } else {
      winnerOutput = await this.getFirstPlayerGameOutputResult(
        winnerRanking,
        loserRanking,
        GameStatus.WIN,
      );

      loserOutput = await this.getFirstPlayerGameOutputResult(
        loserRanking,
        winnerRanking,
        GameStatus.LOSS,
      );
    }

    winnerRanking = this.updatePlayerRanking(
      winnerRanking,
      winnerOutput,
      GameStatus.WIN,
    );
    loserRanking = this.updatePlayerRanking(
      loserRanking,
      loserOutput,
      GameStatus.LOSS,
    );
  }

  /**
   *
   * @param firstPlayer
   * @param secondPlayer
   * @param gameResultStatus
   * @returns Returns a GlickoPlayer that has the game output calculated
   */
  async getFirstPlayerGameOutputResult(
    firstPlayer: PlayerRanking,
    secondPlayer: PlayerRanking,
    gameResultStatus: GameStatus,
  ): Promise<GlickoPlayer> {
    const glickoPlayer = new GlickoCalculationClassUtils(firstPlayer);
    glickoPlayer.processGameOutputCalculation(secondPlayer, gameResultStatus);
    return glickoPlayer.getPlayer();
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
    } as PlayerRanking;

    return await this.playerRankingRepository.save(playerRanking);
  }

  updatePlayerRanking(
    playerRanking: PlayerRanking,
    glickoPlayer: GlickoPlayer,
    gameStatus: GameStatus,
  ): PlayerRanking {
    const updatedPlayerRanking = {
      userId: playerRanking.id,
      wins: playerRanking.wins + (gameStatus === GameStatus.WIN ? 1 : 0),
      losses: playerRanking.losses + (gameStatus === GameStatus.LOSS ? 1 : 0),
      draws: playerRanking.draws + (gameStatus === GameStatus.TIE ? 1 : 0),
      rating: glickoPlayer.rating,
      tau: GlickoInitialValues.TAU.toString(),
      rd: glickoPlayer.ratingDeviation.toString(),
      vol: glickoPlayer.volatility.toString(),
    } as PlayerRanking;
    return updatedPlayerRanking;
  }
}
