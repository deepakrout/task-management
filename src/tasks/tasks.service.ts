import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatetaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    // private tasks: Task[] = [];

    constructor(@InjectRepository(TaskRepository) private taskrepository: TaskRepository){}

    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this.taskrepository.getTasks(filterDto, user);
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskrepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with ${id} not found!`);
        }
        return found;
    }

    async createTask(createTaskDto: CreatetaskDto, user: User): Promise<Task> {
        return this.taskrepository.createTask(createTaskDto, user);
    }
   
    async deleteTask(id: number): Promise<void> {
        const found = await this.taskrepository.delete(id);
        if (found.affected === 0) {
            throw new NotFoundException(`Task with ${id} not found!`);
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        console.log(`Task number ${id} status ${status}`);
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }

    // updateTaskStatus(id: string, status: TaskStatus) {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
