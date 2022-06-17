import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Login extends Model {
  @Column
  username: string;

  @Column
  password: string;

  @Column
  delete_flag: boolean;
}
