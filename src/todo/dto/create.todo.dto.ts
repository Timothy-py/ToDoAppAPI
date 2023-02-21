import { IsNotEmpty, IsString } from "class-validator";
import { Status } from "./enum.status";


export class CreateTodoDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    readonly description?: string;

    readonly status?: Status

    readonly tags?: []
}