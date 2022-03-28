import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { isNotEmpty } from 'class-validator';
import { Task } from './task.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  public getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  public findTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findTaskById(id);
  }

  @Post()
  public createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  public updateTaskStatus(
    @Param('id') id: string,
    // @Body('status') status: TaskStatus,
    @Body() updateTaskStatus: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatus;
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  public deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }

  /*

  @Get('/:id')
  public findTaskById(@Param('id') id: string): Task {
    return this.tasksService.findTaskById(id);
  }

  @Get()
  public getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  //   @Post()
  //   public createTask(@Body() body): Task {
  //     console.log(body);
  //     return;
  //   }

  //   @Post()
  //   public createTask(
  //     @Body('title') title: string,
  //     @Body('description') description: string,
  //   ): Task {
  //     return this.tasksService.createTask(title, description);
  //   }

  @Post()
  public createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTaskDto(createTaskDto);
  }

  @Patch('/:id/status')
  public updateTaskStatus(
    @Param('id') id: string,
    // @Body('status') status: TaskStatus,
    @Body() updateTaskStatus: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatus;
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  public deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteTaskById(id);
  }
  */
}
