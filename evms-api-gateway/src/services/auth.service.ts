import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthResponseDTO } from '../dtos/register-response.dto';

import { LoginUserDTO } from '../dtos/loginuser.dto';
import { UserDTO } from 'src/dtos';
import { lastValueFrom, timeout } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
/**
 * Authenication Service Class
 */
@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE')
    private readonly client: ClientProxy,
    private jwtService: JwtService,
  ) {}

  /**
   * Logins auth service
   * @param loginDTO
   * @returns  jwt token
   */
  async login(loginDTO: LoginUserDTO) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await lastValueFrom(
          await this.client
            .send(
              { role: 'user', cmd: 'findUserByPhoneNumber' },
              loginDTO.phoneNumber,
            )
            .pipe(timeout(5000)),
        );
        if (user == null) {
          throw new HttpException('User Not Existed', HttpStatus.BAD_REQUEST);
        } else {
          const verify = await lastValueFrom(
            await this.client
              .send(
                { role: 'user', cmd: 'verifyUser' },
                { id: user.id, password: loginDTO.password },
              )
              .pipe(timeout(5000)),
          );
          Logger.log(verify);
          if (verify) {
            Logger.log('Called');
            const payload = { phoneNumber: user.phoneNumber, sub: user.id };
            const token = this.jwtService.sign(payload);
            resolve(new AuthResponseDTO(token));
          } else {
            throw new HttpException('Wrong Password', HttpStatus.BAD_REQUEST);
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * Registers auth service
   * @param createUserDTO
   * @returns  jwt token
   */
  async register(userDTO: UserDTO) {
    return new Promise(async (resolve, reject) => {
      const createdUser = await lastValueFrom(
        await this.client
          .send({ role: 'user', cmd: 'create' }, userDTO)
          .pipe(timeout(5000)),
      );
      Logger.log(createdUser);
      const payload = { username: createdUser.userName, sub: createdUser.id };
      Logger.log(payload);
      const token = this.jwtService.sign(payload);
      resolve(new AuthResponseDTO(token));
    });
  }
}
