import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { TableModule } from './table/table.module';

@Module({
  imports: [UserModule, DatabaseModule, TableModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
