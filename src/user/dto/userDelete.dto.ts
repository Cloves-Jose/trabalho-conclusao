import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UserDeleteDto {

    @ApiProperty({
        type: String,
        description: "id do usuário logado que será deletado"
    })
    @IsString()
    @IsNotEmpty()
    id: string
}