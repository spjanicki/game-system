import { GameStatus, GlickoCalculationClassUtils } from './glicko-calculation';

const mockGoodPlayer = {
  id: '',
  userId: '',
  wins: 51,
  losses: 1,
  draws: 2,
  rating: 2000,
  tau: '0.5',
  rd: '180',
  vol: '0.06',
};

const mockBadPlayer = {
  id: '',
  userId: '',
  wins: 0,
  losses: 10,
  draws: 18,
  rating: 1500,
  tau: '0.5',
  rd: '180',
  vol: '0.06',
};

describe('Glicko calculation with good player wins to bad ', () => {
  const goodPlayer = new GlickoCalculationClassUtils(mockGoodPlayer);

  goodPlayer.processGameOutputCalculation(mockBadPlayer, GameStatus.WIN);
  test('Returned score after a win should be higher than before the win', () => {
    expect(goodPlayer.getPlayer().rating).toBeGreaterThan(
      mockGoodPlayer.rating,
    );
  });

  test('Returned rating deviation of the player after a win should be different than before calculation', () => {
    expect(Number(goodPlayer.getPlayer().ratingDeviation)).not.toEqual(
      Number(mockGoodPlayer.rd),
    );
  });
});

describe('Glicko calculation with bad player wins to good player', () => {
  const badPlayer = new GlickoCalculationClassUtils(mockBadPlayer);

  badPlayer.processGameOutputCalculation(mockGoodPlayer, GameStatus.WIN);
  test('Returned score after a win should be higher than before the win', () => {
    expect(badPlayer.getPlayer().rating).toBeGreaterThan(mockBadPlayer.rating);
  });

  test('Returned rating deviation of the player after a win should be different than before calculation', () => {
    expect(Number(badPlayer.getPlayer().ratingDeviation)).not.toEqual(
      Number(mockBadPlayer.rd),
    );
  });
});

describe('Glicko calculation of a tie - Good user to bad user- ', () => {
  const goodPlayer = new GlickoCalculationClassUtils(mockGoodPlayer);

  goodPlayer.processGameOutputCalculation(mockBadPlayer, GameStatus.TIE);
  test('Returned score for a Tie between good and bad user lesser than before - goodPlayer POV', () => {
    expect(goodPlayer.getPlayer().rating).toBeLessThan(mockGoodPlayer.rating);
  });

  test('Returned rating deviation for the better player should be different than before calculation', () => {
    expect(Number(goodPlayer.getPlayer().ratingDeviation)).not.toEqual(
      Number(mockGoodPlayer.rd),
    );
  });
});

describe('Glicko calculation of a tie - Bad user to Good user- ', () => {
  const badUser = new GlickoCalculationClassUtils(mockBadPlayer);

  badUser.processGameOutputCalculation(mockGoodPlayer, GameStatus.TIE);
  test('Returned score for a Tie between bad player and good player shopuld be superior - goodPlayer POV', () => {
    expect(badUser.getPlayer().rating).toBeGreaterThan(mockBadPlayer.rating);
  });

  test('Returned rating deviation for the better player should be different than before calculation', () => {
    expect(Number(badUser.getPlayer().ratingDeviation)).not.toEqual(
      Number(mockBadPlayer.rd),
    );
  });
});
