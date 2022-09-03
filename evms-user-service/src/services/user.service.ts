import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { CreateUserDTO, UpdateUserDTO, VerifyUserDTO } from '../dtos';
import argon2 from 'argon2';
import { verify } from 'crypto';
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
    return argon2.verify(user.password, verifyData.password);
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

  findOneByIdAndUpdate(user: UpdateUserDTO): Promise<User> {
    return this.usersRepository.save({ id: user.id, user });
  }

  findOneByPhoneNumber(phoneNumber: string): Promise<User> {
    return this.usersRepository.findOneBy({ phoneNumber: phoneNumber });
  }

  async remove(id: number): Promise<boolean> {
    await this.usersRepository.update(id, { isActive: false });
    return true;
  }
}
