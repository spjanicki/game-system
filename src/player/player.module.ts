import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player.entity';

@Module({
  providers: [PlayerService],
  controllers: [PlayerController],
  imports: [TypeOrmModule.forFeature([Player])],
})
export class PlayerModule {}
