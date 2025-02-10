import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksRepository } from "./tasks.repository";
import { DataSource } from "typeorm";
import { Task } from "./task.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature([Task])
  ],
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: 'TasksRepository',
      useFactory: (dataSource: DataSource) => TasksRepository(dataSource),
      inject: [DataSource]
    }
  ],
  exports: [TasksService]
})

export class TasksModule { }
