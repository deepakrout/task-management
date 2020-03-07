import { Repository, EntityMetadata, EntityRepository } from "typeorm";
import { Task } from './task.entity';
import { CreatetaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(createTaskDto: CreatetaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();
        return task;
    }
}