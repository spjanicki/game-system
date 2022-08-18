import { Player as GlickoPlayer, Outcome } from 'glicko-two';
import { PlayerRanking } from 'src/player-ranking/player-ranking.entity';

/**
 *
 * TODO : Simplify this class. For the sake of the time remaining, i copy-pasta everything but in the next iteration it will be cleaner
 */
export class CalculationResult {
  rating: number;
  ratingDeviation: string;
  volatility: string;
}

enum GlickoDefault {
  defaultRating = 1500,
}

function createGlickoPlayer(player: PlayerRanking): GlickoPlayer {
  return new GlickoPlayer({
    defaultRating: GlickoDefault.defaultRating,
    rating: player.rating,
    ratingDeviation: Number(player.rd),
    tau: Number(player.tau),
    volatility: Number(player.vol),
  });
}

export function calculateWinnerOutput(
  winner: PlayerRanking,
  loser: PlayerRanking,
): CalculationResult {
  const glickoWinner = createGlickoPlayer(winner);
  const glickoLooser = createGlickoPlayer(loser);

  glickoWinner.addResult(glickoLooser, Outcome.Win);
  glickoWinner.updateRating();

  return {
    rating: glickoWinner.rating,
    ratingDeviation: glickoWinner.ratingDeviation.toString(),
    volatility: glickoWinner.volatility.toString(),
  } as CalculationResult;
}

export function calculateLooserOutput(
  winner: PlayerRanking,
  loser: PlayerRanking,
): CalculationResult {
  const glickoWinner = createGlickoPlayer(winner);
  const glickoLooser = createGlickoPlayer(loser);

  glickoLooser.addResult(glickoWinner, Outcome.Loss);
  glickoLooser.updateRating();

  return {
    rating: glickoLooser.rating,
    ratingDeviation: glickoLooser.ratingDeviation.toString(),
    volatility: glickoLooser.volatility.toString(),
  } as CalculationResult;
}

// Has to be called twice for now... pretty bad
export function calculateTieOutput(
  player1: PlayerRanking,
  player2: PlayerRanking,
): CalculationResult {
  const glickoPlayer1 = createGlickoPlayer(player1);
  const glickoPlayer2 = createGlickoPlayer(player2);

  glickoPlayer1.addResult(glickoPlayer2, Outcome.Tie);
  glickoPlayer1.updateRating();

  return {
    rating: glickoPlayer1.rating,
    ratingDeviation: glickoPlayer1.ratingDeviation.toString(),
    volatility: glickoPlayer1.volatility.toString(),
  } as CalculationResult;
}
