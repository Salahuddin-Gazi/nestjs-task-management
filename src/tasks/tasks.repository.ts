import { DataSource } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';
import { InternalServerErrorException, Logger } from "@nestjs/common";

// Factory function to create the custom repository
export const TasksRepository = (dataSource: DataSource) => {
  const logger = new Logger('TasksRepository', { timestamp: true });
  const tasksRepository = dataSource.getRepository(Task);

  // Extend the base repository with custom methods
  return tasksRepository.extend({
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
      const { title, description } = createTaskDto;

      const task = tasksRepository.create({
        title,
        description,
        status: TaskStatus.OPEN,
        user
      });

      await tasksRepository.save(task);
      return task
    },


    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
      const { status, search } = filterDto;

      const query = tasksRepository.createQueryBuilder('task');
      query.where({ user })

      if (status) {
        query.andWhere('task.status = :status', { status })
      }

      if (search) {
        query.andWhere('(LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE LOWER(:search))', { search: `%${search}%` })
      }

      try {
        const tasks = await query.getMany();
        return tasks
      } catch (error) {
        logger.error(`Failed to get tasks for user "${user.username}". Filters: ${JSON.stringify(filterDto)}`, error.stack)
        throw new InternalServerErrorException();
      }
    }

    // async findByStatus(status: string): Promise<Task[]> {
    //   return this.find({ where: { status } });
    // },
  });
};

export type TasksRepositoryType = ReturnType<typeof TasksRepository>;