import { Injectable } from '@nestjs/common';
import { Task } from 'src/tasks/task.entity';
import { DataSource } from 'typeorm';

export interface UsernameQuery {
  username: string;
}

@Injectable()
export class DataSourceService {
  constructor(private dataSource: DataSource) { }

  //   extend userRepository to add custom methods
  tasksCustomRepository = this.dataSource.getRepository(Task).extend({
    async filterUser(usernameQuery: UsernameQuery): Promise<Task[]> {
      const { username } = usernameQuery;
      console.log(username);
      // initialize a query builder for the userrepository
      const query = this.createQueryBuilder('user');
      //   filter user where username is like the passed username
      query.where('(LOWER(user.username) LIKE LOWER(:username))', {
        username: `%${username}%`,
      });
      return await query.getMany();
    },
  });
}