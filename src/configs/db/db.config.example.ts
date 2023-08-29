import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { systemEntities } from "tyatech-nestjs-system";

export const DbConfig: TypeOrmModuleOptions = {
  options: { encrypt: false },
  type: 'mssql',
  host: '',  
  port: 1433,
  username: '',
  password: '',
  database: '',
  synchronize: false,
  logging: false,
  entities: [
    'dist/**/*.entity{.ts,.js}', 
    ...systemEntities
  ],
  subscribers: ['dist/**/*.subscriber{.ts,.js}'],
  migrations:['dist/typeorm/migrations/**/*.js'],
  cli:{
    migrationsDir:"src/typeorm/migrations"
  },  
  requestTimeout: 300000

};

export default DbConfig;
