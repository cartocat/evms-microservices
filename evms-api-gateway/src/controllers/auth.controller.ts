import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '../services';
import { LoginUserDTO, AuthResponseDTO, UserDTO } from '../dtos';

/**
 * Auth Controller Class
 */
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOkResponse({ description: 'Login Route', type: AuthResponseDTO })
  @ApiInternalServerErrorResponse({ description: 'Error Occured at Server' })
  async login(@Body() loginUserDTO: LoginUserDTO) {
    return this.authService.login(loginUserDTO);
  }

  @Post('/register')
  @ApiOkResponse({ description: 'Login Route', type: AuthResponseDTO })
  @ApiInternalServerErrorResponse({ description: 'Error Occured at Server' })
  async register(@Body() userDTO: UserDTO) {
    return this.authService.register(userDTO);
  }
}
