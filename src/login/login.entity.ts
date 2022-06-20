import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  tableName: 'login',
})
export class Login extends Model {
  @Column
  username: string;

  @Column
  password: string;

  @Column
  delete_flag: boolean;
}
