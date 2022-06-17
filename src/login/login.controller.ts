import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/index';

@Controller('/dev-api')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  async findOne(
    @Body(new ValidationPipe({ transform: true })) loginDto: LoginDto,
  ) {
    return await this.loginService.getUser(loginDto);
  }
}
