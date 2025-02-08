// import { Injectable, NotFoundException } from '@nestjs/common';
// import { TaskStatus } from './task-status.enum';
// import { CreateTaskDto } from './dto/create-task.dto';
// import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
// import { TasksRepository } from './tasks.repository';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Task } from './task.entity';

// @Injectable()
// export class TasksService {

//   constructor(
//     @InjectRepository(TasksRepository)
//     private tasksRepository: TasksRepository
//   ) { }


//   async getTaskById(id: string): Promise<Task> {
//     const found = await this.tasksRepository.findOne({ where: { id } });

//     if (!found) {
//       throw new NotFoundException(
//         {
//           msg: `Task with ${id} found`,
//           statusCode: 404
//         })
//     }

//     return found
//   }


//   // private tasks: Task[] = [];

//   // getAllTasks(): Task[] {
//   //   return this.tasks;
//   // }

//   // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
//   //   const { status, search } = filterDto;

//   //   // working steps
//   //   // define the temporary array for tasks
//   //   let tasks = this.getAllTasks();

//   //   // do something with status
//   //   if (status) {
//   //     tasks = tasks.filter((task) => task.status === status);
//   //   }

//   //   // do something with search
//   //   if (search) {
//   //     const lowerCaseSearch = search.toLowerCase()
//   //     tasks = tasks.filter((task) => task.title.toLowerCase().includes(lowerCaseSearch) || task.description.toLowerCase().includes(lowerCaseSearch));
//   //   }

//   //   // return final result
//   //   return tasks;
//   // }

//   // getTaskById(id: string): Task {
//   //   const found = this.tasks.find((task) => task.id === id);

//   //   if (!found) {
//   //     throw new NotFoundException(
//   //       {
//   //         msg: `Task with ${id} found`,
//   //         statusCode: 404
//   //       })
//   //   }

//   //   return found;
//   // }

//   // createTask(createTaskDto: CreateTaskDto): Task {
//   //   const { title, description } = createTaskDto;
//   //   const task: Task = {
//   //     id: uuid(),
//   //     title,
//   //     description,
//   //     status: TaskStatus.OPEN
//   //   }

//   //   this.tasks.push(task);
//   //   return task
//   // }

//   // //   updateTask(id: string): Task {
//   // //     const task = this.tasks.find((task) => task.id === id);
//   // //     if(task) {
//   // // this.tasks =
//   // //     }

//   // //     return task;
//   // //   }

//   // updateTaskStatus(id: string, status: TaskStatus): Task {
//   //   // let updatedTask: Task;
//   //   // this.tasks = this.tasks.map((task) => {
//   //   //   if (task.id === id) {
//   //   //     updatedTask = { ...task, status };
//   //   //     return updatedTask
//   //   //   }
//   //   //   return task
//   //   // });
//   //   // return updatedTask

//   //   // Not recommended
//   //   const task = this.getTaskById(id);
//   //   task.status = status;
//   //   return task;
//   // }

//   // deleteTaskById(id: string): Task {
//   //   const found = this.getTaskById(id);
//   //   this.tasks = this.tasks.filter((task) => task.id !== id);

//   //   return found
//   // }
// }


import { Injectable, NotFoundException, Inject } from "@nestjs/common";
import { Task } from "./task.entity";
import { TasksRepository } from "./tasks.repository";

@Injectable()
export class TasksService {
  constructor(
    @Inject("TasksRepository") // Inject custom repository
    private tasksRepository: ReturnType<typeof TasksRepository>
  ) { }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return found;
  }

  async getTasksByStatus(status: string): Promise<Task[]> {
    return this.tasksRepository.findByStatus(status); // ✅ Call custom method
  }
}
