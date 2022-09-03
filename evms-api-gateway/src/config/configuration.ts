import { Transport } from '@nestjs/microservices';

export default () => ({
  port: process.env.PORT || 3000,
  secret: process.env.SECRET,
  userService: {
    transport: Transport.TCP,
    options: {
      host: process.env.MICROSERVICE_TCP_HOST,
      port: process.env.USER_MICROSERVICE_TCP_PORT,
    },
  },
});
