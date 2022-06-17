import { Login } from './login.entity';

export const loginProviders = [
  {
    provide: 'LOGIN_REPOSITORY',
    useValue: Login,
  },
];
