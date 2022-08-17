import { Controller } from '@nestjs/common';
import { PlayerRankingService } from './player-ranking.service';

@Controller('player-ranking')
export class PlayerRankingController {
  constructor(private playerRankingService: PlayerRankingService) {
    //TODO
  }
}
