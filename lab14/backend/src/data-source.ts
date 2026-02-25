import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { CreateUsersTable1700000000000 } from './migrations/1700000000000-CreateUsersTable';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'user_auth_db',
  entities: [User],
  migrations: [CreateUsersTable1700000000000],
  synchronize: false, // Use migrations in production
  logging: false,
});

