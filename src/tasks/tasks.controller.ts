import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

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
