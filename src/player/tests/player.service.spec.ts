import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from '../player.entity';
import { AuthCredentialsDto } from '../../auth/dto/auth-credentials.dto';
import { AuthService } from '../../auth/auth.service';

const mockAuthFactory = () => ({
  getAllPlayers: jest.fn(),
  register: jest.fn(),
  getPlayerById: jest.fn(),
  cratePlayer: jest.fn(),
  create: jest.fn(),
});

const user1Mock: AuthCredentialsDto = {
  username: 'Sarah',
  password: 'SarahPwd',
};

const user2Mock: AuthCredentialsDto = {
  username: 'Sarah1',
  password: 'SarahPwd',
};

describe('Auth Service', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Player),
          useFactory: mockAuthFactory,
        },
      ],
    }).compile();

    authService = module.get(AuthService);
  });

  describe('controller should be defined', () => {
    it('calls AuthService.getAllUsers and returns the result', () => {
      expect(authService).toBeDefined();
      // authService
      authService.cratePlayer(user1Mock);
    });
  });
});
