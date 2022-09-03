import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from '../services/';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ role: 'health-check', cmd: 'get' })
  getStatus(): string {
    return this.appService.getStatus();
  }
}
