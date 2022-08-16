import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { PlayerLeague } from './player-league.enum';
import { Player } from './player.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async cratePlayer(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const creationDate = new Date();

    // Add validations
    const player = this.playerRepository.create({
      username,
      password,
      rating: 0,
      currentLeague: PlayerLeague.BEGINNER,
      isLoggedIn: true,
      creationDate,
    });

    await this.playerRepository.save(player);
  }

  async register(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.cratePlayer(authCredentialsDto);
  }
}
