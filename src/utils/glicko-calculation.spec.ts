import {
  calculateLooserOutput,
  calculateTieOutput,
  calculateWinnerOutput,
  CalculationResult,
} from './glicko-calculation';

const mockWinnerPlayer = {
  id: '',
  userId: '',
  wins: 0,
  losses: 0,
  draws: 0,
  rating: 1500,
  tau: '0.5',
  rd: '200',
  vol: '0.06',
};

const mockLooserPlayer = {
  id: '',
  userId: '',
  wins: 0,
  losses: 0,
  draws: 0,
  rating: 1500,
  tau: '0.5',
  rd: '140',
  vol: '0.06',
};

const mockBetterPlayer = {
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

describe('Winner ', () => {
  const winnerOutput = calculateWinnerOutput(
    mockWinnerPlayer,
    mockLooserPlayer,
  );
  test('Returned score for the winner should be higher than before calculation', () => {
    expect(winnerOutput.rating).toBeGreaterThan(mockWinnerPlayer.rating);
  });

  test('Returned rating deviation for the winner should be different than before calculation', () => {
    expect(Number(winnerOutput.ratingDeviation)).not.toEqual(
      Number(mockWinnerPlayer.rd),
    );
  });
});

describe('Loser ', () => {
  const loserOutput = calculateLooserOutput(mockWinnerPlayer, mockLooserPlayer);

  test('Returned score for the loser should be lesser than before calculation', () => {
    expect(loserOutput.rating).toBeLessThan(mockWinnerPlayer.rating);
  });

  test('Returned rating deviation for the looser should be different than before calculation', () => {
    expect(Number(loserOutput.ratingDeviation)).not.toEqual(
      Number(mockLooserPlayer.rd),
    );
  });
});

describe('Tie calculated for good player compared to bad player', () => {
  const user1 = calculateTieOutput(mockBadPlayer, mockBetterPlayer);

  test('Returned score for a Tie should be the same as before', () => {
    expect(user1.rating).toBeGreaterThan(mockBadPlayer.rating);
  });

  test('Returned rating deviation for the better player should be different than before calculation', () => {
    expect(Number(user1.ratingDeviation)).not.toEqual(
      Number(mockLooserPlayer.rd),
    );
  });
});

describe('Tie calculated for bad player compared to good player', () => {
  const user1 = calculateTieOutput(mockBetterPlayer, mockBadPlayer);

  test('Returned score for a Tie should be the same as before', () => {
    expect(user1.rating).toBeLessThan(mockBetterPlayer.rating);
  });

  test('Returned rating deviation for the better player should be different than before calculation', () => {
    expect(Number(user1.ratingDeviation)).not.toEqual(
      Number(mockLooserPlayer.rd),
    );
  });
});
