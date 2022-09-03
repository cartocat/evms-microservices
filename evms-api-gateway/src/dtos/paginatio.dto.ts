import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
/**
 * Data Transfer, validation and API Defination Class
 */
export class PaginationDTO {
  @ApiProperty()
  @IsNotEmpty()
  skip: number;

  @ApiProperty()
  @IsNotEmpty()
  take: number;
}
