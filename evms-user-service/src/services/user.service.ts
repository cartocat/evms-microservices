import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entities';
import { CreateUserDTO, UpdateUserDTO, VerifyUserDTO } from '../dtos';
import * as argon2 from 'argon2';
import { number } from 'prop-types';
/**
 * User Data Operations Class
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDTO): Promise<User> {
    const { password } = user;
    user.password = await argon2.hash(password);
    return this.usersRepository.save(user);
  }

  async verify(verifyData: VerifyUserDTO): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({ id: verifyData.id });
    const check = await argon2.verify(user.password, verifyData.password);
    return check;
  }

  findAll(skip = 0, take = 100): Promise<User[]> {
    return this.usersRepository.find({
      skip: skip,
      take: take,
      where: { isActive: true },
    });
  }

  findOneById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async findOneByIdAndUpdate(user: UpdateUserDTO): Promise<UpdateResult> {
    const { password } = user;
    user.password = await argon2.hash(password);
    return this.usersRepository.update(user.id, user);
  }

  findOneByPhoneNumber(phoneNumber: string): Promise<User> {
    return this.usersRepository.findOneBy({ phoneNumber: phoneNumber });
  }

  async remove(data): Promise<boolean> {
    await this.usersRepository.update(Number.parseInt(data.id), {
      isActive: false,
    });
    return true;
  }
}
