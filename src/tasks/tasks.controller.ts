import { Body, Controller, Delete, Get, Param, Post, Patch, Query } from '@nestjs/common';
import { DeleteTaskResponse, TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  // @Get()
  // getAllTasks(): Promise<Task[]> {
  //   return this.tasksService.getAllTasks();
  // }

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto)
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id)
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto)
  }

  @Delete('/:id')
  deleteTaskById(
    @Param('id') id: string
  ): Promise<DeleteTaskResponse> {
    return this.tasksService.deleteTaskById(id)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status)
  }

}
