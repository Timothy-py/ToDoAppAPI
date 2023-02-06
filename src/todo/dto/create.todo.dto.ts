import { IsNotEmpty, IsString } from "class-validator";

export enum Status {
    TODO = "TODO",
    DOING = "DOING",
    AWAITING = "AWAITING",
    DONE = "DONE",
    DISCONTINUED = "DISCONTINUED"
}

export class CreateTodoDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    readonly description?: string;

    readonly status?: Status
}