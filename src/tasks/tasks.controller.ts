import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model'
import { CreatetaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
         console.log(filterDto);
         console.log(`Object.keys(filterDto).length`,Object.keys(filterDto).length)
        if (Object.keys(filterDto).length) {
            return this.taskService.getTasksWithFilters(filterDto);
        } else {
            return this.taskService.getAllTasks();
        }
        
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreatetaskDto): Task {
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
        return this.taskService.updateTaskStatus(id, status);
    }

}
