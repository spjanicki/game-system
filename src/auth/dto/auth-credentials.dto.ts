// TODO : Add validations
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiProperty({ type: () => String, description: 'username' })
  username: string;
  @ApiProperty({ type: () => String, description: 'password' })
  password: string;
}
