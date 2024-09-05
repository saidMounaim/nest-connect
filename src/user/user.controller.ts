import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/users')
  getAll(@Query('search') search: string) {
    return this.userService.getAll(search);
  }

  @Get('/user/:userId')
  getSingle(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getSingle(userId);
  }
}
