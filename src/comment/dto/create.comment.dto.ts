import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    @IsNumber()
    readonly todoId: number

    @IsNotEmpty()
    @IsString()
    readonly text: string
}