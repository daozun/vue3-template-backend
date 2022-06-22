import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: '', description: '用户名' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: '', description: '密码' })
  @IsNotEmpty()
  readonly password: string;
}
