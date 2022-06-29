import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { loginProviders } from './login.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [LoginService, ...loginProviders],
  controllers: [LoginController],
  exports: [LoginService],
})
export class LoginModule {}
