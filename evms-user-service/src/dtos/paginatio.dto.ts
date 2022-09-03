import { IsNotEmpty } from 'class-validator';

/**
 * Data Transfer, validation and API Defination Class
 */
export class PaginationDTO {
  @IsNotEmpty()
  skip: number;

  @IsNotEmpty()
  take: number;
}
