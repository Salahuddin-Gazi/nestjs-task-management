import { DataSource } from 'typeorm';
import { Task } from './task.entity';

// Factory function to create the custom repository
export const TasksRepository = (dataSource: DataSource) => {
  const tasksRepository = dataSource.getRepository(Task);

  // Extend the base repository with custom methods
  return tasksRepository.extend({
    async findByStatus(status: string): Promise<Task[]> {
      return this.find({ where: { status } });
    },
  });
};