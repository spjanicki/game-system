import { ApiProperty } from '@nestjs/swagger';

export class GameResultDto {
  @ApiProperty({ type: () => String, description: 'winnerId' })
  winnerId: string;

  @ApiProperty({ type: () => String, description: 'loserId' })
  loserId: string;

  @ApiProperty({ type: () => String, description: 'isTie' })
  isTie?: string;
}
