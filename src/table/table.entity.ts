import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  tableName: 'table',
})
export class Tables extends Model {
  @Column
  username: string;

  @Column
  status: string;

  @Column
  author: string;

  @Column
  delete_flag: boolean;
}
