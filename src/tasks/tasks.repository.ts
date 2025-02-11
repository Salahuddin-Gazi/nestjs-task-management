import { DataSource } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

// Factory function to create the custom repository
export const TasksRepository = (dataSource: DataSource) => {
  const tasksRepository = dataSource.getRepository(Task);

  // Extend the base repository with custom methods
  return tasksRepository.extend({
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
      const { title, description } = createTaskDto;

      const task = tasksRepository.create({
        title,
        description,
        status: TaskStatus.OPEN
      });

      await tasksRepository.save(task);
      return task
    },


    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
      const { status, search } = filterDto;

      const query = tasksRepository.createQueryBuilder('task');

      if (status) {
        query.andWhere('task.status = :status', { status })
      }

      if (search) {
        query.andWhere('LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE LOWER(:search)', { search: `%${search}%` })
      }

      const tasks = await query.getMany();
      return tasks
    }

    // async findByStatus(status: string): Promise<Task[]> {
    //   return this.find({ where: { status } });
    // },
  });
};

export type TasksRepositoryType = ReturnType<typeof TasksRepository>;