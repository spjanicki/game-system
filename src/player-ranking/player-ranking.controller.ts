import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GameResultDto } from './dto/game-result.dto';
import { PlayerRanking } from './player-ranking.entity';
import { PlayerRankingService } from './player-ranking.service';

@Controller('player-ranking')
export class PlayerRankingController {
  constructor(private playerRankingService: PlayerRankingService) {}

  // should call a setPlayerRanking qui lui verifie si le user a deja un ranking ou non
  @Post()
  async setPlayerRanking(@Body() gameResultDto: GameResultDto): Promise<void> {
    return this.playerRankingService.handlePlayerRankingModification(
      gameResultDto,
    );
  }

  @Get()
  async getAllPlayersRanking(): Promise<PlayerRanking[]> {
    return this.playerRankingService.getAllPlayerRankings();
  }

  @Get('/:id')
  async getPlayerRaking(@Param('id') id: string): Promise<PlayerRanking> {
    return this.playerRankingService.getPlayerRanking(id);
  }
}
