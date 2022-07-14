import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: '', description: '用户名' })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ example: '', description: '密码' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
