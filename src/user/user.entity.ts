import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  tableName: 'user',
})
export class User extends Model {
  @Column
  username: string;

  @Column
  password: string;

  @Column
  delete_flag: boolean;
}
