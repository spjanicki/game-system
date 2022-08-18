import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Player } from '../player/player.entity';
import * as bcrypt from 'bcryptjs';
import { PlayerLeague } from '../player/player-league.enum';
import { Repository } from 'typeorm';

enum PlayerCreationError {
  ALREADY_EXIST = '23505',
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async cratePlayer(authCredentialsDto: AuthCredentialsDto): Promise<Player> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPwd = await bcrypt.hash(password, salt);

    const creationDate = new Date();

    const player = this.playerRepository.create({
      username,
      password: hashedPwd,
      currentLeague: PlayerLeague.BEGINNER,
      isLoggedIn: true,
      creationDate,
    });

    try {
      await this.playerRepository.save(player);
    } catch (error) {
      if (error.code === PlayerCreationError.ALREADY_EXIST) {
        throw new ConflictException('Username already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return player;
  }

  async register(authCredentialsDto: AuthCredentialsDto): Promise<Player> {
    return this.cratePlayer(authCredentialsDto);
  }

  // lOGIN method
}
