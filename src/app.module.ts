import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from './datasource/typeorm.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from 'src/config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes config available everywhere
      validationSchema: configValidationSchema,
      envFilePath: ['.env.stage', `.env.stage.${process.env.STAGE || 'dev'}`], // Default to 'dev' if STAGE is missing
    }),
    TasksModule,
    TypeOrmModule,
    AuthModule,
  ],
})
export class AppModule { }
