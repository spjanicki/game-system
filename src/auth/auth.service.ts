import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { PlayerLeague } from './player-league.enum';
import { Player } from './player.entity';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';

enum PlayerCreationError {
  ALREADY_EXIST = '23505',
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async cratePlayer(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPwd = await bcrypt.hash(password, salt);

    const creationDate = new Date();

    const player = this.playerRepository.create({
      username,
      password: hashedPwd,
      rating: 0,
      currentLeague: PlayerLeague.BEGINNER,
      isLoggedIn: true,
      creationDate,
    });

    try {
      await this.playerRepository.save(player);
    } catch (error) {
      console.log(error);
      if (error.code === PlayerCreationError.ALREADY_EXIST) {
        throw new ConflictException('Username already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async register(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.cratePlayer(authCredentialsDto);
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.playerRepository.find();
  }

  async getPlayerById(id: string): Promise<Player> {
    const player = await this.playerRepository.findOne({ where: { id } });

    if (!player) {
      throw new NotFoundException(`No player with ID ${id} exists.`);
    }
    return player;
  }
}
