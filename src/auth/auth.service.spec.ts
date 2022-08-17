// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { AuthService } from './auth.service';
// import { Player } from './player.entity';

// const mockAuthFactory = () => ({
//   getAllPlayers: jest.fn(),
//   register: jest.fn(),
//   getPlayerById: jest.fn(),
//   cratePlayer: jest.fn(),
// });

// describe('Auth Service', () => {
//   let authService: AuthService;
//   let playerRepository: Repository<Player>;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         AuthService,
//         {
//           provide: getRepositoryToken(Player),
//           useFactory: mockAuthFactory,
//         },
//       ],
//     });
//     playerRepository = module.get(Repository<Player>);
//   });
// });
