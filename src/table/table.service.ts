import { Injectable, Inject } from '@nestjs/common';
import { nestTable } from './table.entity';
import { TableDto } from './dto/index';

@Injectable()
export class TableService {
  constructor(
    @Inject('TABLE_REPOSITORY')
    private readonly tableRepository: typeof nestTable,
  ) {}

  async createTable({ title, status, author }: TableDto) {
    const user = this.tableRepository.build({
      title: title,
      status: status,
      author: author,
      delete_flag: 0,
    });

    user.save();

    return user;
  }

  async getTableList(query: TableDto) {
    const user = await this.tableRepository.sequelize.query(
      `select * from nesttable where (title like "%${
        query.title ? query.title : ''
      }%") and (status like "%${
        query.status ? query.status : ''
      }%") and (author like "%${
        query.author ? query.author : ''
      }%") and (limit like "%${
        query.pageSize ? query.pageSize : ''
      }%") and (offset like "%${
        query.pageNo ? query.pageNo : ''
      }%") and (delete_flag like "%0%")`,
      { type: 'SELECT' },
    );

    return user;
  }
}
