import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDTO {
  @ApiProperty({ description: 'API Access Token(JWT)' })
  accessToken: string;

  constructor(token) {
    this.accessToken = token;
  }
}
