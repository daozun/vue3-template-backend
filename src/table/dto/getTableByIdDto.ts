import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetTableByIdDto {
  @ApiProperty({ example: '', description: 'id' })
  @IsNotEmpty()
  @IsString()
  readonly id: string;
}
