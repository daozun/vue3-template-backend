import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './dto/index';
import { ResponseInterceptor } from '../interceptor/response.interceptor';
import { ValidationPipe } from '../pipe/validation.pipe';

@ApiBearerAuth()
@ApiTags('login')
@Controller('/dev-api')
@UseInterceptors(ResponseInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiResponse({ status: 200 })
  async findOne(@Body(new ValidationPipe()) userDto: UserDto) {
    const loginUser = await this.userService.getUser(userDto);

    if (!loginUser) {
      throw new HttpException(
        { message: '用户名或密码错误', statusCode: '401', data: null },
        401,
      );
    }

    const token = await this.userService.generateJWT(loginUser);
    const user = { token, userInfo: { username: loginUser.username } };

    return { data: user, message: '登录成功' };
  }
}
