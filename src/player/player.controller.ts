import { Controller, Get, Param } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { Player } from './player.entity';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Get()
  @ApiOkResponse({ description: 'All player fetched' })
  async getAllPlayers(): Promise<Player[]> {
    return this.playerService.getAllPlayers();
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'User found based on userId' })
  @ApiInternalServerErrorResponse({
    description: 'User not found - Invalid id',
  })
  async getPlayerById(@Param('id') id: string): Promise<Player> {
    return this.playerService.getPlayerById(id);
  }

  @Get('/:username')
  @ApiOkResponse({ description: 'User found based on username' })
  @ApiInternalServerErrorResponse({
    description: 'User not found - Invalid username',
  })
  async getPlayerByUsername(
    @Param('username') username: string,
  ): Promise<Player> {
    return this.playerService.getPlayerByUsername(username);
  }
}
