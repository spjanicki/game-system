import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { GameResultDto } from './dto/game-result.dto';
import { PlayerRanking } from './player-ranking.entity';
import {
  PlayerRankingInfos,
  PlayerRankingService,
} from './player-ranking.service';

@Controller('player-ranking')
export class PlayerRankingController {
  constructor(private playerRankingService: PlayerRankingService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Player ranking initiated' })
  @ApiBody({ type: GameResultDto })
  async setPlayerRanking(@Body() gameResultDto: GameResultDto): Promise<void> {
    return this.playerRankingService.handlePlayerRankingModification(
      gameResultDto,
    );
  }

  @ApiOkResponse({ description: 'Get all user ranking ' })
  @Get()
  async getAllPlayersRanking(): Promise<PlayerRanking[]> {
    return this.playerRankingService.getAllPlayerRankings();
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Get userRanking based on id' })
  @ApiInternalServerErrorResponse({
    description: 'no playerRanking based on user id found',
  })
  async getPlayerRaking(@Param('id') id: string): Promise<PlayerRanking> {
    return this.playerRankingService.getPlayerRanking(id);
  }

  @Get('topPlayers/:amount')
  @ApiOkResponse({ description: 'Get top players - based on amount' })
  async getTopPlayers(
    @Param('amount') amount: string,
  ): Promise<PlayerRankingInfos[]> {
    return this.playerRankingService.getTopPlayers(Number(amount));
  }
}
