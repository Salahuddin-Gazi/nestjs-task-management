// import { Module } from '@nestjs/common';
// import { TasksController } from './tasks.controller';
// import { TasksService } from './tasks.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { TasksRepository } from './tasks.repository';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([
//       TasksRepository
//     ])
//   ],
//   controllers: [TasksController],
//   providers: [TasksService],
// })
// export class TasksModule { }

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
import { TasksRepository } from "./tasks.repository";
import { DataSource } from "typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Task])], // ✅ Register Task entity
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: "TasksRepository",
      useFactory: (dataSource: DataSource) => TasksRepository(dataSource),
      inject: [DataSource]
    }
  ],
  exports: ["TasksRepository"] // ✅ Export for reuse in other modules if needed
})
export class TasksModule { }
