// We are using Data Mapper approach

// import { EntityRepository, Repository } from "typeorm";
// import { Task } from "./task.entity";

// @EntityRepository(Task)
// export class TasksRepository extends Repository<Task> { }

import { DataSource } from "typeorm";
import { Task } from "./task.entity";

export const TasksRepository = (dataSource: DataSource) =>
  dataSource.getRepository(Task).extend({
    async findByStatus(status: string) {
      return this.find({ where: { status } });
    }
  });
