import {
  Inject,
  Injectable, NotFoundException,
} from "@nestjs/common";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TasksRepositoryType } from "./tasks.repository"
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

export interface DeleteTaskResponse {
  msg: string;
  statusCode: number;
}

@Injectable()
export class TasksService {
  constructor(
    @Inject('TasksRepository')
    private tasksRepository: TasksRepositoryType,
  ) { }

  // async getAllTasks(): Promise<Task[]> {
  //   return await this.tasksRepository.find()
  // }

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto)
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto)
  }

  async deleteTaskById(id: string): Promise<DeleteTaskResponse> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected > 0) {
      return {
        msg: `Task with id ${id} deleted successfully`,
        statusCode: 200,
      };
    }

    throw new NotFoundException(`Task with ID ${id} not found`);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  // async getTasksByStatus(status: string): Promise<Task[]> {
  //   return this.tasksRepository.findByStatus(status); // ✅ Call custom method
  // }
}
