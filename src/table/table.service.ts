import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Tables } from './table.entity';
import { TableDto } from './dto/index';

@Injectable()
export class TableService {
  constructor(
    @Inject('TABLE_REPOSITORY')
    private readonly tableRepository: typeof Tables,
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
    console.log(
      '%c [ query ]-26',
      'font-size:13px; background:pink; color:#bf2c9f;',
      query,
    );
    if ('title' in query) {
      const user = await this.tableRepository.findOne({
        where: { title: query.title },
      });

      // const user = await this.tableRepository.findOne({
      //   where: {
      //     $and: [
      //       {
      //         title: query.title,
      //       },
      //       {
      //         status: query.status,
      //       },
      //       {
      //         author: query.author,
      //       },
      //     ],
      //   },
      // });

      return user;
    }
  }
}
