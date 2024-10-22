import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsUUID, Min } from "class-validator";

export class ClientDto {

    @ApiProperty({
        type: String,
        description: "nome do cliente app mobile"
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: String,
        description: "gênero do cliente app mobile"
    })
    @IsString()
    @IsNotEmpty()
    gender: string

    @ApiProperty({
        type: String,
        description: "data de nascimento do cliente app mobile"
    })
    @IsString()
    @IsNotEmpty()
    birth_date: string

    @ApiProperty({
        type: String,
        description: "id do município onde o cliente se localiza"
    })
    @IsUUID()
    @IsNotEmpty()
    municipality_id: string

    @ApiProperty({
        type: String,
        description: "email do cliente app mobile"
    })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({
        type: String,
        description: "senha do cliente app mobile"
    })
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 3,
        minNumbers: 3,
        minSymbols: 3,
        minUppercase: 3
    })
    password: string
}