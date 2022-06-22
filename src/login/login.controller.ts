import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { LoginService } from './login.service';
import { LoginDto } from './dto/index';
import { ResponseInterceptor } from '../interceptor/response.interceptor';
import { ValidationPipe } from '../pipe/validation.pipe';

@ApiBearerAuth()
@ApiTags('login')
@Controller('/dev-api')
@UseInterceptors(ResponseInterceptor)
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  @ApiResponse({ status: 200 })
  async findOne(@Body(new ValidationPipe()) loginDto: LoginDto) {
    const loginUser = await this.loginService.getUser(loginDto);

    if (!loginUser) {
      throw new HttpException(
        { message: '用户名或密码错误', code: '401', data: null },
        401,
      );
    }

    const token = await this.loginService.generateJWT(loginUser);
    const user = { token, userInfo: { username: loginUser.username } };

    return { data: user, message: '登录成功' };
  }
}
