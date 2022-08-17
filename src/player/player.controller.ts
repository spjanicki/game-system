import { Controller, Get, Param } from '@nestjs/common';
import { Player } from './player.entity';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Get()
  async getAllPlayers(): Promise<Player[]> {
    return this.playerService.getAllPlayers();
  }

  @Get('/:id')
  async getPlayerById(@Param('id') id: string): Promise<Player> {
    return this.playerService.getPlayerById(id);
  }

  @Get('/:username')
  async getPlayerByUsername(
    @Param('username') username: string,
  ): Promise<Player> {
    return this.playerService.getPlayerByUsername(username);
  }
}
