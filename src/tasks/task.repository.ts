import { Repository, EntityMetadata, EntityRepository } from "typeorm";
import { Task } from './task.entity';
import { CreatetaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { User } from "src/auth/user.entity";

/**
 * Task repository to handle low level taks CRUD operations
 * Date: 04/06/2020
 */
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(
        createTaskDto: CreatetaskDto,
        user: User
    ): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        console.log(`Saving Task..`, task);
        await task.save();

        delete task.user;

        return task;
    }

    async getTasks(
        filterDto: GetTasksFilterDto,
        user: User
    ): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');

        query.where('task.userId = :userId', { userId: user.id });

        if (status) {
            query.andWhere('task.status = :status', { status })
        }

        if (search) {
            query.andWhere('task.title LIKE :search or task.description LIKE :search', { search: `%${search}%` });
        }

        const tasks = await query.getMany();
        return tasks;

    }
}