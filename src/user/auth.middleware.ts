import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { SECRET } from './config';
import { UserService } from './user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;

    if (authHeaders) {
      try {
        const decoded: any = jwt.verify(authHeaders, SECRET);

        const user = await this.userService.getUserById(decoded.id);
        if (!user) {
          throw new HttpException(
            {
              message: '没有权限，请重新登录',
              statusCode: HttpStatus.UNAUTHORIZED,
              data: null,
            },
            HttpStatus.UNAUTHORIZED,
          );
        }

        next();
      } catch (error) {
        throw new HttpException(
          {
            message: '权限验证失败，请重新登录',
            statusCode: HttpStatus.UNAUTHORIZED,
            data: null,
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new HttpException(
        {
          message: '没有权限，请重新登录',
          statusCode: HttpStatus.UNAUTHORIZED,
          data: null,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
