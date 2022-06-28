import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteTableDto {
  @ApiProperty({ example: '', description: 'id' })
  @IsNotEmpty()
  @IsString()
  readonly id: string;
}
