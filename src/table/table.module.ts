import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { tableProviders } from './table.provider';
import { DatabaseModule } from '../database/database.module';
import { AuthMiddleware } from '../login/auth.middleware';
import { LoginModule } from '../login/login.module';

@Module({
  imports: [DatabaseModule, LoginModule],
  providers: [TableService, ...tableProviders],
  controllers: [TableController],
  exports: [TableService],
})
export class TableModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(TableController);
  }
}
