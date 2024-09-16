import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, IsUUID, isUUID } from "class-validator"
import { RoleUsers } from "../../enum/roles.enum"

export class UserDto {
    
    @ApiProperty({
        type: String,
        description: "nome do usuário que será cadastrado"
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        type: String,
        description: "data de nascimento do usuário que será cadastrado"
    })
    @IsString()
    @IsNotEmpty()
    birth_date: string

    @ApiProperty({
        type: String,
        description: "email do usuário que será cadastrado"
    })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({
        type: String,
        description: "senha do usuário que será cadastrado"
    })
    @IsString()
    @IsNotEmpty()
    password: string

    @ApiProperty({
        type: String,
        description: "tipo de permissão do tipo da plataforma"
    })
    @IsString()
    role_platform: string;

    @ApiProperty({
        type: String,
        description: "tipo de permissão do tipo de usuário"
    })
    @IsString()
    role_users: RoleUsers;

    @ApiProperty({
        type: String,
        description: "id do município ao qual a plataforma foi implantada"
    })
    @IsUUID()
    @IsNotEmpty()
    municipality_id: string;
}