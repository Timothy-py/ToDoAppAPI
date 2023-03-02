import { IsString, Length } from "class-validator";

export class updateUserDto {
    @IsString()
    username?: string;

    @IsString()
    @Length(4, 9)
    password?: string;
}