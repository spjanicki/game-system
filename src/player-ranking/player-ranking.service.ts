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

  async handlePlayerRankingModification(
    gameResultDto: GameResultDto,
  ): Promise<void> {
    const { winnerId, loserId, isTie } = gameResultDto;

    let winnerRanking = await this.getPlayerRanking(winnerId);
    let loserRanking = await this.getPlayerRanking(loserId);

    winnerRanking = await this.calculateFirstPlayerRaking(
      winnerRanking,
      loserRanking,
      isTie === true ? GameStatus.TIE : GameStatus.WIN,
    );

    loserRanking = await this.calculateFirstPlayerRaking(
      loserRanking,
      winnerRanking,
      isTie === true ? GameStatus.TIE : GameStatus.LOSS,
    );

    await this.updatePlayerRanking(winnerRanking);
    await this.updatePlayerRanking(loserRanking);
  }

  async calculateFirstPlayerRaking(
    concernedPlayer: PlayerRanking,
    adversary: PlayerRanking,
    concernedPlayerGameStatus: GameStatus,
  ): Promise<PlayerRanking> {
    console.log('PlayerStatus', concernedPlayerGameStatus);
    const concernedPlayerOutput = await this.getFirstPlayerGameOutputResult(
      concernedPlayer,
      adversary,
      concernedPlayerGameStatus,
    );

    return this.calculatePlayerRanking(
      concernedPlayer,
      concernedPlayerOutput,
      concernedPlayerGameStatus,
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

    console.log('fetchedPPlayerRankig : ', playerRanking);

    if (!playerRanking) {
      return await this.createNewPlayerRanking(playerId);
    }

    return playerRanking;
  }

  async getAllPlayerRankings(): Promise<PlayerRanking[]> {
    const playerRanking = await this.playerRankingRepository.find();

    return playerRanking;
  }

  async updatePlayerRanking(
    playerRanking: PlayerRanking,
  ): Promise<PlayerRanking> {
    console.log('plaayerRaking to save: ', playerRanking);
    return await this.playerRankingRepository.save(playerRanking);
  }

  async createNewPlayerRanking(id: string): Promise<PlayerRanking> {
    const playerRanking = {
      userId: id,
      wins: 0,
      losses: 0,
      draws: 0,
      rating: GlickoInitialValues.RATING.toString(),
      tau: GlickoInitialValues.TAU.toString(),
      rd: GlickoInitialValues.RD.toString(),
      vol: GlickoInitialValues.VOL.toString(),
    } as PlayerRanking;

    return await this.playerRankingRepository.save(playerRanking);
  }

  calculatePlayerRanking(
    playerRanking: PlayerRanking,
    glickoPlayer: GlickoPlayer,
    gameStatus: GameStatus,
  ): PlayerRanking {
    const updatedPlayerRanking = {
      id: playerRanking.id,
      userId: playerRanking.userId,
      wins: playerRanking.wins + (gameStatus === GameStatus.WIN ? 1 : 0),
      losses: playerRanking.losses + (gameStatus === GameStatus.LOSS ? 1 : 0),
      draws: playerRanking.draws + (gameStatus === GameStatus.TIE ? 1 : 0),
      rating: glickoPlayer.rating.toString(),
      tau: GlickoInitialValues.TAU.toString(),
      rd: glickoPlayer.ratingDeviation.toString(),
      vol: glickoPlayer.volatility.toString(),
    } as PlayerRanking;
    return updatedPlayerRanking;
  }
}
