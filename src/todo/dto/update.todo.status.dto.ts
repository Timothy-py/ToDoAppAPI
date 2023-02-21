import { IsNotEmpty, IsString } from "class-validator";
import { Status } from "./enum.status";

export class updateTodoStatusDto {
    @IsNotEmpty()
    @IsString()
    readonly status: Status
}