import {
  Inject,
  Injectable, NotFoundException,
} from "@nestjs/common";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TasksRepositoryType } from "./tasks.repository"

@Injectable()
export class TasksService {
  constructor(
    @Inject('TasksRepository')
    private tasksRepository: TasksRepositoryType,
  ) { }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto)
  }

  // async getTasksByStatus(status: string): Promise<Task[]> {
  //   return this.tasksRepository.findByStatus(status); // ✅ Call custom method
  // }
}
