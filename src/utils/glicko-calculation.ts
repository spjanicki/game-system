import { Player as GlickoPlayer, Outcome } from 'glicko-two';
import { PlayerRanking } from 'src/player-ranking/player-ranking.entity';

export class CalculationResult {
  rating: number;
  ratingDeviation: string;
  volatility: string;
}

export enum GameStatus {
  WIN = 1,
  LOSS = 0,
  TIE = 0.5,
}

enum GlickoDefault {
  defaultRating = 1500,
}

export class GlickoCalculationClassUtils {
  public player: GlickoPlayer;

  constructor(public receivedPlayer: PlayerRanking) {
    this.player = this.createGlickoPlayer(receivedPlayer);
  }

  private createGlickoPlayer(player: PlayerRanking): GlickoPlayer {
    return new GlickoPlayer({
      defaultRating: GlickoDefault.defaultRating,
      rating: Number(player.rating),
      ratingDeviation: Number(player.rd),
      tau: Number(player.tau),
      volatility: Number(player.vol),
    });
  }

  public processGameOutputCalculation(
    opponentRanking: PlayerRanking,
    gameResultStatus: GameStatus,
  ) {
    const glickoOpponent = this.createGlickoPlayer(opponentRanking);

    if (gameResultStatus === GameStatus.WIN) {
      this.player.addResult(glickoOpponent, Outcome.Win);
    } else if (gameResultStatus === GameStatus.LOSS) {
      this.player.addResult(glickoOpponent, Outcome.Loss);
    } else {
      this.player.addResult(glickoOpponent, Outcome.Tie);
    }
    this.player.updateRating();
  }

  public getPlayer(): GlickoPlayer {
    return this.player;
  }
}
