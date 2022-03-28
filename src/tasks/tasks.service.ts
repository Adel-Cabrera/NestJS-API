import { TasksRepository } from './tasks.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
// import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  public async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  public async findTaskById(taskId: string): Promise<Task> {
    const foundTask = await this.tasksRepository.findOne({ id: taskId });

    if (!foundTask) {
      throw new NotFoundException('No encontrado', 'Especifique mejor');
    }
    return foundTask;
  }

  public createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
    // const { title, description } = createTaskDto;

    // const task: Task = this.tasksRepository.create({
    //   title,
    //   description,
    //   status: TaskStatus.OPEN,
    // });

    // await this.tasksRepository.save(task);

    // return task;
  }

  public async updateTaskStatus(
    taskId: string,
    status: TaskStatus,
  ): Promise<Task> {
    const task = await this.findTaskById(taskId);

    task.status = status;

    await this.tasksRepository.save(task);

    return task;
  }

  public async deleteTaskById(taskId: string): Promise<void> {
    const result = await this.tasksRepository.delete(taskId);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${taskId} not found.`);
    }
  }

  /*
  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = this.tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = this.tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }

  public createTask(title: string, description: string): Task {
    const task: Task = {
      id: uuid(),
      title,
      description: description,
      status: TaskStatus.DONE,
    };

    this.tasks.push(task);
    return task;
  }

  public createTaskDto(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description: description,
      status: TaskStatus.DONE,
    };

    this.tasks.push(task);
    return task;
  }

  public findTaskById(taskId: string): Task {
    const foundTask = this.tasks.find((task) => task.id === taskId);
    if (!foundTask) {
      throw new NotFoundException('No encontrado', 'Especifique mejor');
    }
    return foundTask;
  }

  public updateTaskStatus(taskId: string, status: TaskStatus): Task {
    const tempTask = this.findTaskById(taskId);
    tempTask.status = status;
    return tempTask;
  }

  public deleteTaskById(taskId: string): void {
    const foundTask = this.findTaskById(taskId);
    this.tasks = this.tasks.filter((task) => task.id !== foundTask.id);
  }*/
}
