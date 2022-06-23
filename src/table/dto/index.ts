import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TableDto {
  @ApiProperty({ example: '', description: '姓名' })
  @IsString()
  readonly username: string;

  @ApiProperty({ example: '', description: '状态' })
  @IsString()
  readonly status: string;

  @ApiProperty({ example: '', description: '作者' })
  @IsString()
  readonly author: string;

  @IsBoolean()
  readonly delete_flag: boolean;
}
