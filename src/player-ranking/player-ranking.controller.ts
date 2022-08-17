import { Body, Controller, Post } from '@nestjs/common';
import { GameResultDto } from './dto/game-result.dto';
import { PlayerRankingService } from './player-ranking.service';

@Controller('player-ranking')
export class PlayerRankingController {
  constructor(private playerRankingService: PlayerRankingService) {}

  // should call a setPlayerRanking qui lui verifie si le user a deja un ranking ou non
  @Post()
  async setPlayerRanking(@Body() gameResultDto: GameResultDto): Promise<void> {
    return this.playerRankingService.setPlayerRanking(gameResultDto);
  }
}
