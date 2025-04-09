import { IsString, MinLength } from "class-validator";

export class TokenDataDto {
    @IsString()
    'cf-turnstile-response': string;
}
