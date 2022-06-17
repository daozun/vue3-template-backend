import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/index';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/')
  async create(@Body() loginDto: LoginDto) {
    return await this.loginService.getUser(loginDto);
  }
}
