import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from './datasource/typeorm.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule
  ],
})
export class AppModule { }
