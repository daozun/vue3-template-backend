import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/index';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');
import { SECRET } from './config';
import { isMatch } from '../utils/encryption';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: typeof User,
  ) {}

  async getUser({ username, password }: UserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });

    if (!user) {
      return null;
    }

    const hash = user.password;
    const isMatchPassword = await isMatch(password, hash);

    if (isMatchPassword) {
      return user;
    }

    return null;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findByPk(id);

    return user;
  }

  public generateJWT(user: User) {
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
