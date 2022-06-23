import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { tableProviders } from './table.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [TableService, ...tableProviders],
  controllers: [TableController],
})
export class TableModule {}
