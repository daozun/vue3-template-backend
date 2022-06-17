import { Injectable, Inject } from '@nestjs/common';
import { Login } from './login.entity';
import { LoginDto } from './dto/index';

@Injectable()
export class LoginService {
  constructor(
    @Inject('LOGIN_REPOSITORY')
    private readonly loginRepository: typeof Login,
  ) {}

  async getUser({ username, password }: LoginDto): Promise<Login> {
    const user = await this.loginRepository.findOne({
      where: { username: username },
    });

    if (user) {
      return user;
    }

    return null;
  }
}
