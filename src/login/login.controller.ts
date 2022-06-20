import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { LoginService } from './login.service';
import { LoginDto } from './dto/index';
import { ResponseInterceptor } from '../interceptor/response.interceptor';

@Controller('/dev-api')
@UseInterceptors(ResponseInterceptor)
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  async findOne(
    @Body(new ValidationPipe({ transform: true })) loginDto: LoginDto,
  ) {
    const loginUser = await this.loginService.getUser(loginDto);

    if (!loginUser) {
      throw new HttpException(
        { message: '用户名或密码错误', code: '401', data: null },
        401,
      );
    }

    const token = await this.loginService.generateJWT(loginUser);
    const user = { token, username: loginUser.username };

    return { data: user, message: '登录成功' };
  }
}
