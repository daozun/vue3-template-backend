import { Injectable, Inject } from '@nestjs/common';
import { Login } from './login.entity';
import { LoginDto } from './dto/index';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');
import { SECRET } from './config';
import { isMatch } from '../utils/encryption';

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

    const hash = user.password;
    const isMatchPassword = await isMatch(password, hash);

    if (isMatchPassword) {
      return user;
    }

    return null;
  }

  public generateJWT(user: Login) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        exp: exp.getTime() / 1000,
      },
      SECRET,
    );
  }
}
