import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Login extends Model {
  @Column
  username: string;

  @Column
  password: string;

  @Column
  create_time: Date;

  @Column
  update_time: Date;

  @Column
  delete_flag: boolean;
}
