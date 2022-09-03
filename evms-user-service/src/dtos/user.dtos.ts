import { IsNotEmpty } from 'class-validator';

/**
 * Data Transfer, validation and API Defination Class
 */
export class CreateUserDTO {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  password: string;
}

export class UpdateUserDTO {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  isActive: boolean;
}

export class VerifyUserDTO {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  password: string;
}
