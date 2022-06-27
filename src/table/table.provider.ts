import { nestTable } from './table.entity';

export const tableProviders = [
  {
    provide: 'TABLE_REPOSITORY',
    useValue: nestTable,
  },
];
