import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { Test } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  CreateUserDTO,
  PaginationDTO,
  UpdateUserDTO,
  VerifyUserDTO,
} from '../dtos';
import { repositoryMockFactory } from '../utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

describe('User Module Unit Test', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
  });

  describe('create User', () => {
    it('should create a user', async () => {
      const result = new User();
      jest.spyOn(userService, 'create').mockImplementation(async () => result);
      expect(await userController.createUser(new CreateUserDTO())).toBe(result);
    });
  });

  describe('get all Users', () => {
    it('should return array of users', async () => {
      const result = [new User()];
      jest.spyOn(userService, 'findAll').mockImplementation(async () => result);
      expect(await userController.getUsers(new PaginationDTO())).toBe(result);
    });
  });

  describe('verify user', () => {
    it('should return verified user status', async () => {
      const result = true;
      jest.spyOn(userService, 'verify').mockImplementation(async () => result);
      expect(await userController.verifyUser(new VerifyUserDTO())).toBe(result);
    });
  });

  describe('update user', () => {
    it('should return updated user', async () => {
      const result = new User();
      jest
        .spyOn(userService, 'findOneByIdAndUpdate')
        .mockImplementation(async () => result);
      expect(await userController.updateUser(new UpdateUserDTO())).toBe(result);
    });
  });

  describe('delete user', () => {
    it('should return deleted user status', async () => {
      const result = true;
      jest.spyOn(userService, 'remove').mockImplementation(async () => true);
      expect(await userController.deleteUser(1)).toBe(result);
    });
  });
});
