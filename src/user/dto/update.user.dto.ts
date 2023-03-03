import { IsOptional, IsString, Length } from "class-validator";

export class updateUserDto {
    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsString()
    @Length(4, 9)
    password?: string;
}