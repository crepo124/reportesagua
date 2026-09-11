import { envs } from '../config/envs';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Report } from '../reports/entities/report.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: envs.DB_HOST,
  port: envs.DB_PORT,
  username: envs.DB_USER,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  entities: [User, Report],
  synchronize: false,
};

const dataSource = new DataSource({
  ...dataSourceOptions,
  migrations: ['src/db/migrations/*.ts'],
});

export default dataSource;