import { Injectable, Inject } from '@nestjs/common';
import { nestTable } from './table.entity';
import {
  CreateTableDto,
  GetTableDto,
  DeleteTableDto,
  UpdateTableDto,
} from './dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require('lodash');

@Injectable()
export class TableService {
  constructor(
    @Inject('TABLE_REPOSITORY')
    private readonly tableRepository: typeof nestTable,
  ) {}

  async createTable({ title, status, author }: CreateTableDto) {
    const table = this.tableRepository.build({
      title: title,
      status: status,
      author: author,
      delete_flag: 0,
    });

    table.save();

    return table;
  }

  async getTableList(query: GetTableDto) {
    const newQuery = _.pickBy({ ...query, ...{ delete_flag: '0' } });
    const where = _.omit(newQuery, ['pageSize', 'pageNo']);

    const table = await this.tableRepository.findAndCountAll({
      where: where,
      limit: _.toNumber(newQuery.pageSize),
      offset: _.toNumber(newQuery.pageSize) * (_.toNumber(newQuery.pageNo) - 1),
    });

    return table;
  }

  async deleteTable(deleteTableDto: DeleteTableDto) {
    const table = await this.tableRepository.update(
      { delete_flag: '1' },
      {
        where: {
          id: deleteTableDto.id,
        },
      },
    );

    return table;
  }

  async updateTable({ id, title, status, author }: UpdateTableDto) {
    const table = this.tableRepository.update(
      { title: title, status: status, author: author },
      {
        where: {
          id: id,
        },
      },
    );

    return table;
  }
}
