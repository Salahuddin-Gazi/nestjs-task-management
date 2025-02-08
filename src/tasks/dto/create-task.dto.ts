import { IsNotEmpty } from "class-validator";

// const options = { message: "This field cannot be empty" };

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}