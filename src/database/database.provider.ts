import { Sequelize } from 'sequelize-typescript';
import { Login } from '../login/login.entity';
import { Tables } from '../table/table.entity';

export const databaseProvider = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        timezone: '+8:00',
        dialectOptions: {
          useUTC: false,
        },
        port: 3306,
        username: 'root',
        password: '19950820a!',
        database: 'nest-db',
      });
      sequelize.addModels([Login, Tables]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
