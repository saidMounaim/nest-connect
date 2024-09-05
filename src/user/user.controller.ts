import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/users')
  getAll() {
    return this.userService.getAll();
  }
}
