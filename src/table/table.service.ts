import { Injectable, Inject } from '@nestjs/common';
import { Tables } from './table.entity';
import { TableDto } from './dto/index';

@Injectable()
export class TableService {
  constructor(
    @Inject('TABLE_REPOSITORY')
    private readonly tableRepository: typeof Tables,
  ) {}

  async createTable({ username, status, author }: TableDto) {
    const user = await this.tableRepository.build({
      username: username,
      status: status,
      author: author,
    });

    console.log('user', user);

    user.save();
  }
}
