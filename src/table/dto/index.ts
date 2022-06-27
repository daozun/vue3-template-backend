import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TableDto {
  @ApiProperty({ example: '', description: '标题' })
  @IsString()
  readonly title: string;

  @ApiProperty({ example: '', description: '发布状态' })
  @IsString()
  readonly status: string;

  @ApiProperty({ example: '', description: '作者' })
  @IsString()
  readonly author: string;

  @ApiProperty({ example: '', description: '每页条数' })
  @IsString()
  readonly pageSize: string;

  @ApiProperty({ example: '', description: '当前页数' })
  @IsString()
  readonly pageNo: string;
}
