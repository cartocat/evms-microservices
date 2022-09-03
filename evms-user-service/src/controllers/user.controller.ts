import { Controller } from '@nestjs/common';
import { UserService } from '../services';
import {
  CreateUserDTO,
  PaginationDTO,
  UpdateUserDTO,
  VerifyUserDTO,
} from '../dtos';
import { MessagePattern } from '@nestjs/microservices';
import { User } from '../entities';

/**
 * User Controller class
 */
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ role: 'user', cmd: 'create' })
  createUser(data: CreateUserDTO): Promise<User> {
    return this.userService.create(data);
  }

  @MessagePattern({ role: 'user', cmd: 'getUsers' })
  getUsers(data: PaginationDTO): Promise<User[]> {
    return this.userService.findAll(data.skip, data.take);
  }

  @MessagePattern({ role: 'user', cmd: 'updateUser' })
  updateUser(data: UpdateUserDTO): Promise<User> {
    return this.userService.findOneByIdAndUpdate(data);
  }
  @MessagePattern({ role: 'user', cmd: 'verifyUser' })
  verifyUser(data: VerifyUserDTO): Promise<boolean> {
    return this.userService.verify(data);
  }

  @MessagePattern({ role: 'user', cmd: 'deleteUser' })
  deleteUser(id: number): Promise<boolean> {
    return this.userService.remove(id);
  }

  @MessagePattern({ role: 'user', cmd: 'findUserByPhoneNumber' })
  getUserByPhone(phoneNumber: string): Promise<User> {
    return this.userService.findOneByPhoneNumber(phoneNumber);
  }
}
