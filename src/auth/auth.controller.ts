import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { throws } from 'assert';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Player } from './player.entity';

// TODO : Should create a 'PlayerResume' so i can hide the pwd
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() authCredentialsDto: AuthCredentialsDto): Promise<Player> {
    return this.authService.register(authCredentialsDto);
  }

  @Get()
  getAllPlayers(): Promise<Player[]> {
    return this.authService.getAllPlayers();
  }

  @Get('/:id')
  getPlayerById(@Param('id') id: string): Promise<Player> {
    return this.authService.getPlayerById(id);
  }

  @Get(':/id')
  getPlayerByUsername(@Param('username') username: string): Promise<Player> {
    return this.authService.getPlayerByUsername(username);
  }
}
