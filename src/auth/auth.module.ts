import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'UsersRepository',
      useFactory: (dataSource: DataSource) => UsersRepository(dataSource),
      inject: [DataSource]
    }
  ],
  exports: [AuthService]
})
export class AuthModule { }
