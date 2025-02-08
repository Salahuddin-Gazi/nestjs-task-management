import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get('/:id')
  getTaskById(
    @Param('id') id: string
  ): Promise<Task> {
    return this.tasksService.getTaskById(id)
  }

  // @Get()
  // getTasks(
  //   @Query() filterDto: GetTasksFilterDto
  // ): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilters(filterDto)
  //   }
  //   return this.tasksService.getAllTasks();
  // }

  // // http://localhost:3000/tasks/:id
  // @Get('/:id')
  // getTaskById(
  //   @Param('id') id: string
  // ): Task {
  //   return this.tasksService.getTaskById(id)
  // }

  // @Post()
  // createTask(
  //   @Body() createTaskDto: CreateTaskDto
  // ): Task {
  //   return this.tasksService.createTask(createTaskDto)
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  // ) {
  //   const { status } = updateTaskStatusDto;
  //   return this.tasksService.updateTaskStatus(id, status)
  // }

  // @Delete('/:id')
  // deleteTaskById(
  //   @Param('id') id: string
  // ): Task {
  //   return this.tasksService.deleteTaskById(id)
  // }
}
