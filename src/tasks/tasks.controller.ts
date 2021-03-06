import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreatetaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
/**
 * Task controller
 * DateL 05/09/2020
 */
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(
        @Query(ValidationPipe) filterDto: GetTasksFilterDto,
        @GetUser() user: User
        ): Promise<Task[]> {
        return this.taskService.getTasks(filterDto, user);
        
    }

    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<Task> {
        return this.taskService.getTaskById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreatetaskDto,
        @GetUser() user: User
        ): Promise<Task> {
        return this.taskService.createTask(createTaskDto, user);
    }

    @Delete('/:id')
    deleteTask(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User ): Promise<void> {
       return  this.taskService.deleteTask(id, user);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: User): Promise<Task> {
        console.log(`In Controller Task number ${id} status ${status}`)   
        return this.taskService.updateTaskStatus(id, status, user);
    }

}
