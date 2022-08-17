/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { Player } from '../../player/player.entity';
import { PlayerService } from '../../player/player.service';
import { PlayerController } from '../../player/player.controller';

const mockAuthFactory = () => ({
  create: jest.fn((x) => x),
  save: jest.fn((x) => x),
  findOne: jest.fn((x) => x),
});

describe('AuthController', () => {
  let authController: AuthController;
  let playerController: PlayerController;

  const user1Mock: AuthCredentialsDto = {
    username: 'Sarah',
    password: 'SarahPwd',
  };

  const user2Mock: AuthCredentialsDto = {
    username: 'Sarah1',
    password: 'SarahPwd',
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
    playerController = module.get(PlayerController);
  });

  describe('controller should be defined', () => {
    it('calls AuthService.getAllUsers and returns the result', () => {
      expect(authController).toBeDefined();
    });
  });

  describe('create user ', () => {
    it('', async () => {
      const player1: Player = await authController.register(user1Mock);
      // const player2: Player = await authController.register(user2Mock);

      const fetchedPlayer1 = await playerController.getPlayerByUsername(
        'Sarah',
      );
      // const fetchedPlayer2 = await playerController.getPlayerByUsername(
      //   'Sarah1',
      // );

      expect(fetchedPlayer1).toBe(player1);
      // expect(fetchedPlayer2).toEqual(player2);
    });
  });
});
