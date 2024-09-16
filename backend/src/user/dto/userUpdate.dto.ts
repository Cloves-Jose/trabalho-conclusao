import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import { RoleUsers } from "../../enum/roles.enum"

export class UserUpdateDto {

    @ApiProperty({
        type: String,
        description: 'id do usuário que será editado'
    })
    @IsNotEmpty()
    @IsString()
    id: string

    @ApiProperty({
        type: String,
        description: 'nome do usuário que será editado'
    })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({
        type: String,
        description: 'data de nascimento do usuário que será editado'
    })
    @IsNotEmpty()
    @IsString()
    birth_date: string

    @ApiProperty({
        type: String,
        description: 'email do usuário que será editado'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({
        type: String,
        description: 'permissão do tipo de usuário'
    })
    @IsNotEmpty()
    @IsString()
    role_users: RoleUsers 
}