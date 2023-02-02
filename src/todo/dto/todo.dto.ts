import { IsNotEmpty, IsString } from "class-validator";

enum status {
    TODO,
    DOING,
    AWAITING,
    DONE,
    DISCONTINUED
}

export class TodoDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsString()
    readonly description?: string;

    @IsString()
    readonly status?: status

}