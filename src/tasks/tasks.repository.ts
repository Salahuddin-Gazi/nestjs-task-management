import { DataSource } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

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

    // async findByStatus(status: string): Promise<Task[]> {
    //   return this.find({ where: { status } });
    // },
  });
};

export type TasksRepositoryType = ReturnType<typeof TasksRepository>;