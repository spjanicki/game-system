import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

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

  async getPlayerByUsername(username: string): Promise<Player> {
    const player = await this.playerRepository.findOne({ where: { username } });

    if (!player) {
      throw new NotFoundException(
        `No player with username ${username} exists.`,
      );
    }
    return player;
  }
}
