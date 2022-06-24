import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { DatabaseModule } from './database/database.module';
import { TableModule } from './table/table.module';

@Module({
  imports: [LoginModule, DatabaseModule, TableModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
