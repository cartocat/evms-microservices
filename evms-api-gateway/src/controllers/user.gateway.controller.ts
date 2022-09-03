import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Delete,
  UseGuards,
  Inject,
  Post,
  Logger,
  RequestTimeoutException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { lastValueFrom, timeout } from 'rxjs';
import { JwtAuthGuard } from '../guards';
import { PaginationDTO, UserDTO } from '../dtos';

/**
 * User Controller Class
 */
@ApiTags('users')
@Controller('users')
export class UserGatewayController {
  constructor(
    @Inject('USER_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'List of Users', type: [UserDTO] })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiInternalServerErrorResponse({ description: 'Error Occured at Server' })
  async getAll(@Query() paginationDTO: PaginationDTO) {
    const users = await lastValueFrom(
      await this.client
        .send({ role: 'user', cmd: 'getUsers' }, paginationDTO)
        .pipe(timeout(5000)),
    );
    return users;
  }

  // @Get(':id')
  // // @UseGuards(JwtAuthGuard)
  // @ApiOkResponse({ description: 'User Result', type: UserDTO })
  // @ApiForbiddenResponse({ description: 'Forbidden' })
  // @ApiInternalServerErrorResponse({ description: 'Error Occured at Server' })
  // async getOneById(@Param('id') id: number) {}

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiInternalServerErrorResponse({ description: 'Error Occured at Server' })
  async updateUser(@Param() id: number, @Body() user: UserDTO) {
    await lastValueFrom(
      await this.client
        .send(
          { role: 'user', cmd: 'updateUser' },
          {
            id: id,
            ...user,
          },
        )
        .pipe(timeout(5000)),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiInternalServerErrorResponse({ description: 'Error Occured at Server' })
  async deleteUser(@Param() id: number) {
    await lastValueFrom(
      await this.client
        .send({ role: 'user', cmd: 'deleteUser' }, id)
        .pipe(timeout(5000)),
    );
  }
}
