import { DataSource } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

export const UsersRepository = (dataSource: DataSource) => {
  const usersRepository = dataSource.getRepository(User);

  return usersRepository.extend({

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
      const { username, password } = authCredentialsDto;

      // hash
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt)

      const user = usersRepository.create({
        username,
        password: hashedPassword
      });

      try {
        await usersRepository.save(user);
        // return user;
      } catch (error) {
        if (error.code == 23505) { //duplicate username
          throw new ConflictException('Username already exists!')
        } else {
          throw new InternalServerErrorException();
        }
      }
    }

  })
}

export type UsersRepositoryType = ReturnType<typeof UsersRepository>;