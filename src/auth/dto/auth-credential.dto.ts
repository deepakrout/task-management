import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AuthCredentialDto {
    @IsString()
    @MinLength(4)
    @MaxLength(8)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: "password is to weak" }
    )
    password: string;
}