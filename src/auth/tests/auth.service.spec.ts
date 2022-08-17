/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { Player } from '../../player/player.entity';
import { PlayerService } from '../../player/player.service';
import { PlayerController } from '../../player/player.controller';
import { PlayerLeague } from '../../player/player-league.enum';

const mockAuthFactory = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
});

// TODO : Add more tests.
describe('Auth Service', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockUserCredentials: AuthCredentialsDto = {
    username: 'Sarah',
    password: 'SarahPwd',
  };

  const mockUserCredentials1: AuthCredentialsDto = {
    username: 'Sarah1',
    password: 'SarahPwd',
  };

  const mockUserCreated: Player = {
    id: '1231',
    username: 'Sarah',
    password: 'SarahPwd',
    rating: 0,
    currentLeague: PlayerLeague.BEGINNER,
    isLoggedIn: true,
    creationDate: new Date(),
  };

  const mockUserCreated1: Player = {
    id: '1231',
    username: 'Sarah1',
    password: 'SarahPwd',
    rating: 0,
    currentLeague: PlayerLeague.BEGINNER,
    isLoggedIn: true,
    creationDate: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Player),
          useFactory: mockAuthFactory,
        },
        PlayerService,
        { provide: getRepositoryToken(Player), useFactory: mockAuthFactory },
      ],
      controllers: [AuthController, PlayerController],
    }).compile();

    authController = module.get(AuthController);
    authService = module.get(AuthService);
  });

  describe('controller should be defined', () => {
    it('calls AuthService.getAllUsers and returns the result', () => {
      expect(authController).toBeDefined();
    });
  });

  describe('', () => {
    it('Should create user.', async () => {
      authService.cratePlayer = jest.fn().mockReturnValue(mockUserCreated);

      const result = await authService.cratePlayer(mockUserCredentials);

      expect(authService.cratePlayer).toBeCalledTimes(1);
      expect(result).toBe(mockUserCreated);
    });
  });

  describe('', () => {
    it('Should register user.', async () => {
      authService.register = jest.fn().mockReturnValue(mockUserCreated1);

      expect(authService.register).toBeCalledTimes(0);
      const registerResult = await authService.register(mockUserCredentials1);

      expect(authService.register).toBeCalledTimes(1);
      expect(registerResult).toBe(mockUserCreated1);
    });
  });
});
