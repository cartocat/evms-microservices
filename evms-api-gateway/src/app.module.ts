import { JwtStrategy } from './core/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import {
  AppController,
  UserGatewayController,
  AuthController,
} from './controllers/';
import { AppService, AuthService } from './services/';
import { configuration } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    JwtModule.register({
      secret: new ConfigService().get('secret'),
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController, UserGatewayController, AuthController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const userServiceOptions = configService.get('userService');
        return ClientProxyFactory.create(userServiceOptions);
      },
      inject: [ConfigService],
    },
    AppService,
    AuthService,
    JwtStrategy,
  ],
})
export class AppModule {}
