import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Player } from '../player/player.entity';

// TODO : Should create a 'PlayerResume' so i can hide the pwd
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() authCredentialsDto: AuthCredentialsDto): Promise<Player> {
    return this.authService.register(authCredentialsDto);
  }

  // Login
}
