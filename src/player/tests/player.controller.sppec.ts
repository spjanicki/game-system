import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from '../../player/player.entity';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { AuthService } from 'src/auth/auth.service';
import { PlayerService } from '../player.service';

const mockAuthFactory = () => ({
  getAllPlayers: jest.fn(),
  register: jest.fn(),
  getPlayerById: jest.fn(),
  cratePlayer: jest.fn(),
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
  let PlayerService: PlayerService;
  //   let playerRepository: Repository<Player>;

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

    // playerRepository = module.get(Repository<Player>);
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
