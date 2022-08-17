import { Controller, Get, Param } from '@nestjs/common';
import { Player } from './player.entity';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Get()
  getAllPlayers(): Promise<Player[]> {
    return this.playerService.getAllPlayers();
  }

  @Get('/:id')
  getPlayerById(@Param('id') id: string): Promise<Player> {
    return this.playerService.getPlayerById(id);
  }

  @Get('/:username')
  getPlayerByUsername(@Param('username') username: string): Promise<Player> {
    return this.playerService.getPlayerByUsername(username);
  }
}
