import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../player/player.entity';
import { PlayerModule } from '../player/player.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([Player]), PlayerModule],
})
export class AuthModule {}
