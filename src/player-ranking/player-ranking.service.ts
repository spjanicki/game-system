import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../player/player.entity';
import { Repository } from 'typeorm';
import { PlayerRanking } from './player-ranking.entity';
import { PlayerRankingDto } from './dto/player-rankign.dto';

@Injectable()
export class PlayerRankingService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    private playerRankingRepository: Repository<PlayerRanking>,
  ) {}

  async createPlayerRanking(userId: string, ranking: number): Promise<void> {
    // TODO : Implement
  }

  async getPlayerRankingShort(userId: string): Promise<number> {
    return null;
  }

  async getPlayerRanking(userId: string): Promise<PlayerRanking> {
    return null;
  }

  async processPlayerRanking(playerRankingDto: PlayerRankingDto): Promise<any> {
    return null;
  }
}
