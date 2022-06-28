import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTableDto {
  @ApiProperty({ example: '', description: '标题' })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ example: '', description: '发布状态' })
  @IsNotEmpty()
  @IsString()
  readonly status: string;

  @ApiProperty({ example: '', description: '作者' })
  @IsNotEmpty()
  @IsString()
  readonly author: string;
}
