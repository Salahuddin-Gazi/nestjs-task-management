import { IsEnum } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class UpdateTaskStatusDto {
  @IsEnum(
    TaskStatus,
    { message: 'status must be a valid enum value' }
  )
  status: TaskStatus
}