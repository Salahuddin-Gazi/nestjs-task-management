import {
  Inject,
  Injectable, NotFoundException,
} from "@nestjs/common";
import { Task } from "./task.entity";
import { Repository } from "typeorm";

@Injectable()
export class TasksService {
  constructor(
    @Inject('TasksRepository')
    private tasksRepository: Repository<Task>,
  ) { }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  // async getTasksByStatus(status: string): Promise<Task[]> {
  //   return this.tasksRepository.findByStatus(status); // ✅ Call custom method
  // }
}
