import { Sequelize } from 'sequelize-typescript';
import { Login } from '../login/login.entity';

export const databaseProvider = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '19950820a!',
        database: 'nest-db',
      });
      sequelize.addModels([Login]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
