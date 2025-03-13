import { IsEmail, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateMailDto {

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    name: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber()
    phone: string;

    @IsString()
    @MaxLength(5000)
    description: string;

    files: File[];
}
